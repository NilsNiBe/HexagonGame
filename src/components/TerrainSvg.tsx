import { TerrainType } from "../models/terrain/terrain";
import { Forest } from "./Forest";
import { Mountain } from "./Mountain";

interface TerrainSvgProps {
  type: TerrainType;
}

export function TerrainSvg(
  props: TerrainSvgProps & React.SVGProps<SVGSVGElement>
) {
  //   return null;
  switch (props.type) {
    case "Forrest":
      return <Forest {...props} />;
    case "Mountain":
      return <Mountain {...props} />;
    default:
      return null;
  }
}
