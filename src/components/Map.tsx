import React from "react";
import { COLORS } from "../assets/colors";
import { HexagonNodeGrid } from "../models/hexagonNodeGrid";
import HexagonTile from "../models/hexagonTile";
import { getId } from "../models/hexNode";
import { getOrientation } from "../models/orientation";
import { hexToPixel } from "../services/hexService";
import Hexagon from "./Hexagon";
import HexGrid from "./HexGrid";
import { LayoutDimension } from "./Layout";
import { TerrainSvg } from "./terrain/TerrainSvg";
import { UnitSvg } from "./units/UnitSvg";

export interface MapProps {
  hexSize: number;
  createGrid: () => HexagonNodeGrid;
  onClick: (hex: HexagonTile) => void;
}

export const Map = (props: MapProps) => {
  const [hexGrid, setHexGrid] = React.useState<HexagonNodeGrid>(
    props.createGrid()
  );
  const size = props.hexSize;
  const layout: LayoutDimension = {
    size: { x: size, y: size },
    orientation: getOrientation("flat"),
    spacing: 1.02,
    origin: { x: 0, y: 0 },
  };
  const pixel = hexGrid.nodes.map(x => hexToPixel(x, layout));

  const xMin = Math.min(...pixel.map(p => p.x));
  const xMax = Math.max(...pixel.map(p => p.x));
  const yMin = Math.min(...pixel.map(p => p.y));
  const yMax = Math.max(...pixel.map(p => p.y));

  return (
    <HexGrid
      style={{ display: "flex" }}
      width={xMax + 2 * size}
      height={yMax + 2 * size}
      viewBox={`${xMin} ${yMin} ${xMax + 2 * size} ${yMax + 2 * size}`}
    >
      <>
        {hexGrid.nodes.map(hex => {
          return (
            <Hexagon
              hex={hex}
              layout={layout}
              key={getId(hex)}
              cellStyle={{
                fill:
                  hex.terrain?.type === "Water"
                    ? COLORS.blue[5]
                    : hex.terrain?.type === "Mountain"
                    ? COLORS.green[3]
                    : hex.terrain?.type === "Street"
                    ? COLORS.gray[5]
                    : hex.terrain?.type === "Forest"
                    ? COLORS.green[5]
                    : hex.terrain?.type === "Plains"
                    ? COLORS.green[5]
                    : COLORS.dark[9],
              }}
              onClick={() => props.onClick(hex)}
            >
              <>
                {hex.terrain && (
                  <TerrainSvg type={hex.terrain.type} size={size} />
                )}
                {hex.unit && (
                  <UnitSvg
                    size={size}
                    type={hex.unit.kind.type}
                    coalition={hex.unit.coalition}
                  />
                )}
              </>
            </Hexagon>
          );
        })}
      </>
    </HexGrid>
  );
};
