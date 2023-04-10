import GridGenerator from "../services/gridService";
import HexService from "../services/HexService";
import { hexNode } from "./hexNode";

export type TerrainType =
  | "Water"
  | "Mountain"
  | "Hills"
  | "RiverPlains"
  | "Plains";

export class hexagonNodeGrid {
  hexNodes: hexNode[];

  constructor(width: number, height: number, percentageBlocked?: number) {
    const hexagons = GridGenerator.orientedRectangle(width, height);
    const hexNodes = hexagons.map(x => {
      const random = Math.random();
      let terrainType: TerrainType = "Plains";
      let movementCost: number = 1;
      if (random < 0.3) {
        terrainType = "Water";
        movementCost = Number.MAX_VALUE;
      } else if (0.3 < random && random < 0.4) {
        terrainType = "Mountain";
        movementCost = 4;
      } else if (0.4 < random && random < 0.5) {
        terrainType = "Hills";
        movementCost = 3;
      } else if (0.5 < random && random < 0.7) {
        terrainType = "RiverPlains";
        movementCost = 2;
      }

      return new hexNode(
        x.q,
        x.r,
        x.s,
        //x.q % 3 > 1 && x.r % 3 > -1,
        //percentageBlocked ? Math.random() < percentageBlocked / 100 : false,
        terrainType === "Water",
        movementCost,
        terrainType,
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
