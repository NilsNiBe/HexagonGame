import { UnitSvg } from "../../../assets";
import { UnitKind } from "../unit";

export const HeavyArtillery: UnitKind = {
  type: "Heavy-Artillery",
  name: "Heavy Artillery",
  cost: 85,
  ground: { power: 70, range: 6 },
  water: { power: 70, range: 6 },
  air: { power: 0, range: 0 },
  armor: 25,
  speed: 1,
  weight: 5,
  size: 6,
  canBuild: "Both",
  introduced: "1914",
  image: UnitSvg.HeavyArtillerySvg,
  terrains: ["Street"],
};
