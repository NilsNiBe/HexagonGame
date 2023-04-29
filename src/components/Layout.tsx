import { Orientation } from "../models/orientation";
import { Point } from "../models/point";

export type Size = { x: number; y: number };

export type LayoutDimension = {
  size: Size;
  orientation: Orientation;
  origin: Size;
  spacing: number;
};
export type LayoutContextProps = {
  layout: LayoutDimension;
  points: string;
};

/**
 * Calculates the points for a hexagon given the size, angle, and center
 * @param circumradius Radius of the Hexagon
 * @param angle Angle offset for the hexagon in radians
 * @param center Central point for the hexagon
 * @returns Array of 6 points
 */

export function calculateCoordinates(
  circumradius: number,
  angle: number = 0,
  center: Point = { x: 0, y: 0 }
) {
  const corners: Point[] = [];

  for (let i = 0; i < 6; i++) {
    const x = circumradius * Math.cos((2 * Math.PI * i) / 6 + angle);
    const y = circumradius * Math.sin((2 * Math.PI * i) / 6 + angle);
    const p: Point = { x: center.x + x, y: center.y + y };
    corners.push(p);
  }

  return corners;
}
