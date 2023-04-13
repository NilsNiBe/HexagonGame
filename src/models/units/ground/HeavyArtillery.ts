import { UnitSvg } from "../../../assets";
import { Unit } from "../Unit";

export const HeavyArtillery: Unit = {
  type: "heavy-artillery",
  name: "Heavy Artillery",
  cost: 85,
  ground: { power: 70, range: 6 },
  water: { power: 70, range: 6 },
  air: { power: 0, range: 0 },
  armor: 25,
  speed: 1,
  weight: 5,
  size: 6,
  allies: "Both",
  introduced: "1914",
  image: UnitSvg.HeavyArtillerySvg,
};
