"use client";

import { useEffect, type ReactNode } from "react";

export default function OverlayLayout({ children }: { children: ReactNode }) {
  useEffect(() => {
    document.documentElement.style.background = "transparent";
    document.body.style.background = "transparent";
    return () => {
      document.documentElement.style.background = "";
      document.body.style.background = "";
    };
  }, []);

  return children;
}
