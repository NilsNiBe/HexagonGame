export interface GridNode {
  f: number;
  g: number;
  h?: number;
  neighbors: GridNode[];
  predecessor?: GridNode;
  blocked: boolean;
  weight: number;
  key: string;
}
