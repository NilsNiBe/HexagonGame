import { Forest } from "./forest";
import { Mountain } from "./mountain";
import { Plains } from "./plains";
import { Street } from "./street";
import { Water } from "./water";

export const TERRAIN_TYPES = [
  "Street",
  "Plains",
  "Forest",
  "Mountain",
  "Water",
] as const;

export type TerrainType = (typeof TERRAIN_TYPES)[number];

export interface Terrain {
  type: TerrainType;
  cost: number;
  image: string;
}

export function GetTerrain(type: TerrainType) {
  switch (type) {
    case "Street":
      return Street;
    case "Plains":
      return Plains;
    case "Forest":
      return Forest;
    case "Mountain":
      return Mountain;
    case "Water":
      return Water;
  }
}
