import { GridNode } from "./GridNode";
import HexagonTile from "./HexagonTile";
import { Terrain } from "./terrain/Terrain";
import { Unit } from "./units/Unit";

export interface HexNode extends HexagonTile, GridNode {
  f: number;
  g: number;
  h?: number;
  neighbors: GridNode[];
  predecessor?: GridNode;
  terrain?: Terrain;
  unit?: Unit;
  weight: number;
}

export function getId(h: HexNode) {
  return `q:${h.q},r:${h.r}`;
}
