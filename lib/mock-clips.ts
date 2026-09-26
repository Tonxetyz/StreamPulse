import type { Highlight } from "./store/useEditorStore";

export const HIGHLIGHT_TYPES = ["Laughter", "Clutch", "Scream"] as const;
export type HighlightType = (typeof HIGHLIGHT_TYPES)[number];

export interface MockClip {
  id: string;
  title: string;
  videoUrl: string;
  duration: number;
  highlights: Highlight[];
}

export interface CaptionWord {
  word: string;
  start: number;
  end: number;
}

// Открытые демо-ролики (media.w3.org, публичный CC-каталог тестовых видео W3C)
export const mockClips: MockClip[] = [
  {
    id: "clip-clutch",
    title: "Победный клатч в овертайме",
    videoUrl: "https://media.w3.org/2010/05/bunny/trailer.mp4",
    duration: 33,
    highlights: [
      { id: "h1", timeStart: 2, timeEnd: 6, label: "Laughter", score: 62, confidence: 0.81 },
      { id: "h2", timeStart: 20, timeEnd: 28, label: "Clutch", score: 91, confidence: 0.94 },
    ],
  },
  {
    id: "clip-triple",
    title: "Тройное убийство подряд",
    videoUrl: "https://media.w3.org/2010/05/sintel/trailer.mp4",
    duration: 52,
    highlights: [
      { id: "h1", timeStart: 5, timeEnd: 12, label: "Clutch", score: 88, confidence: 0.9 },
      { id: "h2", timeStart: 35, timeEnd: 45, label: "Scream", score: 76, confidence: 0.72 },
    ],
  },
  {
    id: "clip-comeback",
    title: "Эпичный камбэк на харде",
    videoUrl: "https://media.w3.org/2010/05/video/movie_300.mp4",
    duration: 300,
    highlights: [
      { id: "h1", timeStart: 15, timeEnd: 22, label: "Laughter", score: 55, confidence: 0.68 },
      { id: "h2", timeStart: 130, timeEnd: 140, label: "Clutch", score: 84, confidence: 0.88 },
      { id: "h3", timeStart: 270, timeEnd: 282, label: "Scream", score: 96, confidence: 0.97 },
    ],
  },
  {
    id: "clip-bossfight",
    title: "Босс-файт под угарные шутки чата",
    videoUrl: "https://media.w3.org/2010/05/bunny/movie.mp4",
    duration: 596,
    highlights: [
      { id: "h1", timeStart: 30, timeEnd: 38, label: "Laughter", score: 58, confidence: 0.7 },
      { id: "h2", timeStart: 120, timeEnd: 130, label: "Clutch", score: 79, confidence: 0.83 },
      { id: "h3", timeStart: 240, timeEnd: 248, label: "Scream", score: 90, confidence: 0.92 },
      { id: "h4", timeStart: 400, timeEnd: 410, label: "Clutch", score: 87, confidence: 0.89 },
      { id: "h5", timeStart: 510, timeEnd: 520, label: "Laughter", score: 65, confidence: 0.75 },
    ],
  },
];

// Караоке-субтитры со словными таймкодами, ключ — id клипа
export const mockCaptions: Record<string, CaptionWord[]> = {
  "clip-clutch": [
    { word: "Так,", start: 0.2, end: 0.6 },
    { word: "спокойно,", start: 0.6, end: 1.2 },
    { word: "держим", start: 1.3, end: 1.7 },
    { word: "угол,", start: 1.7, end: 2.2 },
    { word: "не", start: 2.3, end: 2.5 },
    { word: "спешим...", start: 2.5, end: 3.2 },
    { word: "ОН", start: 3.5, end: 3.8 },
    { word: "ВЫШЕЛ!", start: 3.8, end: 4.4 },
    { word: "ДОБИВАЙ!!!", start: 4.4, end: 5.2 },
  ],
  "clip-triple": [
    { word: "Первый", start: 0.5, end: 1.0 },
    { word: "есть!", start: 1.0, end: 1.4 },
    { word: "Второй", start: 1.6, end: 2.1 },
    { word: "готов!", start: 2.1, end: 2.6 },
    { word: "И...", start: 3.0, end: 3.3 },
    { word: "ТРЕТИЙ!!!", start: 3.3, end: 4.1 },
    { word: "ТРИПЛ", start: 4.1, end: 4.6 },
    { word: "КИЛЛ!", start: 4.6, end: 5.1 },
  ],
  "clip-comeback": [
    { word: "Всё,", start: 0.3, end: 0.6 },
    { word: "мы", start: 0.6, end: 0.8 },
    { word: "проиграли,", start: 0.8, end: 1.4 },
    { word: "это", start: 1.5, end: 1.7 },
    { word: "база...", start: 1.7, end: 2.3 },
    { word: "СТОП.", start: 3.0, end: 3.4 },
    { word: "А", start: 3.4, end: 3.6 },
    { word: "ЕСЛИ", start: 3.6, end: 3.9 },
    { word: "НЕТ?", start: 3.9, end: 4.4 },
  ],
  "clip-bossfight": [
    { word: "Чат,", start: 0.4, end: 0.7 },
    { word: "смотрите", start: 0.7, end: 1.2 },
    { word: "на", start: 1.2, end: 1.4 },
    { word: "его", start: 1.4, end: 1.6 },
    { word: "HP", start: 1.6, end: 1.9 },
    { word: "бар...", start: 1.9, end: 2.4 },
    { word: "ОН", start: 2.7, end: 2.9 },
    { word: "РАЗЪЯРЁН!", start: 2.9, end: 3.6 },
  ],
};
