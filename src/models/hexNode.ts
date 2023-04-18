import { GridNode } from "./GridNode";
import HexagonTile from "./HexagonTile";
import { Terrain, TerrainType } from "./terrain/Terrain";
import { Unit, UnitType } from "./units/Unit";

export interface HexNode extends HexagonTile, GridNode {
  f: number;
  g: number;
  h?: number;
  neighbors: GridNode[];
  predecessor?: GridNode;
  terrain: Terrain;
  unit?: Unit;
  weight: number;
}

export interface SimpleHexNode {
  q: number;
  r: number;
  t: TerrainType;
  u?: UnitType;
}

export function getId(h: HexNode) {
  return `q:${h.q},r:${h.r}`;
}

export function createSimpleHexNode(h: HexNode): SimpleHexNode {
  return {
    q: h.q,
    r: h.r,
    t: h.terrain?.type,
    u: h.unit?.type,
  };
}
