"use client";

import { useOverlayStore } from "@/lib/store/useOverlayStore";
import { DraggableWidget } from "./DraggableWidget";
import { DonationAlert } from "./DonationAlert";
import { ChatWidget } from "./ChatWidget";
import { GoalWidget } from "./GoalWidget";

export function OverlayCanvasPreview() {
  const { theme, widgets, goal, activeAlert } = useOverlayStore();

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-border bg-[radial-gradient(circle_at_30%_20%,#1e2333_0%,#090a0f_70%)]">
      <p className="absolute left-3 top-3 text-xs text-foreground/40">
        Предпросмотр холста — перетащите виджеты
      </p>

      {widgets.lastDonation && (
        <DraggableWidget defaultX={4} defaultY={12}>
          <DonationAlert
            alert={activeAlert ?? { id: "preview", kind: "donation", donor: "NeonRider", amount: 10, message: "Спасибо за стрим!" }}
            theme={theme}
          />
        </DraggableWidget>
      )}

      {widgets.chat && (
        <DraggableWidget defaultX={70} defaultY={15}>
          <ChatWidget />
        </DraggableWidget>
      )}

      {widgets.goal && (
        <DraggableWidget defaultX={4} defaultY={80}>
          <GoalWidget current={goal.current} target={goal.target} label={goal.label} theme={theme} />
        </DraggableWidget>
      )}
    </div>
  );
}
