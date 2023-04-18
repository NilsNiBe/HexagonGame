import { UnitSvg } from "../../../assets";
import { Unit } from "../Unit";

export const EliteInfantry: Unit = {
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
  allies: "Both",
  introduced: "1914",
  image: UnitSvg.EliteInfantrySvg,
  terrains: ["Forrest", "Mountain", "Plains", "Street"],
};
