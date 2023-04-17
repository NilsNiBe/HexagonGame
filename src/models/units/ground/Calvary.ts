import { UnitSvg } from "../../../assets";
import { Unit } from "../Unit";

export const Cavalry: Unit = {
  type: "Cavalry",
  name: "Cavalry",
  cost: 50,
  ground: { power: 33, range: 1 },
  water: { power: 0, range: 0 },
  air: { power: 0, range: 0 },
  armor: 20,
  speed: 6,
  weight: 2,
  size: 6,
  allies: "Both",
  introduced: "1914",
  image: UnitSvg.CavalrySvg,
};
