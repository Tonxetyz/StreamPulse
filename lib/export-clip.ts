export interface ExportProgress {
  currentTime: number;
  progress: number; // 0-1
}

type CaptureCapableVideo = HTMLVideoElement & {
  captureStream?: () => MediaStream;
  mozCaptureStream?: () => MediaStream;
};

const CANDIDATE_MIME_TYPES = ["video/webm;codecs=vp9", "video/webm;codecs=vp8", "video/webm"];

function pickMimeType(): string | undefined {
  return CANDIDATE_MIME_TYPES.find((t) => typeof MediaRecorder !== "undefined" && MediaRecorder.isTypeSupported(t));
}

function seekTo(video: HTMLVideoElement, time: number) {
  return new Promise<void>((resolve) => {
    if (Math.abs(video.currentTime - time) < 0.01) {
      resolve();
      return;
    }
    const onSeeked = () => {
      video.removeEventListener("seeked", onSeeked);
      resolve();
    };
    video.addEventListener("seeked", onSeeked);
    video.currentTime = time;
  });
}

/**
 * Реально нарезает видео: проигрывает диапазон [start, end] через
 * HTMLVideoElement.captureStream() и пишет поток в MediaRecorder.
 * Источник видео обязан отдавать Access-Control-Allow-Origin — иначе
 * браузер бросит SecurityError при попытке captureStream().
 */
export async function exportClipFromVideo(
  video: HTMLVideoElement,
  start: number,
  end: number,
  onProgress?: (p: ExportProgress) => void,
): Promise<Blob> {
  const capturable = video as CaptureCapableVideo;
  const captureStream = capturable.captureStream ?? capturable.mozCaptureStream;
  if (!captureStream) {
    throw new Error("Браузер не поддерживает captureStream() — реальный экспорт недоступен.");
  }
  if (end - start < 0.1) {
    throw new Error("Диапазон обрезки слишком короткий.");
  }

  await seekTo(video, start);

  const stream = captureStream.call(video);
  const mimeType = pickMimeType();
  const recorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);
  const chunks: BlobPart[] = [];
  recorder.ondataavailable = (e) => {
    if (e.data.size > 0) chunks.push(e.data);
  };

  return new Promise<Blob>((resolve, reject) => {
    let settled = false;

    const cleanup = () => {
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.pause();
    };

    function onTimeUpdate() {
      onProgress?.({
        currentTime: video.currentTime,
        progress: Math.min(1, (video.currentTime - start) / (end - start)),
      });
      if (video.currentTime >= end && recorder.state === "recording") {
        recorder.stop();
      }
    }

    recorder.onerror = (e) => {
      if (settled) return;
      settled = true;
      cleanup();
      reject(e instanceof Event ? new Error("Ошибка записи MediaRecorder") : e);
    };

    recorder.onstop = () => {
      if (settled) return;
      settled = true;
      cleanup();
      resolve(new Blob(chunks, { type: mimeType ?? "video/webm" }));
    };

    video.addEventListener("timeupdate", onTimeUpdate);
    recorder.start(250);
    video.play().catch((err) => {
      if (settled) return;
      settled = true;
      cleanup();
      reject(err);
    });
  });
}
