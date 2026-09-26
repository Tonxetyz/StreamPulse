"use client";

import { useRef, useState, type ReactNode, type PointerEvent as ReactPointerEvent } from "react";

export function DraggableWidget({
  children,
  defaultX,
  defaultY,
}: {
  children: ReactNode;
  defaultX: number; // % of container width
  defaultY: number; // % of container height
}) {
  const [pos, setPos] = useState({ x: defaultX, y: defaultY });
  const dragging = useRef(false);

  function onPointerDown(e: ReactPointerEvent<HTMLDivElement>) {
    dragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
  }

  function onPointerMove(e: ReactPointerEvent<HTMLDivElement>) {
    if (!dragging.current) return;
    const container = e.currentTarget.parentElement;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = Math.min(100, Math.max(0, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.min(100, Math.max(0, ((e.clientY - rect.top) / rect.height) * 100));
    setPos({ x, y });
  }

  function onPointerUp() {
    dragging.current = false;
  }

  return (
    <div
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      className="absolute cursor-grab touch-none active:cursor-grabbing"
      style={{ left: `${pos.x}%`, top: `${pos.y}%`, transform: "translate(-0%, -0%)" }}
    >
      {children}
    </div>
  );
}
