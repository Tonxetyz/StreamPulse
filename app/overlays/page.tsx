"use client";

import Link from "next/link";
import { Clapperboard, LayoutGrid } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { Toggle } from "@/components/ui/Toggle";
import { OverlayCanvasPreview } from "@/components/overlays/OverlayCanvasPreview";
import { LinkGenerator } from "@/components/overlays/LinkGenerator";
import { EventControls } from "@/components/overlays/EventControls";
import { useOverlayStore, type OverlayPosition, type OverlayTheme } from "@/lib/store/useOverlayStore";

const THEMES: OverlayTheme[] = ["purple", "cyan", "lime"];
const POSITIONS: OverlayPosition[] = ["top-left", "top-right", "bottom-left", "bottom-right"];

export default function OverlaysPage() {
  const { theme, position, widgets, setTheme, setPosition, toggleWidget } = useOverlayStore();

  return (
    <main className="min-h-screen bg-background px-6 py-6">
      <div className="mx-auto flex max-w-6xl items-center justify-between pb-6">
        <h1 className="text-lg font-semibold text-foreground">OBS Overlay Studio</h1>
        <nav className="flex gap-2 rounded-lg border border-border p-1">
          <Link href="/" className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm text-foreground/60 hover:text-foreground">
            <Clapperboard size={14} /> Клиппер
          </Link>
          <span className="flex items-center gap-1.5 rounded-md bg-accent-purple px-3 py-1.5 text-sm text-white">
            <LayoutGrid size={14} /> OBS виджеты
          </span>
        </nav>
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 lg:grid-cols-[1fr_300px]">
        <div className="space-y-4">
          <OverlayCanvasPreview />

          <Card>
            <p className="mb-2 text-sm font-medium text-foreground">Ссылка для OBS Browser Source</p>
            <LinkGenerator overlayId="demo" />
          </Card>

          <Card>
            <p className="mb-3 text-sm font-medium text-foreground">Live Test — проверка событий</p>
            <EventControls />
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <p className="mb-2 text-sm font-medium text-foreground">Тема</p>
            <div className="flex gap-2">
              {THEMES.map((t) => (
                <Chip key={t} active={theme === t} accent={t} onClick={() => setTheme(t)}>
                  {t}
                </Chip>
              ))}
            </div>
          </Card>

          <Card>
            <p className="mb-2 text-sm font-medium text-foreground">Позиция алертов</p>
            <div className="flex flex-wrap gap-2">
              {POSITIONS.map((p) => (
                <Chip key={p} active={position === p} onClick={() => setPosition(p)}>
                  {p}
                </Chip>
              ))}
            </div>
          </Card>

          <Card className="space-y-3">
            <p className="text-sm font-medium text-foreground">Виджеты</p>
            <Toggle label="Последний донат" checked={widgets.lastDonation} onChange={() => toggleWidget("lastDonation")} />
            <Toggle label="Чат" checked={widgets.chat} onChange={() => toggleWidget("chat")} accent="cyan" />
            <Toggle label="Цель сбора" checked={widgets.goal} onChange={() => toggleWidget("goal")} accent="lime" />
          </Card>
        </div>
      </div>
    </main>
  );
}
