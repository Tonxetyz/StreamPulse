"use client";

import { useState, useSyncExternalStore } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/Button";

const subscribe = () => () => {};
const getOrigin = () => window.location.origin;
const getServerOrigin = () => "";

export function LinkGenerator({ overlayId = "demo" }: { overlayId?: string }) {
  const [copied, setCopied] = useState(false);
  const origin = useSyncExternalStore(subscribe, getOrigin, getServerOrigin);

  const url = `${origin}/overlay/${overlayId}`;

  async function copy() {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2">
      <code className="flex-1 truncate text-xs text-accent-cyan">{url}</code>
      <Button variant="outline" accent="cyan" onClick={copy} className="shrink-0">
        {copied ? <Check size={14} /> : <Copy size={14} />}
        {copied ? "Скопировано" : "Copy OBS Browser Link"}
      </Button>
    </div>
  );
}
