import { Terrain } from "../terrain/Terrain";
import { Unit } from "../units/Unit";

export interface TileMap {
  name: string;
  tiles: Tile[];
}

export interface Tile {
  x: number;
  y: number;
  terrain: Terrain;
  unit?: Unit;
}
