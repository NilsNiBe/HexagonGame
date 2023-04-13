import CavalrySvg from "../assets/units/ground/cavalry.svg";
import EliteInfantrySvg from "../assets/units/ground/elite-infantry.svg";
import HeavyArtillerySvg from "../assets/units/ground/heavy-artillery.svg";
import InfantrySvg from "../assets/units/ground/infantry.svg";
import LightArtillerySvg from "../assets/units/ground/light-artillery.svg";
import MediumArtillerySvg from "../assets/units/ground/medium-artillery.svg";

import ForestSvg from "../assets/terrain/forest.svg";
import MountainSvg from "../assets/terrain/mountain.svg";
import PlainsSvg from "../assets/terrain/plains.svg";
import StreetSvg from "../assets/terrain/street.svg";
import WaterSvg from "../assets/terrain/water.svg";

const UnitSvg = {
  InfantrySvg: InfantrySvg,
  EliteInfantrySvg: EliteInfantrySvg,
  CavalrySvg: CavalrySvg,
  LightArtillerySvg: LightArtillerySvg,
  MediumArtillerySvg: MediumArtillerySvg,
  HeavyArtillerySvg: HeavyArtillerySvg,
};

const TerrainSvg = {
  StreetSvg,
  PlainsSvg,
  ForestSvg,
  MountainSvg,
  WaterSvg,
};

export { UnitSvg, TerrainSvg };
