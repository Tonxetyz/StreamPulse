import type { OverlayTheme } from "@/lib/store/useOverlayStore";
import { cn } from "@/lib/utils";

const accentBg: Record<OverlayTheme, string> = {
  purple: "bg-accent-purple",
  cyan: "bg-accent-cyan",
  lime: "bg-accent-lime",
};

export function GoalWidget({
  current,
  target,
  label,
  theme = "purple",
}: {
  current: number;
  target: number;
  label: string;
  theme?: OverlayTheme;
}) {
  const pct = Math.min(100, Math.round((current / target) * 100));

  return (
    <div className="glass-panel w-72 rounded-xl px-4 py-3">
      <div className="mb-1.5 flex items-center justify-between text-xs">
        <span className="text-foreground/70">{label}</span>
        <span className="font-semibold text-foreground">
          ${current} / ${target}
        </span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-border">
        <div
          className={cn("h-full rounded-full transition-all", accentBg[theme])}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
