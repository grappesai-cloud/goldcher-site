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
 *
 * Videos are lazy-loaded: only start loading when visible in viewport.
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
  const [inView, setInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Lazy load: only render video when it enters viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Autoplay nudge: some browsers need a programmatic play() after mount
  useEffect(() => {
    if (inView && !playbackId && autoPlay && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [inView, playbackId, autoPlay]);

  // Pause when out of viewport to save resources
  useEffect(() => {
    if (!autoPlay) return;
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const video = videoRef.current;
        if (!video) return;
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [inView, autoPlay]);

  if (playbackId) {
    return (
      <div ref={containerRef} style={{ aspectRatio: aspect }} className={className}>
        {inView ? (
          <MuxPlayer
            playbackId={playbackId}
            streamType="on-demand"
            autoPlay={autoPlay}
            loop={loop}
            muted={muted}
            playsInline
            className="h-full w-full object-cover"
            style={{ aspectRatio: aspect }}
            poster={poster}
            onLoadedData={onLoadedData}
          />
        ) : (
          <div
            style={{
              aspectRatio: aspect,
              backgroundColor: "var(--carbon)",
            }}
          />
        )}
      </div>
    );
  }

  // Local fallback — load /videos/<key>.mp4
  const localSrc = `/videos/${videoKey}.mp4`;

  if (localMissing) {
    return (
      <div
        ref={containerRef}
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
    <div ref={containerRef} className={className} style={{ aspectRatio: aspect, position: "relative" }}>
      {inView ? (
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
          className="h-full w-full object-cover"
          style={{ aspectRatio: aspect, objectFit: "cover" }}
          onError={() => setLocalMissing(true)}
          onLoadedData={onLoadedData}
        />
      ) : (
        <div
          style={{
            aspectRatio: aspect,
            backgroundColor: "var(--carbon)",
          }}
        />
      )}
    </div>
  );
}
