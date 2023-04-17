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
