import GridGenerator from "../services/gridService";
import { neighbors } from "../services/HexService";
import { HexNode } from "./HexNode";
import { randomTerrain, RandomUnit } from "./Random";

export class HexagonNodeGrid {
  hexNodes: HexNode[];

  constructor(width: number, height: number, percentageBlocked?: number) {
    const hexagons = GridGenerator.orientedRectangle(width, height);
    const hexNodes = hexagons.map(x => {
      const terrain = randomTerrain();
      const unit = terrain.cost < Number.MAX_VALUE ? RandomUnit() : undefined;

      return new HexNode(
        x.q,
        x.r,
        x.s,
        terrain.cost,
        terrain.type === "Water",
        terrain,
        unit,
        0,
        0
      );
    });
    hexNodes.forEach(x => {
      const potentialNeighbors = neighbors(x);
      for (let i = 0; i < potentialNeighbors.length; i++) {
        const neighbor = potentialNeighbors[i];
        const hexNodesNeighborIndex = hexNodes.findIndex(
          node =>
            node.q === neighbor.q &&
            node.r === neighbor.r &&
            node.s === neighbor.s
        );
        if (hexNodesNeighborIndex > -1) {
          x.neighbors.push(hexNodes[hexNodesNeighborIndex]);
          x.neighborIndexes.push(hexNodesNeighborIndex);
        }
      }
    });
    this.hexNodes = hexNodes;
  }
}
