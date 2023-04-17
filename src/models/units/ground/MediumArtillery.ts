import { UnitSvg } from "../../../assets";
import { Unit } from "../Unit";

export const MediumArtillery: Unit = {
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
  allies: "Both",
  introduced: "1914",
  image: UnitSvg.MediumArtillerySvg,
};
