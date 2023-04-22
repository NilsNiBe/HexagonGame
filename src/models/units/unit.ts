import { TerrainType } from "../terrain/Terrain";
import { Cavalry } from "./ground/Calvary";
import { EliteInfantry } from "./ground/EliteInfantry";
import { HeavyArtillery } from "./ground/HeavyArtillery";
import { Infantry } from "./ground/Infantry";
import { LightArtillery } from "./ground/LightArtillery";
import { MediumArtillery } from "./ground/MediumArtillery";

export const UNIT_TYPES = [
  "Infantry",
  "Elite-Infantry",
  "Cavalry",
  "Light-Artillery",
  "Medium-Artillery",
  "Heavy-Artillery",
] as const;

export const COALITIONS = ["Central", "Entente"] as const;

export type UnitType = (typeof UNIT_TYPES)[number];

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
  image: string;
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
}

export type ExperienceLevel = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export type Coalition = (typeof COALITIONS)[number];
export type Year = "1914" | "1915" | "1916" | "1917" | "1918";

export function GetUnitColor(u: Unit) {
  return u.coalition === "Central" ? "darkgreen" : "maroon";
}

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
  return { kind: u, coalition: c, health: u.size, experience: 0 };
}
