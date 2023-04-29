import React from "react";
import "../App.css";
import { COLORS } from "../assets/colors";
import Hexagon from "../components/Hexagon";
import HexGrid from "../components/HexGrid";
import { LayoutDimension } from "../components/Layout";
import {
  HexagonNodeGrid,
  tileMapToHexagonGrid,
} from "../models/hexagonNodeGrid";
import { getId, HexNode } from "../models/hexNode";
import { PULSE } from "../models/maps/central/pulse";
import { getOrientation } from "../models/orientation";
import { GetUnitColor } from "../models/units/unit";
import { runAStar } from "../services/aStarService";
import { runDijkstra } from "../services/dijkstra";
import { distance, equals, hexToPixel } from "../services/hexService";
import "./Terrain.css";
import { TerrainSvg } from "./TerrainSvg";
import { UnitSvg } from "./UnitSvg";

export function GameMap() {
  const [hexGrid, setHexGrid] = React.useState<HexagonNodeGrid>(
    tileMapToHexagonGrid(PULSE)
    // createRandomHexagonGrid(35, 23)
    // new HexagonNodeGrid(47, 19)
  );
  const [startHex, setStartHex] = React.useState<HexNode | undefined>(
    undefined
  );
  const [endHex, setEndHex] = React.useState<HexNode | undefined>(undefined);
  const [foundPath, setFoundPath] = React.useState<HexNode[] | undefined>(
    undefined
  );

  const [reachable, setReachable] = React.useState<HexNode[] | undefined>(
    undefined
  );

  const cellStyle = {
    // fill: COLORS.orange[0],
    // stroke: COLORS.orange[1],
    // strokeWidth: 0.0,
  };

  const size = 25;

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

  React.useEffect(() => {
    if (startHex != undefined && startHex.unit !== undefined) {
      const res = runDijkstra(
        hexGrid.nodes,
        startHex,
        n =>
          n.unit !== undefined && n.unit?.coalition !== startHex.unit?.coalition
            ? Number.MAX_VALUE
            : n.weight,
        startHex.unit.kind.speed
      );

      const reachable = res
        .filter(
          x =>
            x.cost < Number.MAX_VALUE &&
            x.node.unit?.coalition != startHex.unit?.coalition
        )
        .map(x => x.node);

      setReachable(reachable);
    } else {
      setReachable(undefined);
    }
  }, [startHex]);

  React.useEffect(() => {
    if (
      startHex !== undefined &&
      startHex.unit !== undefined &&
      endHex !== undefined &&
      reachable?.includes(endHex)
    ) {
      hexGrid.nodes.forEach(x => {
        x.f = 0;
        x.g = 0;
        x.h = undefined;
        x.predecessor = undefined;
      });

      const res = runAStar(
        startHex,
        endHex,
        (_, n) =>
          n.unit !== undefined && n.unit?.coalition !== startHex.unit?.coalition
            ? Number.MAX_VALUE
            : n.weight,
        distance
      );

      setFoundPath(res);
    } else {
      setFoundPath(undefined);
    }
  }, [startHex, endHex]);

  return (
    <HexGrid
      style={{ display: "flex" }}
      width={xMax + 2 * size}
      height={yMax + 2 * size}
      viewBox={`${xMin} ${yMin} ${xMax + 2 * size} ${yMax + 2 * size}`}
    >
      {hexGrid.nodes.map(hex => {
        const isPath = foundPath?.find(x => equals(x, hex)) !== undefined;
        const isReachable =
          reachable === undefined
            ? true
            : reachable?.find(x => equals(x, hex)) !== undefined;

        return (
          <Hexagon
            hex={hex}
            layout={layout}
            key={getId(hex)}
            cellStyle={{
              ...cellStyle,
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
              stroke: equals(startHex, hex)
                ? COLORS.dark[9]
                : isPath
                ? COLORS.blue[9]
                : undefined,
              opacity: isReachable ? 1 : 0.3,

              strokeWidth:
                hex.blocked || hex.weight === Number.MAX_VALUE
                  ? 0
                  : equals(startHex, hex)
                  ? 1
                  : isPath
                  ? 1
                  : 0,
            }}
            onClick={() => {
              if (equals(startHex, hex)) {
                setStartHex(undefined);
              } else if (!hex.blocked) {
                if (startHex === undefined && hex.unit !== undefined) {
                  setStartHex(hex);
                } else if (
                  startHex !== undefined &&
                  hex.unit === undefined &&
                  reachable?.includes(hex)
                ) {
                  const startHexUnit = startHex.unit;
                  setHexGrid(x => ({
                    ...x,
                    nodes: x.nodes.map(n => {
                      if (n === hex) {
                        n.unit = startHexUnit;
                        return n;
                      } else if (n === startHex) {
                        startHex.unit = undefined;
                        return startHex;
                      }
                      return n;
                    }),
                  }));
                  setStartHex(undefined);
                }
              }
            }}
            onMouseEnter={() => {
              if (hex.blocked || hex.weight === Number.MAX_VALUE) {
                setEndHex(undefined);
              } else {
                setEndHex(hex);
              }
            }}
          >
            <>
              {hex.terrain && (
                <TerrainSvg
                  type={hex.terrain.type}
                  size={size}
                  opacity={isReachable ? 1 : 0.3}
                />
              )}
              {hex.unit && (
                <UnitSvg
                  type={hex.unit.kind.type}
                  width="8%"
                  height="8%"
                  fill={GetUnitColor(hex.unit)}
                  stroke={GetUnitColor(hex.unit)}
                  x={-24}
                  y={-40}
                />
              )}
            </>
            {/* <Coordinates q={hex.q} r={hex.r} s={hex.s} /> */}
          </Hexagon>
        );
      })}
    </HexGrid>
    // </div>
  );
}
