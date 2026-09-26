"use client";

import { Gift, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useOverlayStore } from "@/lib/store/useOverlayStore";

export function EventControls() {
  const triggerTestAlert = useOverlayStore((s) => s.triggerTestAlert);

  return (
    <div className="flex gap-2">
      <Button accent="purple" onClick={() => triggerTestAlert("donation")}>
        <Gift size={16} /> Test $10 Donation
      </Button>
      <Button accent="cyan" onClick={() => triggerTestAlert("follower")}>
        <UserPlus size={16} /> Test Follower
      </Button>
    </div>
  );
}
