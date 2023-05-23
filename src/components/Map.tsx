import React from "react";
import { COLORS } from "../assets/colors";
import { HexagonNodeGrid } from "../models/hexagonNodeGrid";
import HexagonTile, { getHexKey } from "../models/hexagonTile";
import { getOrientation } from "../models/orientation";
import { hexToPixel } from "../services/hexService";
import Hexagon from "./Hexagon";
import HexGrid from "./HexGrid";
import { LayoutDimension } from "./Layout";
import { TerrainSvg } from "./terrain/TerrainSvg";
import { UnitSvg } from "./units/UnitSvg";
import { Coordinates } from "./Coordinates";

export interface MapProps {
  hexSize: number;
  createGrid: () => HexagonNodeGrid;
  onHexClick: (index: number, grid: HexagonNodeGrid) => HexagonNodeGrid;
  onHexEnter?: (index: number, grid: HexagonNodeGrid) => HexagonNodeGrid;
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
  const pixel = hexGrid.nodes.map((x) => hexToPixel(x, layout));

  const xMin = Math.min(...pixel.map((p) => p.x));
  const xMax = Math.max(...pixel.map((p) => p.x));
  const yMin = Math.min(...pixel.map((p) => p.y));
  const yMax = Math.max(...pixel.map((p) => p.y));
  const selectedHex = hexGrid.nodes.find((x) => x.isSelected);
  const mouseOverHex = hexGrid.nodes.find((x) => x.isMouseOver);

  return (
    <HexGrid
      style={{ display: "flex" }}
      width={xMax + 2 * size}
      height={yMax + 2 * size}
      viewBox={`${xMin} ${yMin} ${xMax + 2 * size} ${yMax + 2 * size}`}
    >
      <>
        {hexGrid.nodes.map((hex, index) => {
          return (
            <Hexagon
              hex={hex}
              layout={layout}
              key={getHexKey(hex)}
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
              filter={
                selectedHex !== undefined
                  ? hex.isReachable
                    ? undefined
                    : "brightness(70%)"
                  : undefined
              }
              onClick={() => setHexGrid(props.onHexClick(index, hexGrid))}
              onMouseEnter={() => {
                if (props.onHexEnter !== undefined) {
                  setHexGrid(props.onHexEnter(index, hexGrid));
                }
              }}
            >
              <>
                {hex.terrain && (
                  <TerrainSvg
                    type={hex.terrain.type}
                    size={size}
                    opacity={
                      selectedHex === undefined ? 1 : hex.isReachable ? 1 : 0.3
                    }
                  />
                )}
                {hex.unit && (
                  <UnitSvg
                    size={size}
                    type={hex.unit.kind.type}
                    coalition={hex.unit.coalition}
                    orientation={hex.unit.orientation}
                    filter={hex.unit.isDone ? "brightness(50%)" : undefined}
                  />
                )}
              </>
              {/* <Coordinates q={hex.q} r={hex.r} s={hex.s} /> */}
            </Hexagon>
          );
        })}
        {selectedHex !== undefined && (
          <Hexagon
            hex={selectedHex}
            layout={layout}
            cellStyle={{
              fill: "none",
              stroke: "brown",
              strokeWidth: 5,
            }}
          />
        )}
        {mouseOverHex !== undefined && (
          <Hexagon
            hex={mouseOverHex}
            layout={layout}
            cellStyle={{
              fill: "none",
              stroke: "black",
              strokeWidth: 5,
            }}
          />
        )}
        {hexGrid.nodes.map((hex) => {
          if (hex.isPath && !hex.isMouseOver && !hex.isSelected) {
            return (
              <Hexagon
                hex={hex}
                layout={layout}
                cellStyle={{
                  fill: "none",
                  stroke: "blue",
                  strokeWidth: 2,
                }}
              />
            );
          }
        })}
      </>
    </HexGrid>
  );
};
