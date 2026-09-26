import type { OverlayEvent } from "./store/useOverlayStore";

const CHANNEL_NAME = "streampulse-overlay-events";

export function broadcastOverlayEvent(event: OverlayEvent) {
  if (typeof window === "undefined" || typeof BroadcastChannel === "undefined") return;
  const channel = new BroadcastChannel(CHANNEL_NAME);
  channel.postMessage(event);
  channel.close();
}

export function subscribeOverlayEvents(onEvent: (event: OverlayEvent) => void) {
  if (typeof window === "undefined" || typeof BroadcastChannel === "undefined") {
    return () => {};
  }
  const channel = new BroadcastChannel(CHANNEL_NAME);
  channel.onmessage = (e: MessageEvent<OverlayEvent>) => onEvent(e.data);
  return () => channel.close();
}
