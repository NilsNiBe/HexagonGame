import GridGenerator from "../services/gridService";
import { neighbors } from "../services/HexService";
import { HexCoordinatesEqual } from "./HexagonTile";
import { createHexNode, createHexNodeSimple, createSimpleHexNode, HexNode, SimpleHexNode } from "./hexNode";
import { TileMap } from "./maps/Map";
import { randomTerrain, RandomUnit } from "./random";
import { GetTerrain, Terrain } from "./terrain/Terrain";
import { GetUnit } from "./units/Unit";

export interface HexagonNodeGrid {
  nodes: HexNode[];
}

export interface SimpleHexNodeGrid {
  nodes: SimpleHexNode[];
}

export function createSimpleHexagonNodeGrid(
  grid: HexagonNodeGrid
): SimpleHexNodeGrid {
  return {
    nodes: grid.nodes.map(x => createSimpleHexNode(x)),
  };
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
    return createHexNode(x, terrain, unit);
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
    return createHexNode(x, terrain); 
  });
  hexNodes.forEach(x => (x.neighbors = getNeighbors(x, hexNodes)));
  return { nodes: hexNodes };
}

export function tileMapToHexagonGrid(m: TileMap): HexagonNodeGrid {
  return {
    nodes: m.nodes.map(x => {
      return createHexNodeSimple(x, GetTerrain(x.t), x.u ? GetUnit(x.u) : undefined);
    }),
  };
}
