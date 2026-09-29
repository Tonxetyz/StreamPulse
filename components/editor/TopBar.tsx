"use client";

import Link from "next/link";
import { Clapperboard, LayoutGrid, Loader2, CheckCircle2, AlertTriangle, Download } from "lucide-react";
import { Chip } from "@/components/ui/Chip";

const RATIOS = ["9:16", "1:1", "16:9"] as const;
export type AspectRatio = (typeof RATIOS)[number];
export type ExportStatus = "idle" | "exporting" | "done" | "error";

export function TopBar({
  aspectRatio,
  onAspectRatioChange,
  exportStatus,
  exportProgress = 0,
  downloadUrl,
  errorMessage,
}: {
  aspectRatio: AspectRatio;
  onAspectRatioChange: (r: AspectRatio) => void;
  exportStatus: ExportStatus;
  exportProgress?: number;
  downloadUrl?: string | null;
  errorMessage?: string | null;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 pb-4">
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-semibold text-foreground">AI Clip Studio</h1>
        <nav className="flex gap-2 rounded-lg border border-border p-1">
          <span className="flex items-center gap-1.5 rounded-md bg-accent-purple px-3 py-1.5 text-sm text-white">
            <Clapperboard size={14} /> Клиппер
          </span>
          <Link
            href="/overlays"
            className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm text-foreground/60 hover:text-foreground"
          >
            <LayoutGrid size={14} /> OBS виджеты
          </Link>
        </nav>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex gap-1.5">
          {RATIOS.map((r) => (
            <Chip key={r} active={aspectRatio === r} onClick={() => onAspectRatioChange(r)}>
              {r}
            </Chip>
          ))}
        </div>

        <div className="flex items-center gap-1.5 text-xs text-foreground/60">
          {exportStatus === "exporting" && (
            <>
              <Loader2 size={14} className="animate-spin text-accent-cyan" />
              Нарезаю клип... {Math.round(exportProgress * 100)}%
            </>
          )}
          {exportStatus === "done" && (
            <>
              <CheckCircle2 size={14} className="text-accent-lime" /> Готово
              {downloadUrl && (
                <a
                  href={downloadUrl}
                  download="streampulse-clip.webm"
                  className="ml-1 flex items-center gap-1 text-accent-cyan hover:underline"
                >
                  <Download size={12} /> Скачать .webm
                </a>
              )}
            </>
          )}
          {exportStatus === "error" && (
            <span className="flex items-center gap-1.5 text-red-400" title={errorMessage ?? undefined}>
              <AlertTriangle size={14} /> Ошибка экспорта
            </span>
          )}
          {exportStatus === "idle" && "Не экспортировано"}
        </div>
      </div>
    </div>
  );
}
