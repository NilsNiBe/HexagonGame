import GridGenerator from "../services/gridService";
import { neighbors } from "../services/HexService";
import { HexCoordinatesEqual } from "./HexagonTile";
import { HexNode } from "./HexNode";
import { randomTerrain, RandomUnit } from "./Random";
import { Terrain } from "./terrain/Terrain";

export interface HexagonNodeGrid {
  nodes: HexNode[];
}

function getNeighbors(x: HexNode, hexNodes: HexNode[]) {
  const res: HexNode[] = [];
  const potentialNeighbors = neighbors(x);
  for (let i = 0; i < potentialNeighbors.length; i++) {
    const neighbor = potentialNeighbors[i];
    const hexNodesNeighborIndex = hexNodes.findIndex(node =>
      HexCoordinatesEqual(node, neighbor)
    );
    if (hexNodesNeighborIndex > -1) {
      res.push(hexNodes[hexNodesNeighborIndex]);
    }
  }
  return res;
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
  hexNodes.forEach(x => (x.neighbors = getNeighbors(x, hexNodes)));
  return { nodes: hexNodes };
}

export function createHexagonGrid(
  width: number,
  height: number,
  terrain: Terrain
): HexagonNodeGrid {
  const hexagons = GridGenerator.orientedRectangle(width, height);
  const hexNodes: HexNode[] = hexagons.map(x => {
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
  hexNodes.forEach(x => (x.neighbors = getNeighbors(x, hexNodes)));
  return { nodes: hexNodes };
}
