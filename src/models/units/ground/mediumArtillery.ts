import { UnitSvg } from "../../../assets";
import { UnitKind } from "../Unit";

export const MediumArtillery: UnitKind = {
  type: "Medium-Artillery",
  name: "Medium Artillery",
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
  image: UnitSvg.MediumArtillerySvg,
  terrains: ["Forrest", "Plains", "Street"],
};
