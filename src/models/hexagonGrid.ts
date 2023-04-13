import GridGenerator from "../services/gridService";
import HexService from "../services/HexService";
import { hexNode } from "./hexNode";
import { randomTerrain, randomUnit } from "./random";

export class hexagonNodeGrid {
  hexNodes: hexNode[];

  constructor(width: number, height: number, percentageBlocked?: number) {
    const hexagons = GridGenerator.orientedRectangle(width, height);
    const hexNodes = hexagons.map(x => {
      const terrain = randomTerrain();
      const unit = terrain.cost < Number.MAX_VALUE ? randomUnit() : undefined;

      return new hexNode(
        x.q,
        x.r,
        x.s,
        //x.q % 3 > 1 && x.r % 3 > -1,
        //percentageBlocked ? Math.random() < percentageBlocked / 100 : false,
        terrain.type === "Water",
        terrain.cost,
        terrain,
        unit,
        0,
        0
      );
    });
    hexNodes.forEach(x => {
      const potentialNeighbors = HexService.neighbors(x);
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
