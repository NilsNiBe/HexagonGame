import { UnitProperties } from "../unit";

export const MediumArtillery: UnitProperties = {
  name: "Medium Artillery",
  type: "Medium-Artillery",
  kind: "ground",
  cost: 70,
  ground: { power: 55, range: 5 },
  water: { power: 55, range: 5 },
  air: { power: 0, range: 0 },
  armor: 27,
  speed: 1,
  weight: 4,
  size: 6,
  canBuild: "Both",
  introduced: "1914",
  terrains: ["Forest", "Plains", "Street"],
};
