"use client";

import { useEffect, useRef, useState } from "react";
import { Scissors } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import type { Highlight } from "@/lib/store/useEditorStore";
import type { ExportStatus } from "./TopBar";

const labelColor: Record<string, string> = {
  Laughter: "bg-accent-lime",
  Clutch: "bg-accent-purple",
  Scream: "bg-accent-cyan",
};

export interface TrimRange {
  start: number;
  end: number;
}

export function HighlightTimeline({
  highlights,
  currentTime,
  duration,
  onSeek,
  trimRange,
  onTrimChange,
  onExport,
  exportStatus,
}: {
  highlights: Highlight[];
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
  trimRange: TrimRange;
  onTrimChange: (range: TrimRange) => void;
  onExport: () => void;
  exportStatus: ExportStatus;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState<"start" | "end" | null>(null);
  const safeDuration = duration || 1;

  const timeFromClientX = (clientX: number) => {
    const rect = trackRef.current?.getBoundingClientRect();
    if (!rect) return 0;
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    return ratio * safeDuration;
  };

  useEffect(() => {
    if (!dragging) return;
    function onMove(e: PointerEvent) {
      const t = timeFromClientX(e.clientX);
      if (dragging === "start") {
        onTrimChange({ start: Math.min(t, trimRange.end - 0.2), end: trimRange.end });
      } else {
        onTrimChange({ start: trimRange.start, end: Math.max(t, trimRange.start + 0.2) });
      }
    }
    function onUp() {
      setDragging(null);
    }
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dragging, trimRange]);

  const pct = (t: number) => `${(t / safeDuration) * 100}%`;

  return (
    <div className="rounded-xl border border-border bg-surface p-4">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm font-medium text-foreground">Timeline</p>
        <Button accent="lime" onClick={onExport} disabled={exportStatus === "exporting"}>
          <Scissors size={14} /> Export Clip
        </Button>
      </div>

      <div
        ref={trackRef}
        className="relative h-12 w-full cursor-pointer rounded-lg bg-background"
        onClick={(e) => onSeek(timeFromClientX(e.clientX))}
      >
        {/* затемнение вне зоны обрезки */}
        <div className="absolute inset-y-0 left-0 rounded-l-lg bg-black/60" style={{ width: pct(trimRange.start) }} />
        <div
          className="absolute inset-y-0 right-0 rounded-r-lg bg-black/60"
          style={{ width: `${100 - (trimRange.end / safeDuration) * 100}%` }}
        />

        {/* метки хайлайтов */}
        {highlights.map((h) => (
          <button
            key={h.id}
            type="button"
            title={`${h.label} · score ${h.score}`}
            onClick={(e) => {
              e.stopPropagation();
              onSeek(h.timeStart);
            }}
            className={cn("absolute top-1 h-3 rounded-full opacity-80 hover:opacity-100", labelColor[h.label] ?? "bg-foreground")}
            style={{ left: pct(h.timeStart), width: pct(Math.max(h.timeEnd - h.timeStart, 1)) }}
          />
        ))}

        {/* плейхед */}
        <div
          className="absolute top-0 h-full w-0.5 bg-white"
          style={{ left: pct(currentTime) }}
        />

        {/* ползунки обрезки */}
        <div
          onPointerDown={(e) => {
            e.stopPropagation();
            setDragging("start");
          }}
          className="absolute top-0 h-full w-2 -translate-x-1/2 cursor-ew-resize rounded bg-accent-purple"
          style={{ left: pct(trimRange.start) }}
        />
        <div
          onPointerDown={(e) => {
            e.stopPropagation();
            setDragging("end");
          }}
          className="absolute top-0 h-full w-2 -translate-x-1/2 cursor-ew-resize rounded bg-accent-purple"
          style={{ left: pct(trimRange.end) }}
        />
      </div>

      <div className="mt-1.5 flex justify-between text-[10px] text-foreground/40">
        <span>{trimRange.start.toFixed(1)}s</span>
        <span>{safeDuration.toFixed(1)}s</span>
      </div>
    </div>
  );
}
