import { UnitKind } from "../unit";

export const LightArtillery: UnitKind = {
  type: "Light-Artillery",
  name: "Light Artillery",
  cost: 55,
  ground: { power: 45, range: 3 },
  water: { power: 45, range: 3 },
  air: { power: 0, range: 0 },
  armor: 25,
  speed: 2,
  weight: 3,
  size: 6,
  canBuild: "Both",
  introduced: "1914",
  terrains: ["Forest", "Mountain", "Plains", "Street"],
};
