import { GridNode } from "../models/GridNode";

export interface DijkstraNodeRes<T extends GridNode> {
  node: T;
  cost: number;
  previous?: DijkstraNodeRes<T>;
  visited: boolean;
}

export const runDijkstra = <T extends GridNode>(
  graph: T[],
  startNode: T,
  maxCost?: number
): DijkstraNodeRes<T>[] => {
  const graphRes: DijkstraNodeRes<T>[] = graph.map((x) => ({
    node: x,
    cost: Number.MAX_VALUE,
    visited: false,
  }));
  graphRes.find((x) => x.node === startNode)!.cost = 0;

  while (graphRes.some((x) => !x.visited && x.node.weight < Number.MAX_VALUE)) {
    const current = graphRes
      .filter((x) => !x.visited)
      .reduce((a, b) => (a.cost < b.cost ? a : b));
    current.visited = true;
    if (current.cost >= (maxCost ?? Number.MAX_VALUE)) {
      continue;
    }

    const unvisitedNeighbors = current.node.neighbors
      .map((x) => graphRes.find((g) => g.node === x)!)
      .filter((x) => !x.visited && x.node.weight < Number.MAX_VALUE);

    for (let i = 0; i < unvisitedNeighbors.length; i++) {
      const neighbor = unvisitedNeighbors[i];
      const cost = current.cost + neighbor.node.weight;

      if (cost < neighbor.cost) {
        neighbor.cost = cost;
        neighbor.previous = current;
      }
    }
  }

  return graphRes;
};
