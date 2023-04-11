import { node } from "../services/aStarService";
import HexService from "../services/HexService";
import hexagon from "./hexagon";
import { TerrainType } from "./hexagonGrid";

export class hexNode extends hexagon implements node {
  public f: number;
  public g: number;
  public h?: number;
  // obsolete
  neighbors: node[];
  neighborIndexes: number[];
  predecessor?: node;
  movementCost?: number;
  terrainType?: TerrainType;

  constructor(
    q: number,
    r: number,
    s: number,
    blocked?: boolean,
    movementCost?: number,
    terrainType?: TerrainType,
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
    this.terrainType = terrainType;
  }

  equals(node: node): boolean {
    const hex = node as hexNode;
    return HexService.equals(this, hex);
  }
}
