import { UnitKind } from "../unit";

export const EliteInfantry: UnitKind = {
  type: "Elite-Infantry",
  name: "Elite Infantry",
  cost: 50,
  ground: { power: 43, range: 1 },
  water: { power: 43, range: 1 },
  air: { power: 15, range: 1 },
  armor: 25,
  speed: 4,
  weight: 1,
  size: 6,
  canBuild: "Both",
  introduced: "1914",
  terrains: ["Forest", "Mountain", "Plains", "Street"],
};
