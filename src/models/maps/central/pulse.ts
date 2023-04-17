import { Plains } from "../../terrain/Plains";
import { TileMap } from "../Map";

export const PULSE: TileMap = {
  name: "Pulse",
  tiles: [
    {
      x: 0,
      y: 0,
      terrain: Plains,
    },
    {
      x: 0,
      y: 1,
      terrain: Plains,
    },
  ],
};
