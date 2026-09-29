"use client";

import { useEffect, type RefObject } from "react";
import { Pause, Play, Video } from "lucide-react";
import { cn } from "@/lib/utils";
import type { MockClip } from "@/lib/mock-clips";
import { mockCaptions } from "@/lib/mock-clips";
import { useEditorStore } from "@/lib/store/useEditorStore";
import { SubtitleOverlay } from "./SubtitleOverlay";
import type { AspectRatio } from "./TopBar";

const ratioClass: Record<AspectRatio, string> = {
  "9:16": "aspect-[9/16] max-w-[300px]",
  "1:1": "aspect-square max-w-[380px]",
  "16:9": "aspect-video max-w-[520px]",
};

export function PhonePreview({
  clip,
  aspectRatio,
  videoRef,
  exporting = false,
}: {
  clip: MockClip;
  aspectRatio: AspectRatio;
  videoRef: RefObject<HTMLVideoElement | null>;
  exporting?: boolean;
}) {
  const {
    isPlaying,
    currentTime,
    volume,
    subtitles,
    togglePlay,
    setCurrentTime,
    setDuration,
  } = useEditorStore();

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (isPlaying) el.play().catch(() => {});
    else el.pause();
  }, [isPlaying, clip.id, videoRef]);

  useEffect(() => {
    const el = videoRef.current;
    if (el) el.volume = volume;
  }, [volume, videoRef]);

  const captions = mockCaptions[clip.id] ?? [];

  return (
    <div
      className={cn(
        "relative mx-auto w-full overflow-hidden rounded-[2rem] border-8 border-[#1E2333] bg-black shadow-2xl",
        ratioClass[aspectRatio],
      )}
    >
      <div className="relative flex h-full w-full flex-col">
        <div className="relative flex h-1/2 items-center justify-center bg-gradient-to-br from-accent-purple/30 to-surface">
          <div className="flex flex-col items-center gap-1 text-foreground/50">
            <Video size={28} />
            <span className="text-[10px] uppercase tracking-wide">Facecam</span>
          </div>
        </div>

        <div className="relative h-1/2 w-full bg-black">
          <video
            ref={videoRef}
            src={clip.videoUrl}
            className="h-full w-full object-cover"
            muted
            playsInline
            onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
            onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
          />
        </div>

        {subtitles.autoSubtitles && (
          <SubtitleOverlay
            words={captions}
            currentTime={currentTime}
            style={subtitles.style}
            fontSize={subtitles.fontSize}
            neonGlow={subtitles.neonGlow}
            activeWordColor={subtitles.activeWordColor}
          />
        )}

        <button
          type="button"
          onClick={togglePlay}
          disabled={exporting}
          className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors hover:bg-black/20 disabled:pointer-events-none"
        >
          {!isPlaying && !exporting && (
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-black">
              <Play size={22} className="ml-0.5" />
            </span>
          )}
        </button>

        {exporting ? (
          <span className="pointer-events-none absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-1 text-xs font-semibold text-accent-lime">
            <span className="h-2 w-2 animate-pulse rounded-full bg-accent-lime" /> REC
          </span>
        ) : (
          isPlaying && (
            <span className="pointer-events-none absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white">
              <Pause size={14} />
            </span>
          )
        )}
      </div>
    </div>
  );
}
