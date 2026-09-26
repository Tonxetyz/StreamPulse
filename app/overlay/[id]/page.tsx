"use client";

import { use, useEffect, useState } from "react";
import { useOverlayStore, type OverlayAlert } from "@/lib/store/useOverlayStore";
import { subscribeOverlayEvents } from "@/lib/overlay-channel";
import { DonationAlert } from "@/components/overlays/DonationAlert";
import { ChatWidget } from "@/components/overlays/ChatWidget";
import { cn } from "@/lib/utils";

const positionClasses = {
  "top-left": "top-6 left-6",
  "top-right": "top-6 right-6",
  "bottom-left": "bottom-6 left-6",
  "bottom-right": "bottom-6 right-6",
} as const;

const oppositeCorner = {
  "top-left": "bottom-right",
  "top-right": "bottom-left",
  "bottom-left": "top-right",
  "bottom-right": "top-left",
} as const;

export default function OverlayPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { theme, position, widgets } = useOverlayStore();
  const [liveAlert, setLiveAlert] = useState<OverlayAlert | null>(null);

  useEffect(() => {
    return subscribeOverlayEvents((event) => {
      if (event.type !== "alert") return;
      setLiveAlert(event.alert);
      const timer = setTimeout(() => setLiveAlert(null), 4000);
      return () => clearTimeout(timer);
    });
  }, []);

  return (
    <div data-overlay-id={id} className="relative h-screen w-screen">
      {widgets.lastDonation && (
        <div className={cn("absolute", positionClasses[position])}>
          <DonationAlert alert={liveAlert} theme={theme} />
        </div>
      )}
      {widgets.chat && (
        <div className={cn("absolute", positionClasses[oppositeCorner[position]])}>
          <ChatWidget />
        </div>
      )}
    </div>
  );
}
