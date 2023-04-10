import { node } from "../services/aStarService";
import HexService from "../services/HexService";
import hexagon from "./hexagon";

export class hexNode extends hexagon implements node {
  public f: number;
  public g: number;
  public h?: number;
  neighbors: node[];
  predecessor?: node;

  constructor(
    q: number,
    r: number,
    s: number,
    blocked?: boolean,
    f?: number,
    g?: number,
    h?: number,
    neighbors?: node[],
    predecessor?: node
  ) {
    super(q, r, s, blocked);
    this.f = f ?? 0;
    this.g = g ?? 0;
    this.h = h;
    this.neighbors = neighbors ?? [];
    this.predecessor = predecessor;
  }

  equals(node: node): boolean {
    const hex = node as hexNode;
    return HexService.equals(this, hex);
  }
}
