import { TerrainSvg } from "../../assets";
import { Terrain } from "./Terrain";

export const Water: Terrain = {
  type: "Water",
  cost: Number.MAX_VALUE,
  image: TerrainSvg.WaterSvg,
};
