import { UnitSvg } from "../../../assets";
import { Unit } from "../Unit";

export const LightArtillery: Unit = {
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
  allies: "Both",
  introduced: "1914",
  image: UnitSvg.LightArtillerySvg,
  terrains: ["Forrest", "Mountain", "Plains", "Street"],
};
