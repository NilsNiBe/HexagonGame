import GridGenerator from "../services/gridService";
import HexService from "../services/HexService";
import { hexNode } from "./hexNode";

export type TerrainType =
  | "Water"
  | "Mountain"
  | "Hills"
  | "RiverPlains"
  | "Plains";

export type Unit =
  | "infantry"
  | "elite-infantry"
  | "cavalry"
  | "light-artillery"
  | "medium-artillery"
  | "heavy-artillery";

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
        movementCost = 10;
      } else if (0.4 < random && random < 0.5) {
        terrainType = "Hills";
        movementCost = 7;
      } else if (0.5 < random && random < 0.7) {
        terrainType = "RiverPlains";
        movementCost = 4;
      }
      let unit: Unit | undefined = undefined;
      if (movementCost < Number.MAX_VALUE) {
        const r = Math.random();
        if (r < 0.05) {
          unit = "infantry";
        } else if (r < 0.1) {
          unit = "elite-infantry";
        } else if (0.1 < r && r < 0.15) {
          unit = "cavalry";
        } else if (0.15 < r && r < 0.2) {
          unit = "light-artillery";
        } else if (0.2 < r && r < 0.25) {
          unit = "medium-artillery";
        } else if (0.25 < r && r < 0.3) {
          unit = "heavy-artillery";
        }
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
