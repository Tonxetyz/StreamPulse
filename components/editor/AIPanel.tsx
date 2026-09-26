"use client";

import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { Toggle } from "@/components/ui/Toggle";
import { Slider } from "@/components/ui/Slider";
import { useEditorStore, type SubtitleStyle } from "@/lib/store/useEditorStore";
import { HIGHLIGHT_TYPES, type HighlightType } from "@/lib/mock-clips";

const STYLES: { id: SubtitleStyle; label: string }[] = [
  { id: "mrbeast", label: "MrBeast" },
  { id: "cyberpunk", label: "Cyberpunk" },
  { id: "minimal", label: "Minimal" },
];

const WORD_COLORS = ["#22C55E", "#00F0FF", "#9146FF", "#FACC15"];

export function AIPanel({
  selectedTypes,
  onToggleType,
}: {
  selectedTypes: HighlightType[];
  onToggleType: (type: HighlightType) => void;
}) {
  const { subtitles, toggleAutoSubtitles, setSubtitleStyle, setFontSize, toggleNeonGlow, setActiveWordColor } =
    useEditorStore();

  return (
    <div className="space-y-4">
      <Card>
        <Toggle
          label="Авто-субтитры"
          checked={subtitles.autoSubtitles}
          onChange={toggleAutoSubtitles}
        />
      </Card>

      <Card className="space-y-3">
        <p className="text-sm font-medium text-foreground">Стиль текста</p>
        <div className="flex flex-wrap gap-2">
          {STYLES.map((s) => (
            <Chip key={s.id} active={subtitles.style === s.id} onClick={() => setSubtitleStyle(s.id)}>
              {s.label}
            </Chip>
          ))}
        </div>

        <label className="block text-xs text-foreground/60">
          Размер шрифта — {subtitles.fontSize}px
          <Slider
            min={16}
            max={56}
            value={subtitles.fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
            className="mt-1"
          />
        </label>

        <Toggle label="Неоновое свечение" checked={subtitles.neonGlow} onChange={toggleNeonGlow} accent="cyan" />

        <div className="flex items-center gap-2">
          <span className="text-xs text-foreground/60">Цвет активного слова</span>
          {WORD_COLORS.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setActiveWordColor(c)}
              className="h-5 w-5 rounded-full ring-2 ring-offset-2 ring-offset-surface"
              style={{ backgroundColor: c, ["--tw-ring-color" as string]: subtitles.activeWordColor === c ? c : "transparent" }}
            />
          ))}
        </div>
      </Card>

      <Card className="space-y-2">
        <p className="text-sm font-medium text-foreground">Фильтр хайлайтов</p>
        <div className="flex flex-wrap gap-2">
          {HIGHLIGHT_TYPES.map((type) => (
            <Chip
              key={type}
              active={selectedTypes.includes(type)}
              accent={type === "Laughter" ? "lime" : type === "Clutch" ? "purple" : "cyan"}
              onClick={() => onToggleType(type)}
            >
              {type}
            </Chip>
          ))}
        </div>
      </Card>
    </div>
  );
}
