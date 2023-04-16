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
export class hexagon implements HexCoordinates {
  q: number;
  r: number;
  s: number;

  blocked: boolean;
  text?: string;
  props?: Partial<hexPropsType>;

  constructor(q: number, r: number, s: number, blocked?: boolean) {
    this.q = q;
    this.r = r;
    this.s = s;
    this.blocked = blocked ?? false;
  }

  getId(): string {
    return `${this.q},${this.r},${this.s}`;
  }
}
export default hexagon;
