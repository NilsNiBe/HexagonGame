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

export type UnitType = typeof UNIT_TYPES[number];

export interface Unit {
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
  allies: Allies;
  introduced: Year;
  image: string;
  terrains: TerrainType[];
}

export interface Attack {
  power: number;
  range: number;
}

export type Allies = "Central" | "Entente" | "Both";
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
