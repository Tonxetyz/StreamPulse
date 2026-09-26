<div align="center">

# 🎬 StreamPulse

**Turn raw stream footage into viral vertical clips and drop a ready-made OBS overlay — no external API keys required.**

[![Framework](https://img.shields.io/badge/Framework-Next.js%2016-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Styling](https://img.shields.io/badge/Styling-Tailwind%20CSS%204-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![State](https://img.shields.io/badge/State-Zustand-443E38?logo=react&logoColor=white)](https://zustand-demo.pmnd.rs)
[![License](https://img.shields.io/badge/License-MIT-10B981.svg)](./LICENSE)
[![Vercel](https://img.shields.io/badge/Vercel-Ready-black?logo=vercel)](https://vercel.com)

[Live Demo](#) · [Features](#-key-features) · [Quick Start](#-getting-started) · [Architecture](#-project-structure)

</div>

---

<div align="center">
  <img src=".github/hero.png" alt="StreamPulse clip studio and overlay builder preview" width="900" />
  <p><em>Place a hero screenshot or GIF of the Clip Studio / Overlay Studio at <code>.github/hero.png</code></em></p>
</div>

---

## ✨ Key Features

- 🤖 **AI Highlight Timeline** — a scored/labeled highlight track (`Laughter`, `Clutch`, `Scream`) rendered as colored markers on the scrub bar, filterable in one click and seekable straight from the timeline.
- 📱 **9:16 Vertical Clip Preview** — a phone-framed split-screen preview (facecam top / gameplay bottom) with live aspect-ratio switching between `9:16`, `1:1`, and `16:9`.
- 💬 **Animated Karaoke Subtitles** — word-level timed captions with three visual presets (**MrBeast**, **Cyberpunk**, **Minimal**), adjustable font size, neon glow, and per-word highlight color.
- ✂️ **Draggable Trim & Export** — dual drag handles on the timeline set the export range, with a mock export pipeline (progress → done) reflected live in the top bar status badge.
- 🎛️ **OBS Overlay Builder** — a drag-to-position canvas for the donation alert, chat widget, and funding-goal bar, with theme (purple/cyan/lime) and corner-position controls persisted to `localStorage`.
- 🔴 **Cross-Tab Live Test Events** — "Test $10 Donation" / "Test Follower" fire a real `BroadcastChannel` event plus `canvas-confetti`, instantly animating the alert on the separate `/overlay/[id]` route — the exact page you'd paste into an OBS Browser Source.

---

## 🛠️ Tech Stack

| Technology | Used for |
|---|---|
| [Next.js 16](https://nextjs.org) (App Router) | Routing, client components, the transparent `/overlay/[id]` OBS route |
| [TypeScript](https://www.typescriptlang.org) | Strict typing across stores, mock data, and components |
| [Tailwind CSS 4](https://tailwindcss.com) | CSS-first theming (`@theme`/`@config`) for the dark streamer palette |
| [Zustand](https://zustand-demo.pmnd.rs) | Editor state (highlights, subtitles, playback) and overlay settings with `persist` |
| [Framer Motion](https://www.framer.com/motion/) | Alert pop-in animation, chat message transitions |
| [Lucide React](https://lucide.dev) | Icon set across UI |
| [canvas-confetti](https://www.kirilv.com/canvas-confetti/) | Confetti burst on test donation/follower events |
| `clsx` + `tailwind-merge` | Conditional, conflict-safe Tailwind class composition (`cn()` helper) |
| Native `BroadcastChannel` API | Cross-tab delivery of Live Test events to the OBS overlay route |

---

## 🚀 Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/Tonxetyz/StreamPulse.git
cd StreamPulse

# 2. Install dependencies
npm install

# 3. Run the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the Clip Studio. No environment variables or API keys are required — all video sources and highlight/caption data are built-in mock demo data.

```bash
# Production build
npm run build
npm run start
```

---

## 📁 Project Structure

```
StreamPulse/
├── app/
│   ├── page.tsx                  # AI Clip Studio — top bar, phone preview, AI panel, timeline
│   ├── overlays/page.tsx         # OBS Overlay Studio — canvas builder, link generator, live test
│   ├── overlay/[id]/
│   │   ├── page.tsx                # Live OBS Browser Source route (transparent bg, alerts + chat)
│   │   └── layout.tsx              # Overrides body/html background to transparent for this route
│   ├── layout.tsx                 # Root layout, fonts, metadata
│   └── globals.css                # Tailwind import, dark palette tokens, glass-panel utility
├── components/
│   ├── editor/                    # TopBar, PhonePreview, SubtitleOverlay, AIPanel, HighlightTimeline
│   ├── overlays/                  # DonationAlert, ChatWidget, GoalWidget, DraggableWidget, LinkGenerator, EventControls
│   └── ui/                        # Reusable primitives: Button, Card, Chip, Toggle, Slider
├── lib/
│   ├── store/
│   │   ├── useEditorStore.ts       # Video/highlight/subtitle state (Zustand)
│   │   └── useOverlayStore.ts      # Overlay theme/position/widgets + test-alert trigger (Zustand + persist)
│   ├── mock-clips.ts               # Demo clips (media.w3.org CC videos) + karaoke caption timings
│   ├── overlay-channel.ts          # BroadcastChannel helper for cross-tab live events
│   └── utils.ts                    # `cn()` class-merging helper
├── tailwind.config.ts              # Streamer color palette (background/surface/border/accents)
└── public/                         # Static assets
```

---

<div align="center">

Built with ⚡ by [Tonxetyz](https://github.com/Tonxetyz)

</div>
