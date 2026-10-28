import { setModel, type Board } from "./board";

export function hostSwitchModel(board: Board, model: string): Board {
  return setModel(board, model);
}
