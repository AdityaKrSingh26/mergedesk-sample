import { BoardMesh } from "boardmesh_presence_sdk";

export type BoardMode = "paint" | "tour" | "doctor";

export type Board = {
  model: string;
  mode: BoardMode;
  hostId: string;
};

const mesh = new BoardMesh({ room: "anatomy" });

export function createBoard(hostId: string): Board {
  mesh.join(hostId);
  return { model: "skeleton", mode: "paint", hostId };
}

export function setModel(board: Board, model: string): Board {
  mesh.broadcast({ type: "model", model });
  return { ...board, model };
}

export function setMode(board: Board, mode: BoardMode): Board {
  return { ...board, mode };
}

export function listModels(): string[] {
  return ["skeleton", "organs", "muscles"];
}

export function isHost(board: Board, userId: string): boolean {
  return board.hostId === userId;
}
