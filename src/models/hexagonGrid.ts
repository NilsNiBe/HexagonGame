import GridGenerator from "../services/gridService";
import { neighbors } from "../services/HexService";
import { HexNode } from "./HexNode";
import { randomTerrain, RandomUnit } from "./Random";
import { Water } from "./terrain/Water";

export interface HexagonNodeGrid {
  nodes: HexNode[];
}

export function createRandomHexagonGrid(
  width: number,
  height: number
): HexagonNodeGrid {
  const hexagons = GridGenerator.orientedRectangle(width, height);
  const hexNodes: HexNode[] = hexagons.map(x => {
    const terrain = randomTerrain();
    const unit = terrain.cost < Number.MAX_VALUE ? RandomUnit() : undefined;

    return {
      q: x.q,
      r: x.r,
      s: x.s,
      weight: terrain.cost,
      blocked: terrain.type === "Water",
      terrain,
      unit,
      f: 0,
      g: 0,
      neighbors: [],
    };
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
      }
    }
  });
  return { nodes: hexNodes };
}

export function createWaterHexagonGrid(
  width: number,
  height: number
): HexagonNodeGrid {
  const hexagons = GridGenerator.orientedRectangle(width, height);
  const hexNodes: HexNode[] = hexagons.map(x => {
    const terrain = Water;

    return {
      q: x.q,
      r: x.r,
      s: x.s,
      weight: terrain.cost,
      blocked: terrain.type === "Water",
      terrain,
      undefined,
      f: 0,
      g: 0,
      neighbors: [],
    };
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
      }
    }
  });
  return { nodes: hexNodes };
}
