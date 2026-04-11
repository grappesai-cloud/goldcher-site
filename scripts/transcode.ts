#!/usr/bin/env node
/**
 * Goldcher video transcode pipeline.
 *
 * Usage:
 *   MUX_TOKEN_ID=... MUX_TOKEN_SECRET=... npx tsx scripts/transcode.ts
 *
 * Reads raw video files from ../Downloads/goldcher website (configurable via
 * SRC_DIR env var), uploads each to Mux as a direct upload, and writes the
 * resulting playback_ids back to data/playback-ids.json so the site starts
 * streaming HLS automatically.
 *
 * Safe to re-run: skips keys that already have a playback_id set.
 */
import Mux from "@mux/mux-node";
import fs from "node:fs/promises";
import path from "node:path";
import { createReadStream } from "node:fs";

const { MUX_TOKEN_ID, MUX_TOKEN_SECRET } = process.env;
if (!MUX_TOKEN_ID || !MUX_TOKEN_SECRET) {
  console.error(
    "Missing MUX_TOKEN_ID or MUX_TOKEN_SECRET. Get them at https://dashboard.mux.com/settings/access-tokens"
  );
  process.exit(1);
}

const mux = new Mux({ tokenId: MUX_TOKEN_ID, tokenSecret: MUX_TOKEN_SECRET });

const REPO_ROOT = path.resolve(process.cwd());
const DATA_FILE = path.join(REPO_ROOT, "data/playback-ids.json");
const SRC_DIR =
  process.env.SRC_DIR ??
  path.resolve(REPO_ROOT, "../Downloads/goldcher website");

/**
 * Maps a logical video key (as referenced by playback-ids.json and MuxVideo
 * components) to the actual source filename in SRC_DIR.
 *
 * Key must match `keyof data/playback-ids.json`.
 */
const MAPPING: Record<string, string> = {
  hero: "VIDEO INTRO WEBSITE.mp4",
  tiesto: "15_Tiesto-Goldcher-OneTaker-Lu-9x16.MP4",
  keinemusik: "KEINEMUSIK SUPPORT VIDEO.MOV",
  irina: "05_Goldcher-IrinaRimes-Senzoria-OnlyOne-2.mp4",
  untold: "08_Goldcher_UNTOLD_@lucianpopescu.mp4",
  "untold-b": "9_Goldcher_UNTOLD_@lucianpopescu.mp4",
  intro: "02_Goldcher-INTRO-OneTaker.mp4",
  cyclic: "goldcher_cyclic17Y_1.mp4",
  "cyclic-alt": "goldcher_cyclic17Y_2.mp4",
  matahale: "08_Goldcher-TeatruGastronomic-Matahale2.mp4",
  "gallery-1": "727ec697-7ebb-4ffe-a5b0-675123dff112.MP4",
  "gallery-2": "copy_DE4ED482-52E2-475A-B48F-6E53670B2879.MOV",
  "gallery-3": "goldcher_cyclic_7Feb2025_11 2.MP4",
  "gallery-4": "Goldcher-Irina-Oradea-2.MP4",
};

type PlaybackIds = Record<string, string | null>;

async function readPlaybackIds(): Promise<PlaybackIds> {
  const raw = await fs.readFile(DATA_FILE, "utf8");
  return JSON.parse(raw) as PlaybackIds;
}

async function writePlaybackIds(ids: PlaybackIds) {
  await fs.writeFile(DATA_FILE, JSON.stringify(ids, null, 2) + "\n");
}

/**
 * Upload a local file to Mux using the Direct Uploads API.
 * Returns the playback_id once the asset has been processed.
 */
async function uploadFile(filePath: string): Promise<string> {
  console.log(`  → creating upload for ${path.basename(filePath)}`);

  const upload = await mux.video.uploads.create({
    new_asset_settings: {
      playback_policies: ["public"],
      video_quality: "basic",
      encoding_tier: "baseline",
    },
    cors_origin: "*",
  });

  // Upload via tus-compatible PUT
  const stat = await fs.stat(filePath);
  const body = createReadStream(filePath);

  const res = await fetch(upload.url, {
    method: "PUT",
    // @ts-expect-error node fetch accepts ReadStream via duplex: 'half'
    body,
    duplex: "half",
    headers: { "Content-Length": stat.size.toString() },
  });

  if (!res.ok) {
    throw new Error(`Upload failed: ${res.status} ${res.statusText}`);
  }

  // Poll for the asset
  let asset;
  const maxTries = 60;
  for (let i = 0; i < maxTries; i++) {
    await new Promise((r) => setTimeout(r, 3000));
    const up = await mux.video.uploads.retrieve(upload.id);
    if (up.asset_id) {
      asset = await mux.video.assets.retrieve(up.asset_id);
      if (asset.status === "ready") break;
    }
    process.stdout.write(".");
  }
  process.stdout.write("\n");

  if (!asset || asset.status !== "ready") {
    throw new Error(`Asset never became ready for ${filePath}`);
  }

  const pb = asset.playback_ids?.[0];
  if (!pb) throw new Error("No playback_id on ready asset");
  return pb.id;
}

async function main() {
  const ids = await readPlaybackIds();
  const pending = Object.entries(MAPPING).filter(([key]) => !ids[key]);

  if (pending.length === 0) {
    console.log("All videos already transcoded.");
    return;
  }

  console.log(`Uploading ${pending.length} videos to Mux...`);

  for (const [key, filename] of pending) {
    const filePath = path.join(SRC_DIR, filename);
    try {
      await fs.access(filePath);
    } catch {
      console.warn(`  ⚠  ${filename} not found in ${SRC_DIR}, skipping`);
      continue;
    }

    console.log(`\n[${key}] ${filename}`);
    try {
      const playbackId = await uploadFile(filePath);
      ids[key] = playbackId;
      await writePlaybackIds(ids);
      console.log(`  ✓ ${key} → ${playbackId}`);
    } catch (err) {
      console.error(`  ✗ ${key}:`, (err as Error).message);
    }
  }

  console.log("\nDone. Commit the updated data/playback-ids.json.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
