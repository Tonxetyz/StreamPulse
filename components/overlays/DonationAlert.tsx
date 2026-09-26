"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Gift, UserPlus } from "lucide-react";
import type { OverlayAlert, OverlayTheme } from "@/lib/store/useOverlayStore";
import { cn } from "@/lib/utils";

const themeAccent: Record<OverlayTheme, string> = {
  purple: "border-accent-purple shadow-[0_0_30px_-5px_#9146FF]",
  cyan: "border-accent-cyan shadow-[0_0_30px_-5px_#00F0FF]",
  lime: "border-accent-lime shadow-[0_0_30px_-5px_#22C55E]",
};

const themeIconBg: Record<OverlayTheme, string> = {
  purple: "bg-accent-purple text-white",
  cyan: "bg-accent-cyan text-black",
  lime: "bg-accent-lime text-black",
};

export function DonationAlert({
  alert,
  theme = "purple",
}: {
  alert: OverlayAlert | null;
  theme?: OverlayTheme;
}) {
  return (
    <AnimatePresence>
      {alert && (
        <motion.div
          key={alert.id}
          initial={{ opacity: 0, y: -24, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -12, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className={cn(
            "glass-panel flex items-center gap-3 rounded-xl border-2 px-4 py-3 min-w-[260px]",
            themeAccent[theme],
          )}
        >
          <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-full", themeIconBg[theme])}>
            {alert.kind === "donation" ? <Gift size={20} /> : <UserPlus size={20} />}
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">
              {alert.donor}
              {alert.kind === "donation" ? ` задонатил $${alert.amount}` : " подписался!"}
            </p>
            {alert.message && <p className="text-xs text-foreground/60">{alert.message}</p>}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
