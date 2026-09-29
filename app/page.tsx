"use client";

import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { TopBar, type AspectRatio, type ExportStatus } from "@/components/editor/TopBar";
import { PhonePreview } from "@/components/editor/PhonePreview";
import { AIPanel } from "@/components/editor/AIPanel";
import { HighlightTimeline, type TrimRange } from "@/components/editor/HighlightTimeline";
import { useEditorStore } from "@/lib/store/useEditorStore";
import { mockClips, HIGHLIGHT_TYPES, type HighlightType } from "@/lib/mock-clips";
import { exportClipFromVideo } from "@/lib/export-clip";

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { selectedClipId, setSelectedClipId, currentTime, duration, setCurrentTime } = useEditorStore();

  const clip = mockClips.find((c) => c.id === selectedClipId) ?? mockClips[0];

  const [aspectRatio, setAspectRatio] = useState<AspectRatio>("9:16");
  const [exportStatus, setExportStatus] = useState<ExportStatus>("idle");
  const [exportProgress, setExportProgress] = useState(0);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [exportError, setExportError] = useState<string | null>(null);
  const [selectedTypes, setSelectedTypes] = useState<HighlightType[]>([...HIGHLIGHT_TYPES]);
  const [trimRange, setTrimRange] = useState<TrimRange>({ start: 0, end: clip.duration });

  useEffect(() => () => { if (downloadUrl) URL.revokeObjectURL(downloadUrl); }, [downloadUrl]);

  function selectClip(id: string) {
    setSelectedClipId(id);
    const next = mockClips.find((c) => c.id === id);
    setTrimRange({ start: 0, end: next?.duration ?? 0 });
    setExportStatus("idle");
    setDownloadUrl(null);
  }

  function toggleType(type: HighlightType) {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
  }

  function handleSeek(time: number) {
    setCurrentTime(time);
    if (videoRef.current) videoRef.current.currentTime = time;
  }

  async function handleExport() {
    if (!videoRef.current) return;
    setDownloadUrl(null);
    setExportError(null);
    setExportProgress(0);
    setExportStatus("exporting");
    try {
      const blob = await exportClipFromVideo(videoRef.current, trimRange.start, trimRange.end, (p) =>
        setExportProgress(p.progress),
      );
      setDownloadUrl(URL.createObjectURL(blob));
      setExportStatus("done");
    } catch (err) {
      setExportError(err instanceof Error ? err.message : String(err));
      setExportStatus("error");
    }
  }

  const filteredHighlights = clip.highlights.filter((h) => selectedTypes.includes(h.label as HighlightType));

  return (
    <main className="min-h-screen bg-background px-6 py-6">
      <div className="mx-auto max-w-7xl">
        <TopBar
          aspectRatio={aspectRatio}
          onAspectRatioChange={setAspectRatio}
          exportStatus={exportStatus}
          exportProgress={exportProgress}
          downloadUrl={downloadUrl}
          errorMessage={exportError}
        />

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_2fr_300px]">
          <Card className="lg:order-1">
            <p className="mb-2 text-sm font-medium text-foreground">Демо-ролики</p>
            <div className="flex flex-col gap-2">
              {mockClips.map((c) => (
                <Chip
                  key={c.id}
                  active={c.id === clip.id}
                  onClick={() => selectClip(c.id)}
                  disabled={exportStatus === "exporting"}
                  className="justify-start truncate text-left"
                >
                  {c.title}
                </Chip>
              ))}
            </div>
          </Card>

          <div className="lg:order-2">
            <PhonePreview
              clip={clip}
              aspectRatio={aspectRatio}
              videoRef={videoRef}
              exporting={exportStatus === "exporting"}
            />
          </div>

          <div className="lg:order-3">
            <AIPanel selectedTypes={selectedTypes} onToggleType={toggleType} />
          </div>
        </div>

        <div className="mt-4">
          <HighlightTimeline
            highlights={filteredHighlights}
            currentTime={currentTime}
            duration={duration || clip.duration}
            onSeek={handleSeek}
            trimRange={trimRange}
            onTrimChange={setTrimRange}
            onExport={handleExport}
            exportStatus={exportStatus}
          />
        </div>
      </div>
    </main>
  );
}
