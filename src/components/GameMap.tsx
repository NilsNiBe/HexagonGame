import React from "react";
import "../App.css";
import { COLORS } from "../assets/colors";
import Hexagon from "../components/Hexagon";
import HexGrid from "../components/HexGrid";
import Layout from "../components/Layout";
import {
  HexagonNodeGrid,
  tileMapToHexagonGrid,
} from "../models/hexagonNodeGrid";
import { getId, HexNode } from "../models/hexNode";
import { runAStar } from "../services/aStarService";
import { runDijkstra } from "../services/dijkstra";
import { distance, equals } from "../services/hexService";
import { UnitSvg } from "./UnitSvg";
import { GetUnitColor } from "../models/units/unit";
import { PULSE } from "../models/maps/central/pulse";
import { TerrainSvg } from "./TerrainSvg";
import "./Terrain.css";

export function GameMap() {
  const [hexGrid, setHexGrid] = React.useState<HexagonNodeGrid>(
    tileMapToHexagonGrid(PULSE)
    // createRandomHexagonGrid(15, 23)
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

  React.useEffect(() => {
    if (startHex != undefined && startHex.unit !== undefined) {
      const res = runDijkstra(
        hexGrid.nodes,
        startHex,
        startHex.unit.kind.speed
      );

      const reachable = res
        .filter((x) => x.cost < Number.MAX_VALUE)
        .map((x) => x.node);

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
      hexGrid.nodes.forEach((x) => {
        x.f = 0;
        x.g = 0;
        x.h = undefined;
        x.predecessor = undefined;
      });

      const res = runAStar(startHex, endHex, (_, n) => n.weight ?? 1, distance);

      setFoundPath(res);
    } else {
      setFoundPath(undefined);
    }
  }, [startHex, endHex]);

  return (
    // <div style={{ background: COLORS.gray[4], padding: 8, paddingLeft: 8 }}>
    <HexGrid width={1800} height={1040} viewBox="-30 -30 1800 1040">
      <Layout
        size={{ x: 24, y: 24 }}
        flat={true}
        spacing={1.05}
        origin={{ x: 0, y: 0 }}
      >
        <>
          {hexGrid.nodes.map((hex) => {
            const isPath = foundPath?.find((x) => equals(x, hex)) !== undefined;
            const isReachable =
              reachable === undefined
                ? true
                : reachable?.find((x) => equals(x, hex)) !== undefined;

            return (
              <Hexagon
                key={getId(hex)}
                q={hex.q}
                r={hex.r}
                s={hex.s}
                cellStyle={{
                  ...cellStyle,
                  fill:
                    hex.terrain?.type === "Water"
                      ? COLORS.blue[5]
                      : hex.terrain?.type === "Mountain"
                      ? COLORS.green[3]
                      : hex.terrain?.type === "Street"
                      ? COLORS.gray[5]
                      : hex.terrain?.type === "Forrest"
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
                      ? 5
                      : isPath
                      ? 5
                      : 0,
                }}
                onClick={() => {
                  if (equals(startHex, hex)) {
                    setStartHex(undefined);
                  } else if (!hex.blocked) {
                    if (startHex === undefined) {
                      setStartHex(hex);
                    } else if (
                      startHex !== undefined &&
                      hex.unit === undefined
                    ) {
                      const startHexUnit = startHex.unit;
                      setHexGrid((x) => ({
                        ...x,
                        nodes: x.nodes.map((n) => {
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
                  {hex.terrain && <TerrainSvg type={hex.terrain.type} />}
                  {hex.unit && (
                    <UnitSvg
                      type={hex.unit.kind.type}
                      width="2.5%"
                      height="4%"
                      fill={GetUnitColor(hex.unit)}
                      stroke={GetUnitColor(hex.unit)}
                      x={-24}
                      y={-20}
                    />
                  )}
                </>
                {/* <Coordinates q={hex.q} r={hex.r} s={hex.s} /> */}
              </Hexagon>
            );
          })}
        </>
      </Layout>
    </HexGrid>
    // </div>
  );
}
