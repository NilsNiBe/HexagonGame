import GridGenerator from "../services/gridService";
import HexService from "../services/HexService";
import { hexNode } from "./hexNode";

export class hexagonNodeGrid {
  hexNodes: hexNode[];

  constructor(width: number, height: number, percentageBlocked?: number) {
    const hexagons = GridGenerator.orientedRectangle(width, height);
    const hexNodes = hexagons.map(x => {
      return new hexNode(
        x.q,
        x.r,
        x.s,
        //x.q % 3 > 1 && x.r % 3 > -1,
        percentageBlocked ? Math.random() < percentageBlocked / 100 : false,
        0,
        0
      );
    });
    hexNodes.forEach(x => {
      const potentialNeighbors = HexService.neighbors(x);
      for (let i = 0; i < potentialNeighbors.length; i++) {
        const neighbor = potentialNeighbors[i];
        const hexNodesNeighbor = hexNodes.find(
          node =>
            node.q === neighbor.q &&
            node.r === neighbor.r &&
            node.s === neighbor.s
        );
        if (hexNodesNeighbor !== undefined) {
          x.neighbors.push(hexNodesNeighbor);
        }
      }
    });
    this.hexNodes = hexNodes;
  }
}
