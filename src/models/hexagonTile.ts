export interface HexCoordinates {
  q: number;
  r: number;
  s: number;
}
type hexPropsType = {
  fill: string;
  className: string;
};

export interface HexagonTile extends HexCoordinates {
  q: number;
  r: number;
  s: number;
  blocked: boolean;
  text?: string;
  props?: Partial<hexPropsType>;
}
export default HexagonTile;

export function getHexKey(h: HexCoordinates) {
  return `q:${h.q},r:${h.r}`;
}
