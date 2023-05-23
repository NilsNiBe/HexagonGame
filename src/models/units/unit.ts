import { DIRECTIONS, add } from "../../services/hexService";
import { HexCoordinates, getHexKey } from "../hexagonTile";
import { TerrainType } from "../terrain/terrain";
import { Cavalry } from "./ground/calvary";
import { EliteInfantry } from "./ground/eliteInfantry";
import { HeavyArtillery } from "./ground/heavyArtillery";
import { Infantry } from "./ground/infantry";
import { LightArtillery } from "./ground/lightArtillery";
import { MediumArtillery } from "./ground/mediumArtillery";

export const UNIT_TYPES = [
  "Infantry",
  "Elite-Infantry",
  "Cavalry",
  "Light-Artillery",
  "Medium-Artillery",
  "Heavy-Artillery",
] as const;
export type UnitType = (typeof UNIT_TYPES)[number];

export const COALITIONS = ["Central", "Entente"] as const;

export const UNIT_ORIENTATION = [
  "North",
  "North-East",
  "South-East",
  "South",
  "South-West",
  "North-West",
] as const;

export type UnitOrientation = (typeof UNIT_ORIENTATION)[number];

export interface UnitKind {
  type: UnitType;
  name: string;
  cost: number;
  ground: Attack;
  water: Attack;
  air: Attack;
  armor: number;
  speed: number;
  weight: number;
  size: number;
  canBuild: Coalition | "Both";
  introduced: Year;
  terrains: TerrainType[];
}

export interface Attack {
  power: number;
  range: number;
}

export interface Unit {
  kind: UnitKind;
  health: number;
  experience: ExperienceLevel;
  coalition: Coalition;
  orientation: UnitOrientation;
  isDone: boolean;
}

export type ExperienceLevel = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export type Coalition = (typeof COALITIONS)[number];
export type Year = "1914" | "1915" | "1916" | "1917" | "1918";

export function GetUnit(type: UnitType) {
  switch (type) {
    case "Infantry":
      return Infantry;
    case "Elite-Infantry":
      return EliteInfantry;
    case "Cavalry":
      return Cavalry;
    case "Light-Artillery":
      return LightArtillery;
    case "Medium-Artillery":
      return MediumArtillery;
    case "Heavy-Artillery":
      return HeavyArtillery;
  }
}

export function createUnit(c: Coalition, u: UnitKind): Unit {
  return {
    kind: u,
    coalition: c,
    health: u.size,
    experience: 0,
    orientation: "North",
    isDone: false,
  };
}

export function getOrientationFromTo(
  from: HexCoordinates,
  to: HexCoordinates
): UnitOrientation {
  for (let i = 0; i < DIRECTIONS.length; i++) {
    const hex = add(DIRECTIONS[i], from);
    if (hex.q === to.q && hex.r === to.r) {
      return getOrientation(DIRECTIONS[i]);
    }
  }
  return "North";
}

export function getOrientation(hex: HexCoordinates): UnitOrientation {
  if (hex.q === 0 && hex.r === -1) {
    return "North";
  }
  if (hex.q === 1 && hex.r === -1) {
    return "North-East";
  }
  if (hex.q === 1 && hex.r === 0) {
    return "South-East";
  }
  if (hex.q === 0 && hex.r === 1) {
    return "South";
  }
  if (hex.q === -1 && hex.r === 1) {
    return "South-West";
  }
  if (hex.q === -1 && hex.r === 0) {
    return "North-West";
  }
  throw Error(`Not supported orientation coordinate: (q:${hex.q}, r:${hex.r})`);
}
