import { abs } from "./math";
import { fetchWithRetry } from "./http";
import type { Board } from "./board";

export type SaveImageResult = {
  ok: boolean;
  path: string;
};

function clampQuality(quality: number): number {
  const q = abs(quality);
  if (q < 0) return 0;
  if (q > 1) return 1;
  return q;
}

export async function saveBoardAsJpeg(
  board: Board,
  quality = 0.92,
): Promise<SaveImageResult> {
  const q = clampQuality(quality);
  const payload = {
    model: board.model,
    mode: board.mode,
    format: "jpeg",
    quality: q,
  };
  await fetchWithRetry("/journal/save-image", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return { ok: true, path: `board-${board.model}.jpg` };
}

export function jpegFileName(board: Board): string {
  return `board-${board.model}.jpg`;
}
