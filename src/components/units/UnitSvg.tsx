import { Coalition, UnitType } from "../../models/units/unit";
import { Cavalry } from "./Cavalry";
import { EliteInfantry } from "./EliteInfantry";
import { HeavyArtillery } from "./HeavyArtillery";
import { Infantry } from "./Infantry";
import { LightArtillery } from "./LightArtillery";
import { MediumArtillery } from "./MediumArtillery";
import "./Unit.css";

interface UnitSvgProps {
  type: UnitType;
  coalition: Coalition;
  size: number;
}

interface UnitProps {
  type: UnitType;
  prefix: string;
}

export function coalitionPrefix(coalition: Coalition) {
  return coalition === "Central" ? "central-" : "entente-";
}

const unit = (props: UnitProps & React.SVGProps<SVGSVGElement>) => {
  switch (props.type) {
    case "Infantry":
      return <Infantry {...props} />;
    case "Elite-Infantry":
      return <EliteInfantry {...props} />;
    case "Cavalry":
      return <Cavalry {...props} />;
    case "Light-Artillery":
      return <LightArtillery {...props} />;
    case "Medium-Artillery":
      return <MediumArtillery {...props} />;
    case "Heavy-Artillery":
      return <HeavyArtillery {...props} />;
    default:
      return null;
  }
};

export function UnitSvg(props: UnitSvgProps & React.SVGProps<SVGSVGElement>) {
  const prefix = coalitionPrefix(props.coalition);

  return (
    <g
      opacity={props.opacity}
      transform={`scale(${(2 * props.size) / 100}) translate(-50, -43.3)`}
    >
      {unit({ ...props, prefix })}
    </g>
  );
  //   return null;
}
