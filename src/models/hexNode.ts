import { equals } from "../services/HexService";
import { GridNode } from "./GridNode";
import hexagon from "./Hexagon";
import { Terrain } from "./terrain/Terrain";
import { Unit } from "./units/Unit";

export class HexNode extends hexagon implements GridNode {
  public f: number;
  public g: number;
  public h?: number;
  // obsolete
  neighbors: GridNode[];
  neighborIndexes: number[];
  predecessor?: GridNode;
  terrain?: Terrain;
  unit?: Unit;
  weight: number;

  constructor(
    q: number,
    r: number,
    s: number,
    weight: number,
    blocked?: boolean,
    terrain?: Terrain,
    unit?: Unit,
    f?: number,
    g?: number,
    h?: number,
    neighbors?: GridNode[],
    neighborIndexes?: number[],
    predecessor?: GridNode
  ) {
    super(q, r, s, blocked);
    this.f = f ?? 0;
    this.g = g ?? 0;
    this.h = h;
    this.neighbors = neighbors ?? [];
    this.neighborIndexes = neighborIndexes ?? [];
    this.predecessor = predecessor;
    this.terrain = terrain;
    this.unit = unit;
    this.weight = weight;
  }

  equals(node: GridNode): boolean {
    const hex = node as HexNode;
    return equals(this, hex);
  }
}
