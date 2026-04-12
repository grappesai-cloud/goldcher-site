const ARTIST_ID = "1n9K41Jye8s8F0z1hb1Qhz";

type SpotifyToken = { access_token: string; expires_in: number };

async function getToken(): Promise<string | null> {
  const id = process.env.SPOTIFY_CLIENT_ID;
  const secret = process.env.SPOTIFY_CLIENT_SECRET;
  if (!id || !secret) {
    console.error("[spotify] Missing env vars", { hasId: !!id, hasSecret: !!secret });
    return null;
  }

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${id}:${secret}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("[spotify] Token fetch failed", res.status, await res.text());
    return null;
  }
  const data = (await res.json()) as SpotifyToken;
  return data.access_token;
}

async function spotifyFetch<T>(endpoint: string): Promise<T | null> {
  const token = await getToken();
  if (!token) {
    console.error("[spotify] No token, skipping fetch for", endpoint);
    return null;
  }

  const res = await fetch(`https://api.spotify.com/v1${endpoint}`, {
    headers: { Authorization: `Bearer ${token}` },
    next: { revalidate: 3600, tags: ["spotify"] },
  });

  if (!res.ok) {
    console.error("[spotify] API error", endpoint, res.status, await res.text());
    return null;
  }
  return (await res.json()) as T;
}

export type SpotifyArtist = {
  id: string;
  name: string;
  followers: { total: number };
  images: { url: string; width: number; height: number }[];
  genres: string[];
  external_urls: { spotify: string };
};

export type SpotifyTrack = {
  id: string;
  name: string;
  duration_ms: number;
  preview_url: string | null;
  external_urls: { spotify: string };
  album: {
    name: string;
    release_date: string;
    images: { url: string; width: number; height: number }[];
  };
  popularity: number;
};

export type SpotifyAlbum = {
  id: string;
  name: string;
  release_date: string;
  album_type: string;
  images: { url: string; width: number; height: number }[];
  external_urls: { spotify: string };
  total_tracks: number;
};

export async function getArtist() {
  return spotifyFetch<SpotifyArtist>(`/artists/${ARTIST_ID}`);
}

export async function getTopTracks() {
  const data = await spotifyFetch<{ tracks: SpotifyTrack[] }>(
    `/artists/${ARTIST_ID}/top-tracks?market=RO`
  );
  return data?.tracks ?? [];
}

export async function getLatestAlbum() {
  const data = await spotifyFetch<{ items: SpotifyAlbum[] }>(
    `/artists/${ARTIST_ID}/albums?market=US&limit=10&include_groups=album,single`
  );
  const items = data?.items ?? [];
  return items[0] ?? null;
}

export async function getAlbums(limit = 10) {
  const data = await spotifyFetch<{ items: SpotifyAlbum[] }>(
    `/artists/${ARTIST_ID}/albums?market=US&limit=${limit}&include_groups=album,single`
  );
  return data?.items ?? [];
}

/**
 * Spotify's oEmbed endpoint works without authentication.
 * Returns the artist's profile image and an embeddable iframe URL.
 * Used as a fallback when Spotify API credentials aren't configured.
 */
export type SpotifyOEmbed = {
  title: string;
  thumbnail_url: string;
  iframe_url: string;
  width: number;
  height: number;
};

export async function getSpotifyOEmbed(): Promise<SpotifyOEmbed | null> {
  try {
    const url = `https://open.spotify.com/oembed?url=${encodeURIComponent(
      `https://open.spotify.com/artist/${ARTIST_ID}`
    )}`;
    const res = await fetch(url, {
      next: { revalidate: 86400, tags: ["spotify-oembed"] },
    });
    if (!res.ok) return null;
    return (await res.json()) as SpotifyOEmbed;
  } catch {
    return null;
  }
}

export { ARTIST_ID };
