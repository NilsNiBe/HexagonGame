import { Forest } from "./terrain/forest";
import { Mountain } from "./terrain/mountain";
import { Plains } from "./terrain/plains";
import { Street } from "./terrain/street";
import { Terrain } from "./terrain/terrain";
import { Water } from "./terrain/water";
import { Cavalry } from "./units/ground/calvary";
import { EliteInfantry } from "./units/ground/eliteInfantry";
import { HeavyArtillery } from "./units/ground/heavyArtillery";
import { Infantry } from "./units/ground/infantry";
import { LightArtillery } from "./units/ground/lightArtillery";
import { MediumArtillery } from "./units/ground/mediumArtillery";

export const RandomUnit = () => {
  const r = Math.random();
  if (r < 0.05) {
    return Infantry;
  } else if (r < 0.1) {
    return EliteInfantry;
  } else if (0.1 < r && r < 0.15) {
    return Cavalry;
  } else if (0.15 < r && r < 0.2) {
    return LightArtillery;
  } else if (0.2 < r && r < 0.25) {
    return MediumArtillery;
  } else if (0.25 < r && r < 0.3) {
    return HeavyArtillery;
  } else {
    return undefined;
  }
};

export const randomTerrain = (): Terrain => {
  const r = Math.random();
  if (r < 0.3) {
    return Water;
  } else if (0.3 < r && r < 0.4) {
    return Mountain;
  } else if (0.5 < r && r < 0.6) {
    return Forest;
  } else if (0.6 < r && r < 0.7) {
    return Street;
  } else {
    return Plains;
  }
};
