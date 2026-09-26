import { cn } from "@/lib/utils";

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  accent?: "purple" | "cyan" | "lime";
}

const accentBg: Record<NonNullable<ToggleProps["accent"]>, string> = {
  purple: "bg-accent-purple",
  cyan: "bg-accent-cyan",
  lime: "bg-accent-lime",
};

export function Toggle({ checked, onChange, label, accent = "purple" }: ToggleProps) {
  return (
    <label className="flex items-center justify-between gap-3 cursor-pointer select-none">
      {label && <span className="text-sm text-foreground/80">{label}</span>}
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative h-5 w-9 shrink-0 rounded-full transition-colors",
          checked ? accentBg[accent] : "bg-border",
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform",
            "left-0.5",
            checked ? "translate-x-4" : "translate-x-0",
          )}
        />
      </button>
    </label>
  );
}
