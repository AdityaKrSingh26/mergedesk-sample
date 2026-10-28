export type BoardMode = "paint" | "tour" | "doctor";

export type Board = {
  model: string;
  mode: BoardMode;
  hostId: string;
};

export function createBoard(hostId: string): Board {
  return { model: "skeleton", mode: "paint", hostId };
}

export function setModel(board: Board, model: string): Board {
  return { ...board, model };
}

export function setMode(board: Board, mode: BoardMode): Board {
  return { ...board, mode };
}
