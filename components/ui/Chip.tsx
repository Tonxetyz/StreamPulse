import { type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  accent?: "purple" | "cyan" | "lime";
}

const activeStyles: Record<NonNullable<ChipProps["accent"]>, string> = {
  purple: "border-accent-purple bg-accent-purple/15 text-accent-purple",
  cyan: "border-accent-cyan bg-accent-cyan/15 text-accent-cyan",
  lime: "border-accent-lime bg-accent-lime/15 text-accent-lime",
};

export function Chip({ className, active, accent = "purple", ...props }: ChipProps) {
  return (
    <button
      type="button"
      className={cn(
        "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
        active ? activeStyles[accent] : "border-border text-foreground/60 hover:text-foreground",
        className,
      )}
      {...props}
    />
  );
}
