import { ReactComponent as InfantrySvg } from "../assets/units/ground/infantry.svg";
import { ReactComponent as EliteInfantrySvg } from "../assets/units/ground/elite-infantry.svg";
import { ReactComponent as CavalrySvg } from "../assets/units/ground/cavalry.svg";
import { ReactComponent as LightArtillerySvg } from "../assets/units/ground/light-artillery.svg";
import { ReactComponent as MediumArtillerySvg } from "../assets/units/ground/medium-artillery.svg";
import { ReactComponent as HeavyArtillerySvg } from "../assets/units/ground/heavy-artillery.svg";
import { UnitType } from "../models/units/unit";

interface UnitSvgProps {
  type: UnitType;
}

export function UnitSvg(props: UnitSvgProps & React.SVGProps<SVGSVGElement>) {
  switch (props.type) {
    case "Infantry":
      return <InfantrySvg {...props} />;
    case "Elite-Infantry":
      return <EliteInfantrySvg {...props} />;
    case "Cavalry":
      return <CavalrySvg {...props} />;
    case "Light-Artillery":
      return <LightArtillerySvg {...props} />;
    case "Medium-Artillery":
      return <MediumArtillerySvg {...props} />;
    case "Heavy-Artillery":
      return <HeavyArtillerySvg {...props} />;
  }
}
