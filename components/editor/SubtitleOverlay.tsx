"use client";

import { cn } from "@/lib/utils";
import type { CaptionWord } from "@/lib/mock-clips";
import type { SubtitleStyle } from "@/lib/store/useEditorStore";

const stylePreset: Record<SubtitleStyle, string> = {
  mrbeast: "font-extrabold uppercase text-white [-webkit-text-stroke:2px_black]",
  cyberpunk: "font-bold text-accent-cyan",
  minimal: "font-medium text-white",
};

export function SubtitleOverlay({
  words,
  currentTime,
  style,
  fontSize,
  neonGlow,
  activeWordColor,
}: {
  words: CaptionWord[];
  currentTime: number;
  style: SubtitleStyle;
  fontSize: number;
  neonGlow: boolean;
  activeWordColor: string;
}) {
  const visible = words.filter((w) => currentTime >= w.start - 0.05 && currentTime <= w.start + 3.5);
  if (visible.length === 0) return null;

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-6 flex flex-wrap justify-center gap-1.5 px-4">
      {visible.map((w, i) => {
        const active = currentTime >= w.start && currentTime <= w.end;
        return (
          <span
            key={`${w.word}-${i}`}
            className={cn("transition-transform duration-150", stylePreset[style], active && "scale-110")}
            style={{
              fontSize,
              color: active ? activeWordColor : undefined,
              textShadow: neonGlow ? `0 0 12px ${active ? activeWordColor : "#ffffff"}` : undefined,
            }}
          >
            {w.word}
          </span>
        );
      })}
    </div>
  );
}
