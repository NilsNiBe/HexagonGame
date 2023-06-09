import { UnitProperties } from "../unit";

export const Cavalry: UnitProperties = {
  name: "Cavalry",
  type: "Cavalry",
  kind: "ground",
  cost: 50,
  ground: { power: 33, range: 1 },
  water: { power: 0, range: 0 },
  air: { power: 0, range: 0 },
  armor: 20,
  speed: 6,
  weight: 2,
  size: 6,
  canBuild: "Both",
  introduced: "1914",
  terrains: ["Forest", "Mountain", "Plains", "Street"],
};
