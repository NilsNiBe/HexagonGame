export interface HexCoordinates {
  q: number;
  r: number;
  s: number;
}
type hexPropsType = {
  fill: string;
  className: string;
};
// interface hexAttributes {
//   blocked: boolean;
//   text: string;
//   image: string;
//   props: Partial<hexPropsType>;
//   neighbors: hexagon[];
// }
export interface HexagonTile extends HexCoordinates {
  q: number;
  r: number;
  s: number;
  blocked: boolean;
  text?: string;
  props?: Partial<hexPropsType>;
}
export default HexagonTile;
