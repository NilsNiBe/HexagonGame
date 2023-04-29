import { TerrainType } from "../models/terrain/terrain";
import { Forest } from "./Forest";
import { Mountain } from "./Mountain";
import { Water } from "./Water";

interface TerrainSvgProps {
  type: TerrainType;
  size: number;
}

export function TerrainSvg(
  props: TerrainSvgProps & React.SVGProps<SVGSVGElement>
) {
  //   return null;
  switch (props.type) {
    case "Forest":
      return <Forest {...props} />;
    case "Mountain":
      return <Mountain {...props} />;
    case "Water":
      return <Water {...props} />;
    default:
      return null;
  }
}
