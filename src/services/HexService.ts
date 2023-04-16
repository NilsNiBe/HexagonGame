import { LayoutDimension } from "../components/Layout";
import { hexagon, HexCoordinates } from "../models/Hexagon";
import { Point } from "../models/Point";

export const DIRECTIONS = [
  new hexagon(1, 0, -1),
  new hexagon(1, -1, 0),
  new hexagon(0, -1, 1),
  new hexagon(-1, 0, 1),
  new hexagon(-1, 1, 0),
  new hexagon(0, 1, -1),
];

/**
 * Checks if coordinates are the same.
 * @param {HexCoordinates} a - first set of coordinates
 * @param {HexCoordinates} b - second set of coordinates
 * @returns {boolean} - true if all coords are the same, false otherwise
 */
export function equals(
  a: HexCoordinates | undefined,
  b: HexCoordinates | undefined
): boolean {
  if (a === undefined || b === undefined) return false;
  return a.q == b.q && a.r == b.r && a.s == b.s;
}

/**
 * Returns a new Hex with the addition of q,r,s values from A and B respectively
 * @param {HexCoordinates} a - first set of coordinates
 * @param {HexCoordinates} b - second set of coordinates
 * @returns {hexagon} - new hex at the position of the sum of the coords
 */
export function add(a: HexCoordinates, b: HexCoordinates): hexagon {
  return new hexagon(a.q + b.q, a.r + b.r, a.s + b.s);
}

/**
 * Returns a new Hex with the subtraction of q,r,s values from A and B respectively
 * @param {HexCoordinates} a - first set of coordinates
 * @param {HexCoordinates} b - second set of coordinates
 * @returns {hexagon} - new hex at the position of the difference between a and b
 */
export function subtract(a: HexCoordinates, b: HexCoordinates): hexagon {
  return new hexagon(a.q - b.q, a.r - b.r, a.s - b.s);
}

/**
 * @param {HexCoordinates} a - first set of coordinates
 * @param {HexCoordinates} k - second set of coordinates
 * @returns {hexagon} new hex at the position of the product between a's coordinates and a constant k
 */
export function multiply(a: HexCoordinates, k: number): hexagon {
  return new hexagon(a.q * k, a.r * k, a.s * k);
}

/**
 * @param {hexagon} hex - target hex
 * @returns {number} manhattan distance between hex and origin
 */
export function lengths(hex: hexagon): number {
  return (Math.abs(hex.q) + Math.abs(hex.r) + Math.abs(hex.s)) / 2;
}

/**
 * Returns the distance between two hex coordinates
 * @param {HexCoordinates} a - first set of coordinates
 * @param {HexCoordinates} b - second set of coordinates
 * @returns {number} the manhattan distance between a and b
 */
export function distance(a: HexCoordinates, b: HexCoordinates): number {
  return lengths(subtract(a, b));
}

/**
 * Returns a Hex whos coordinates represent the delta needed to move
 * in the given direction
 * @param {number} direction - number representing the direction
 * @returns {hexagon}
 */
export function direction(direction: number): hexagon {
  return DIRECTIONS[(6 + (direction % 6)) % 6];
}

/**
 * Returns a Hex which is in the given direction.
 * @param {hexagon} hex - starting hex
 * @param {number} direction - number representing the direction
 * @returns {hexagon} Hex which is adjacent in the given direction
 */
export function neighbor(hex: hexagon, directionNumber: number): hexagon {
  return add(hex, direction(directionNumber));
}

/** Returns an array of all the direct neighbors of a Hex within one Hex away
 * @param {hexagon} hex - starting hex
 * @returns {hexagon[]} array containing all adjacent Hexes
 */
export function neighbors(hex: hexagon): hexagon[] {
  const array: hexagon[] = [];
  for (let i = 0; i < DIRECTIONS.length; i += 1) {
    array.push(neighbor(hex, i));
  }
  return array;
}

/**
 * rounds the axial coordinate values of a Hex trying to maintain the
 * smallest difference from the current coordinate values.
 * @param {hexagon} hex - the hexagon which needs its coordinates rounded
 * @return {hexagon} - a Hex which contains the rounded coordinates
 */
export function round(hex: hexagon) {
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
 * @returns {Point} pixel coordinate of the Hex center
 */
export function hexToPixel(hex: hexagon, layout: LayoutDimension): Point {
  const s = layout.spacing;
  const M = layout.orientation;
  let x = (M.f0 * hex.q + M.f1 * hex.r) * layout.size.x;
  let y = (M.f2 * hex.q + M.f3 * hex.r) * layout.size.y;
  // Apply spacing
  x = x * s;
  y = y * s;
  return { x: x + layout.origin.x, y: y + layout.origin.y };
}

/** Return the q,r,s coordinate of the hexagon given pixel point x and y.
 * @param {Point} p - target pixel coordinates
 * @param {LayoutDimension} layout - layout of the desired
 * @returns {hexagon} Hex with coordinate position at the
 */
export function pixelToHex(p: Point, layout: LayoutDimension): hexagon {
  const M = layout.orientation;
  const pt = {
    x: (p.x - layout.origin.x) / layout.size.x,
    y: (p.y - layout.origin.y) / layout.size.y,
  };
  const q = M.b0 * pt.x + M.b1 * pt.y;
  const r = M.b2 * pt.x + M.b3 * pt.y;
  const hex = new hexagon(q, r, -q - r);
  return round(hex);
}

/** Returns a value that is blended between a and b.
 * For more Information:
 * {@link https://en.wikipedia.org/wiki/Linear_interpolation#Programming_language_support Linear Interpolation Wiki}
 * @param {number} a - left hand value
 * @param {number} b - right hand value
 * @param {number} t - alpha blending value (how much of a or b to be used)
 * @returns {number} a value between a and b based on t
 */
export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/** Calculates the linear interpolation of each Hex coordinate and
 * returns a Hex with the linear interpolated coordiantes.
 * For more Information:
 * {@link https://en.wikipedia.org/wiki/Linear_interpolation#Programming_language_support Linear Interpolation Wiki}
 * @param {HexCoordinates} a - left hand hex
 * @param {HexCoordinates} b - right hand hex
 * @param {number} t - alpha blending value
 * @returns {hexagon} new Hex which is between the two Hexes
 */
export function hexLerp(
  a: HexCoordinates,
  b: HexCoordinates,
  t: number
): hexagon {
  return new hexagon(lerp(a.q, b.q, t), lerp(a.r, b.r, t), lerp(a.s, b.s, t));
}

/** Return a string ID from Hex Coordinates.
 * Example: Hex Coordinates of {q: 1, r: 2, s: 3} is returned
 * as string "1,2,3"
 * @param {HexCoordinates} hex - target Hex
 * @returns {string} an ID string in the form `{q},{r},{s}`
 */
export function getID(hex: HexCoordinates): string {
  return `${hex.q},${hex.r},${hex.s}`;
}

// static hexToNode(hex: hexagon) : node {
//   return {f: hex.}
// }
