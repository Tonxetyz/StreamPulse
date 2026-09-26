import { type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant = "solid" | "outline" | "ghost";
type Accent = "purple" | "cyan" | "lime" | "neutral";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  accent?: Accent;
}

const accentSolid: Record<Accent, string> = {
  purple: "bg-accent-purple text-white hover:bg-accent-purple/90",
  cyan: "bg-accent-cyan text-black hover:bg-accent-cyan/90",
  lime: "bg-accent-lime text-black hover:bg-accent-lime/90",
  neutral: "bg-surface text-foreground hover:bg-surface/80",
};

const accentOutline: Record<Accent, string> = {
  purple: "border-accent-purple text-accent-purple hover:bg-accent-purple/10",
  cyan: "border-accent-cyan text-accent-cyan hover:bg-accent-cyan/10",
  lime: "border-accent-lime text-accent-lime hover:bg-accent-lime/10",
  neutral: "border-border text-foreground hover:bg-surface",
};

export function Button({
  className,
  variant = "solid",
  accent = "neutral",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors disabled:opacity-40 disabled:pointer-events-none",
        variant === "solid" && accentSolid[accent],
        variant === "outline" && cn("border", accentOutline[accent]),
        variant === "ghost" && "text-foreground/70 hover:text-foreground hover:bg-surface",
        className,
      )}
      {...props}
    />
  );
}
