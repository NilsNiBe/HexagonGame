import { UnitProperties } from "../unit";

export const Infantry: UnitProperties = {
  name: "Infantry",
  type: "Infantry",
  kind: "ground",
  cost: 35,
  ground: { power: 30, range: 1 },
  water: { power: 30, range: 1 },
  air: { power: 0, range: 0 },
  armor: 20,
  speed: 4,
  weight: 1,
  size: 6,
  canBuild: "Both",
  introduced: "1914",
  terrains: ["Forest", "Mountain", "Plains", "Street"],
};
