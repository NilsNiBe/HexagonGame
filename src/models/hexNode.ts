import { GridNode } from "./gridNode";
import HexagonTile, { HexCoordinates } from "./hexagonTile";
import { Terrain, TerrainType } from "./terrain/terrain";
import { Coalition, Unit, UnitType } from "./units/unit";

export interface HexNode extends HexagonTile, GridNode {
  f: number;
  g: number;
  h?: number;
  neighbors: GridNode[];
  predecessor?: GridNode;
  terrain: Terrain;
  unit?: Unit;
  weight: number;
  isReachable: boolean;
  isPath: boolean;
  isSelected: boolean;
  isMouseOver: boolean;
}

export interface SimpleHexNode {
  q: number;
  r: number;
  t: TerrainType;
  u?: SimpleUnit;
}

export interface SimpleUnit {
  t: UnitType;
  c: Coalition;
}

export function createHexNode(
  h: HexCoordinates,
  t: Terrain,
  u?: Unit
): HexNode {
  return {
    q: h.q,
    r: h.r,
    s: h.s,
    key: `q:${h.q},r:${h.r}`,
    weight: t.cost,
    blocked: t.type === "Water",
    terrain: t,
    unit: u,
    f: 0,
    g: 0,
    neighbors: [],
    isReachable: false,
    isPath: false,
    isSelected: false,
    isMouseOver: false,
  };
}

export function createHexNodeSimple(
  h: SimpleHexNode,
  t: Terrain,
  u?: Unit
): HexNode {
  return {
    q: h.q,
    r: h.r,
    s: -h.q - h.r,
    key: `q:${h.q},r:${h.r}`,
    weight: t.cost,
    blocked: t.type === "Water",
    terrain: t,
    unit: u,
    f: 0,
    g: 0,
    neighbors: [],
    isReachable: false,
    isPath: false,
    isSelected: false,
    isMouseOver: false,
  };
}

export function createSimpleHexNode(h: HexNode): SimpleHexNode {
  return {
    q: h.q,
    r: h.r,
    t: h.terrain?.type,
    u: h.unit ? { t: h.unit?.properties.type, c: h.unit.coalition } : undefined,
  };
}
