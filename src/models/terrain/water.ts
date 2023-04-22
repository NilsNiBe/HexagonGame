import { TerrainSvg } from "../../assets";
import { Terrain } from "./terrain";

export const Water: Terrain = {
  type: "Water",
  cost: Number.MAX_VALUE,
  image: TerrainSvg.WaterSvg,
};
