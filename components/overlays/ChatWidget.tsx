"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const DEMO_CHAT = [
  { user: "NeonRider", text: "GG WP 🔥" },
  { user: "PixelQueen", text: "как ты это сделал???" },
  { user: "StreamGoblin", text: "залутай ещё раз плиз" },
  { user: "MrClutch", text: "clip that!!" },
  { user: "Ghostface_TV", text: "лучший стрим за неделю" },
  { user: "wowzers", text: "ахахаха ору" },
];

export function ChatWidget() {
  const [messages, setMessages] = useState(DEMO_CHAT.slice(0, 2));

  useEffect(() => {
    let i = messages.length;
    const id = setInterval(() => {
      const next = DEMO_CHAT[i % DEMO_CHAT.length];
      setMessages((prev) => [...prev.slice(-4), next]);
      i += 1;
    }, 2200);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-72 space-y-1.5">
      <AnimatePresence initial={false}>
        {messages.map((m, idx) => (
          <motion.div
            key={`${m.user}-${idx}-${m.text}`}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            className="glass-panel rounded-lg px-3 py-1.5 text-xs"
          >
            <span className="font-semibold text-accent-cyan">{m.user}: </span>
            <span className="text-foreground/90">{m.text}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
