import { UnitSvg } from "../../../assets/index";
import { Unit } from "../Unit";

export const Infantry: Unit = {
  type: "Infantry",
  name: "Infantry",
  cost: 35,
  ground: { power: 30, range: 1 },
  water: { power: 30, range: 1 },
  air: { power: 0, range: 0 },
  armor: 20,
  speed: 4,
  weight: 1,
  size: 6,
  allies: "Both",
  introduced: "1914",
  image: UnitSvg.InfantrySvg,
};
