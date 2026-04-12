"use client";

import { useEffect, useRef, useState } from "react";
import MuxPlayer from "@mux/mux-player-react/lazy";
import playbackIds from "@/data/playback-ids.json";

type PlaybackKey = keyof typeof playbackIds;

/**
 * Video wrapper with 3-tier fallback:
 *   1. Mux HLS stream (if playback_id is set in data/playback-ids.json)
 *   2. Local file at /videos/<videoKey>.mp4 (served from public/videos)
 *   3. Grayscale placeholder with the key label
 */
export function MuxVideo({
  videoKey,
  poster,
  autoPlay = false,
  loop = false,
  muted = true,
  controls = false,
  className,
  aspect = "16/9",
  onLoadedData,
}: {
  videoKey: PlaybackKey;
  poster?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
  className?: string;
  aspect?: string;
  onLoadedData?: () => void;
}) {
  const playbackId = playbackIds[videoKey] as string | null;
  const [localMissing, setLocalMissing] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Autoplay nudge: some browsers need a programmatic play() after mount
  useEffect(() => {
    if (!playbackId && autoPlay && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [playbackId, autoPlay]);

  if (playbackId) {
    return (
      <MuxPlayer
        playbackId={playbackId}
        streamType="on-demand"
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        playsInline
        className={className}
        style={{ aspectRatio: aspect }}
        poster={poster}
        onLoadedData={onLoadedData}
      />
    );
  }

  // Local fallback — load /videos/<key>.mp4
  const localSrc = `/videos/${videoKey}.mp4`;

  if (localMissing) {
    return (
      <div
        className={className}
        style={{
          aspectRatio: aspect,
          backgroundColor: "var(--carbon)",
          backgroundImage: poster ? `url(${poster})` : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
        }}
      >
        <div
          aria-hidden
          className="absolute inset-0 flex items-center justify-center font-mono text-[9px] uppercase tracking-widest opacity-40"
          style={{ color: "var(--cream)" }}
        >
          {videoKey}
        </div>
      </div>
    );
  }

  return (
    <video
      ref={videoRef}
      src={localSrc}
      poster={poster}
      autoPlay={autoPlay}
      loop={loop}
      muted={muted}
      controls={controls}
      playsInline
      preload="metadata"
      className={className}
      style={{ aspectRatio: aspect, objectFit: "cover" }}
      onError={() => setLocalMissing(true)}
      onLoadedData={onLoadedData}
    />
  );
}
