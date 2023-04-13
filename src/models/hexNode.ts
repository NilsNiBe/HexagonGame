import { node } from "../services/aStarService";
import HexService from "../services/HexService";
import hexagon from "./hexagon";
import { Terrain } from "./terrain/Terrain";
import { Unit } from "./units/Unit";

export class hexNode extends hexagon implements node {
  public f: number;
  public g: number;
  public h?: number;
  // obsolete
  neighbors: node[];
  neighborIndexes: number[];
  predecessor?: node;
  movementCost?: number;
  terrain?: Terrain;
  unit?: Unit;

  constructor(
    q: number,
    r: number,
    s: number,
    blocked?: boolean,
    movementCost?: number,
    terrain?: Terrain,
    unit?: Unit,
    f?: number,
    g?: number,
    h?: number,
    neighbors?: node[],
    neighborIndexes?: number[],
    predecessor?: node
  ) {
    super(q, r, s, blocked);
    this.f = f ?? 0;
    this.g = g ?? 0;
    this.h = h;
    this.neighbors = neighbors ?? [];
    this.neighborIndexes = neighborIndexes ?? [];
    this.predecessor = predecessor;
    this.movementCost = movementCost;
    this.terrain = terrain;
    this.unit = unit;
  }

  equals(node: node): boolean {
    const hex = node as hexNode;
    return HexService.equals(this, hex);
  }
}
