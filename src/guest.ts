import { setModel, type Board } from "./board";

export function guestSwitchModel(board: Board, model: string): Board {
  if (board.mode === "doctor") return board;
  return setModel(board, model);
}

export function guestCanPaint(board: Board): boolean {
  return board.mode === "paint" || board.mode === "tour";
}
