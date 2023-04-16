export interface GridNode {
  f: number;
  g: number;
  h?: number;
  neighbors: GridNode[];
  predecessor?: GridNode;
  blocked?: boolean;
  weight: number;
}

export function GridNodeEquals(a: GridNode, b: GridNode) {
  return a.f === b.f && a.g === b.g;
}
