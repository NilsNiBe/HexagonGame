export type TerrainType =
  | "Street"
  | "Plains"
  | "Forrest"
  | "Mountain"
  | "Water";

export interface Terrain {
  type: TerrainType;
  cost: number;
  image: string;
}
