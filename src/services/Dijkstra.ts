export interface DijkstraProps {
  graph: DijkstraNode[];
  startindex: number;
  maxCost?: number;
}

export interface DijkstraNode {
  neighborIndexes: number[];
  weight: number;
  id: string;
}

export interface DijkstraNodeRes extends DijkstraNode {
  cost: number;
  previous?: DijkstraNodeRes;
  visited: boolean;
}

export const runDijkstra = (props: DijkstraProps): DijkstraNodeRes[] => {
  const { graph, startindex, maxCost } = props;

  const graphRes: DijkstraNodeRes[] = graph.map(x => ({
    ...x,
    cost: Number.MAX_VALUE,
    visited: false,
  }));
  graphRes[startindex].cost = 0;

  while (graphRes.some(x => !x.visited && x.weight < Number.MAX_VALUE)) {
    const current = graphRes
      .filter(x => !x.visited)
      .reduce((a, b) => (a.cost < b.cost ? a : b));
    current.visited = true;
    if (current.cost > (maxCost ?? Number.MAX_VALUE)) {
      continue;
    }

    const unvisitedNeighbors = current.neighborIndexes
      .map(i => graphRes[i])
      .filter(x => !x.visited && x.weight < Number.MAX_VALUE);
    for (let i = 0; i < unvisitedNeighbors.length; i++) {
      const neighbor = unvisitedNeighbors[i];
      const cost = current.cost + neighbor.weight;

      if (cost < neighbor.cost) {
        neighbor.cost = cost;
        neighbor.previous = current;
      }
    }
  }

  return graphRes;
};
