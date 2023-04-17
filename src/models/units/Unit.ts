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
}

export interface Attack {
  power: number;
  range: number;
}

export type Allies = "Central" | "Entente" | "Both";
export type Year = "1914" | "1915" | "1916" | "1917" | "1918";
