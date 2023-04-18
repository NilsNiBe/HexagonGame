import { Forest } from "./Forest";
import { Mountain } from "./Mountain";
import { Plains } from "./Plains";
import { Street } from "./Street";
import { Water } from "./Water";

export const TERRAIN_TYPES = [
  "Street",
  "Plains",
  "Forrest",
  "Mountain",
  "Water",
] as const;

export type TerrainType = typeof TERRAIN_TYPES[number];

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
    case "Forrest":
      return Forest;
    case "Mountain":
      return Mountain;
    case "Water":
      return Water;
  }
}
