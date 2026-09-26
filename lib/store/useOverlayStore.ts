import { create } from "zustand";
import { persist } from "zustand/middleware";
import confetti from "canvas-confetti";
import { broadcastOverlayEvent } from "../overlay-channel";

export type OverlayTheme = "purple" | "cyan" | "lime";
export type OverlayPosition = "top-left" | "top-right" | "bottom-left" | "bottom-right";

interface WidgetVisibility {
  lastDonation: boolean;
  chat: boolean;
  goal: boolean;
}

export interface OverlayAlert {
  id: string;
  kind: "donation" | "follower";
  donor: string;
  amount?: number;
  message?: string;
}

export type OverlayEvent = { type: "alert"; alert: OverlayAlert };

interface GoalConfig {
  current: number;
  target: number;
  label: string;
}

interface OverlayState {
  theme: OverlayTheme;
  position: OverlayPosition;
  widgets: WidgetVisibility;
  goal: GoalConfig;
  activeAlert: OverlayAlert | null;

  setTheme: (theme: OverlayTheme) => void;
  setPosition: (position: OverlayPosition) => void;
  toggleWidget: (widget: keyof WidgetVisibility) => void;
  triggerTestAlert: (kind: OverlayAlert["kind"]) => void;
}

const DEMO_DONORS = ["Ghostface_TV", "NeonRider", "PixelQueen", "StreamGoblin", "MrClutch"];
const DEMO_MESSAGES = ["Го дальше!", "Спасибо за стрим!", "Лучший стример!", "Дожимай их!"];

function buildAlert(kind: OverlayAlert["kind"]): OverlayAlert {
  const donor = DEMO_DONORS[Math.floor(Math.random() * DEMO_DONORS.length)];
  if (kind === "donation") {
    return {
      id: crypto.randomUUID(),
      kind,
      donor,
      amount: 10,
      message: DEMO_MESSAGES[Math.floor(Math.random() * DEMO_MESSAGES.length)],
    };
  }
  return { id: crypto.randomUUID(), kind, donor };
}

export const useOverlayStore = create<OverlayState>()(
  persist(
    (set) => ({
      theme: "purple",
      position: "top-right",
      widgets: { lastDonation: true, chat: true, goal: true },
      goal: { current: 340, target: 1000, label: "Донат-цель месяца" },
      activeAlert: null,

      setTheme: (theme) => set({ theme }),
      setPosition: (position) => set({ position }),
      toggleWidget: (widget) =>
        set((s) => ({ widgets: { ...s.widgets, [widget]: !s.widgets[widget] } })),

      triggerTestAlert: (kind) => {
        const alert = buildAlert(kind);
        set({ activeAlert: alert });
        broadcastOverlayEvent({ type: "alert", alert });

        confetti({
          particleCount: 120,
          spread: 90,
          origin: { y: 0.3 },
          colors: ["#9146FF", "#00F0FF", "#22C55E"],
        });

        setTimeout(() => set({ activeAlert: null }), 4000);
      },
    }),
    {
      name: "streampulse-overlay-settings",
      partialize: (s) => ({ theme: s.theme, position: s.position, widgets: s.widgets, goal: s.goal }),
    },
  ),
);
