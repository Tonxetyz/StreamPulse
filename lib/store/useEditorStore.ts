import { create } from "zustand";

export type ClipLayout = "split" | "full" | "pip";
export type SubtitleStyle = "mrbeast" | "cyberpunk" | "minimal";

export interface Highlight {
  id: string;
  timeStart: number;
  timeEnd: number;
  label: string;
  score: number; // 0-100, интенсивность момента
  confidence: number; // 0-1, уверенность AI
}

interface SubtitleSettings {
  style: SubtitleStyle;
  fontSize: number;
  neonGlow: boolean;
  activeWordColor: string;
  autoSubtitles: boolean;
}

interface EditorState {
  selectedClipId: string;
  currentTime: number;
  duration: number;
  isPlaying: boolean;
  volume: number;
  highlights: Highlight[];
  layout: ClipLayout;
  subtitles: SubtitleSettings;

  setSelectedClipId: (id: string) => void;
  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  setVolume: (volume: number) => void;
  setHighlights: (highlights: Highlight[]) => void;
  setLayout: (layout: ClipLayout) => void;
  setSubtitleStyle: (style: SubtitleStyle) => void;
  setFontSize: (fontSize: number) => void;
  toggleNeonGlow: () => void;
  setActiveWordColor: (color: string) => void;
  toggleAutoSubtitles: () => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  selectedClipId: "clip-clutch",
  currentTime: 0,
  duration: 0,
  isPlaying: false,
  volume: 1,
  highlights: [],
  layout: "split",
  subtitles: {
    style: "mrbeast",
    fontSize: 32,
    neonGlow: true,
    activeWordColor: "#22C55E",
    autoSubtitles: true,
  },

  setSelectedClipId: (selectedClipId) =>
    set({ selectedClipId, currentTime: 0, isPlaying: false }),
  setCurrentTime: (currentTime) => set({ currentTime }),
  setDuration: (duration) => set({ duration }),
  play: () => set({ isPlaying: true }),
  pause: () => set({ isPlaying: false }),
  togglePlay: () => set((s) => ({ isPlaying: !s.isPlaying })),
  setVolume: (volume) => set({ volume }),
  setHighlights: (highlights) => set({ highlights }),
  setLayout: (layout) => set({ layout }),
  setSubtitleStyle: (style) => set((s) => ({ subtitles: { ...s.subtitles, style } })),
  setFontSize: (fontSize) => set((s) => ({ subtitles: { ...s.subtitles, fontSize } })),
  toggleNeonGlow: () =>
    set((s) => ({ subtitles: { ...s.subtitles, neonGlow: !s.subtitles.neonGlow } })),
  setActiveWordColor: (activeWordColor) =>
    set((s) => ({ subtitles: { ...s.subtitles, activeWordColor } })),
  toggleAutoSubtitles: () =>
    set((s) => ({ subtitles: { ...s.subtitles, autoSubtitles: !s.subtitles.autoSubtitles } })),
}));
