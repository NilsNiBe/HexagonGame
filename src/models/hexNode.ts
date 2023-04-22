import { GridNode } from "./GridNode";
import HexagonTile, { HexCoordinates } from "./HexagonTile";
import { Terrain, TerrainType } from "./terrain/Terrain";
import { Coalition, Unit, UnitKind, UnitType } from "./units/Unit";

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
  u?: SimpleUnit;
}

export interface SimpleUnit {
  t: UnitType;
  c: Coalition;
}

export function getId(h: HexNode) {
  return `q:${h.q},r:${h.r}`;
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
    weight: t.cost,
    blocked: t.type === "Water",
    terrain: t,
    unit: u,
    f: 0,
    g: 0,
    neighbors: [],
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
    weight: t.cost,
    blocked: t.type === "Water",
    terrain: t,
    unit: u,
    f: 0,
    g: 0,
    neighbors: [],
  };
}

export function createSimpleHexNode(h: HexNode): SimpleHexNode {
  return {
    q: h.q,
    r: h.r,
    t: h.terrain?.type,
    u: h.unit ? { t: h.unit?.kind.type, c: h.unit.coalition } : undefined,
  };
}
