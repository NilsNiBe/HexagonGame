import { LayoutDimension } from "../components/Layout";
import { hexagon, hexCoordinates } from "../models/hexagon";
import { point } from "../models/point";

/** A class which contains static methods which are useful for working with Hexes */
export class HexService {
  static DIRECTIONS = [
    new hexagon(1, 0, -1),
    new hexagon(1, -1, 0),
    new hexagon(0, -1, 1),
    new hexagon(-1, 0, 1),
    new hexagon(-1, 1, 0),
    new hexagon(0, 1, -1),
  ];

  /**
   * Checks if coordinates are the same.
   * @param {hexCoordinates} a - first set of coordinates
   * @param {hexCoordinates} b - second set of coordinates
   * @returns {boolean} - true if all coords are the same, false otherwise
   */
  static equals(
    a: hexCoordinates | undefined,
    b: hexCoordinates | undefined
  ): boolean {
    if (a === undefined || b === undefined) return false;
    return a.q == b.q && a.r == b.r && a.s == b.s;
  }

  /**
   * Returns a new Hex with the addition of q,r,s values from A and B respectively
   * @param {hexCoordinates} a - first set of coordinates
   * @param {hexCoordinates} b - second set of coordinates
   * @returns {hexagon} - new hex at the position of the sum of the coords
   */
  static add(a: hexCoordinates, b: hexCoordinates): hexagon {
    return new hexagon(a.q + b.q, a.r + b.r, a.s + b.s);
  }

  /**
   * Returns a new Hex with the subtraction of q,r,s values from A and B respectively
   * @param {hexCoordinates} a - first set of coordinates
   * @param {hexCoordinates} b - second set of coordinates
   * @returns {hexagon} - new hex at the position of the difference between a and b
   */
  static subtract(a: hexCoordinates, b: hexCoordinates): hexagon {
    return new hexagon(a.q - b.q, a.r - b.r, a.s - b.s);
  }

  /**
   * @param {hexCoordinates} a - first set of coordinates
   * @param {hexCoordinates} k - second set of coordinates
   * @returns {hexagon} new hex at the position of the product between a's coordinates and a constant k
   */
  static multiply(a: hexCoordinates, k: number): hexagon {
    return new hexagon(a.q * k, a.r * k, a.s * k);
  }

  /**
   * @param {hexagon} hex - target hex
   * @returns {number} manhattan distance between hex and origin
   */
  static lengths(hex: hexagon): number {
    return (Math.abs(hex.q) + Math.abs(hex.r) + Math.abs(hex.s)) / 2;
  }

  /**
   * Returns the distance between two hex coordinates
   * @param {hexCoordinates} a - first set of coordinates
   * @param {hexCoordinates} b - second set of coordinates
   * @returns {number} the manhattan distance between a and b
   */
  static distance(a: hexCoordinates, b: hexCoordinates): number {
    return HexService.lengths(HexService.subtract(a, b));
  }

  /**
   * Returns a Hex whos coordinates represent the delta needed to move
   * in the given direction
   * @param {number} direction - number representing the direction
   * @returns {hexagon}
   */
  static direction(direction: number): hexagon {
    return HexService.DIRECTIONS[(6 + (direction % 6)) % 6];
  }

  /**
   * Returns a Hex which is in the given direction.
   * @param {hexagon} hex - starting hex
   * @param {number} direction - number representing the direction
   * @returns {hexagon} Hex which is adjacent in the given direction
   */
  static neighbor(hex: hexagon, direction: number): hexagon {
    return HexService.add(hex, HexService.direction(direction));
  }

  /** Returns an array of all the direct neighbors of a Hex within one Hex away
   * @param {hexagon} hex - starting hex
   * @returns {hexagon[]} array containing all adjacent Hexes
   */
  static neighbors(hex: hexagon): hexagon[] {
    const array: hexagon[] = [];
    for (let i = 0; i < HexService.DIRECTIONS.length; i += 1) {
      array.push(HexService.neighbor(hex, i));
    }
    return array;
  }

  /**
   * rounds the axial coordinate values of a Hex trying to maintain the
   * smallest difference from the current coordinate values.
   * @param {hexagon} hex - the hexagon which needs its coordinates rounded
   * @return {hexagon} - a Hex which contains the rounded coordinates
   */
  static round(hex: hexagon) {
    let rq = Math.round(hex.q);
    let rr = Math.round(hex.r);
    let rs = Math.round(hex.s);

    const qDiff = Math.abs(rq - hex.q);
    const rDiff = Math.abs(rr - hex.r);
    const sDiff = Math.abs(rs - hex.s);

    if (qDiff > rDiff && qDiff > sDiff) rq = -rr - rs;
    else if (rDiff > sDiff) rr = -rq - rs;
    else rs = -rq - rr;

    return new hexagon(rq, rr, rs);
  }

  /** Given the q,r,s of a hexagon return the x and y pixel coordinates of the
   * hexagon center.
   * @param {hexagon} hex - target Hex
   * @param {LayoutDimensions} layout - layout which contains the Hex
   * @returns {point} pixel coordinate of the Hex center
   */
  static hexToPixel(hex: hexagon, layout: LayoutDimension): point {
    const s = layout.spacing;
    const M = layout.orientation;
    let x = (M.f0 * hex.q + M.f1 * hex.r) * layout.size.x;
    let y = (M.f2 * hex.q + M.f3 * hex.r) * layout.size.y;
    // Apply spacing
    x = x * s;
    y = y * s;
    return new point(x + layout.origin.x, y + layout.origin.y);
  }

  /** Return the q,r,s coordinate of the hexagon given pixel point x and y.
   * @param {point} p - target pixel coordinates
   * @param {LayoutDimension} layout - layout of the desired
   * @returns {hexagon} Hex with coordinate position at the
   */
  static pixelToHex(p: point, layout: LayoutDimension): hexagon {
    const M = layout.orientation;
    const pt = new point(
      (p.x - layout.origin.x) / layout.size.x,
      (p.y - layout.origin.y) / layout.size.y
    );
    const q = M.b0 * pt.x + M.b1 * pt.y;
    const r = M.b2 * pt.x + M.b3 * pt.y;
    const hex = new hexagon(q, r, -q - r);
    return HexService.round(hex);
  }

  /** Returns a value that is blended between a and b.
   * For more Information:
   * {@link https://en.wikipedia.org/wiki/Linear_interpolation#Programming_language_support Linear Interpolation Wiki}
   * @param {number} a - left hand value
   * @param {number} b - right hand value
   * @param {number} t - alpha blending value (how much of a or b to be used)
   * @returns {number} a value between a and b based on t
   */
  static lerp(a: number, b: number, t: number): number {
    return a + (b - a) * t;
  }

  /** Calculates the linear interpolation of each Hex coordinate and
   * returns a Hex with the linear interpolated coordiantes.
   * For more Information:
   * {@link https://en.wikipedia.org/wiki/Linear_interpolation#Programming_language_support Linear Interpolation Wiki}
   * @param {hexCoordinates} a - left hand hex
   * @param {hexCoordinates} b - right hand hex
   * @param {number} t - alpha blending value
   * @returns {hexagon} new Hex which is between the two Hexes
   */
  static hexLerp(a: hexCoordinates, b: hexCoordinates, t: number): hexagon {
    return new hexagon(
      HexService.lerp(a.q, b.q, t),
      HexService.lerp(a.r, b.r, t),
      HexService.lerp(a.s, b.s, t)
    );
  }

  /** Return a string ID from Hex Coordinates.
   * Example: Hex Coordinates of {q: 1, r: 2, s: 3} is returned
   * as string "1,2,3"
   * @param {hexCoordinates} hex - target Hex
   * @returns {string} an ID string in the form `{q},{r},{s}`
   */
  static getID(hex: hexCoordinates): string {
    return `${hex.q},${hex.r},${hex.s}`;
  }

  // static hexToNode(hex: hexagon) : node {
  //   return {f: hex.}
  // }
}

export default HexService;
