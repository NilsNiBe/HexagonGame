import React from "react";
import "../App.css";
import { COLORS } from "../assets/colors";
import { createWaterHexagonGrid, HexagonNodeGrid } from "../models/HexagonGrid";
import { getId } from "../models/HexNode";
import { Terrain, TERRAIN_TYPES } from "../models/terrain/Terrain";
import { Unit, UNIT_TYPES } from "../models/units/Unit";
import Hexagon from "./Hexagon";
import HexGrid from "./HexGrid";
import Layout from "./Layout";

export function EditorMap() {
  const [hexGrid, setHexGrid] = React.useState<HexagonNodeGrid>(
    createWaterHexagonGrid(15, 23)
    // new HexagonNodeGrid(47, 19)
  );

  const [selected, setSelected] = React.useState<Terrain | Unit | undefined>(
    undefined
  );

  const cellStyle = {
    // fill: COLORS.orange[0],
    // stroke: COLORS.orange[1],
    // strokeWidth: 0.0,
  };

  return (
    <>
      <div>
        <text>{selected ? (selected as any) : ""}</text>
        <select
          name="terrains"
          id="terrains"
          onChange={e => setSelected(e.target.value as any)}
        >
          {TERRAIN_TYPES.map(x => (
            <option value={x}>{`Terrain: ${x}`}</option>
          ))}
          {UNIT_TYPES.map(x => (
            <option value={x}>{`Einheit: ${x}`}</option>
          ))}
        </select>
      </div>
      <HexGrid width={1800} height={1040} viewBox="-30 -30 1800 1040">
        <Layout
          size={{ x: 24, y: 24 }}
          flat={true}
          spacing={1.05}
          origin={{ x: 0, y: 0 }}
        >
          <>
            {hexGrid.nodes.map(hex => {
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
                        ? COLORS.green[6]
                        : COLORS.dark[9],
                  }}
                  onClick={() => {}}
                  onMouseEnter={() => {}}
                >
                  <>
                    {hex.terrain && (
                      <image
                        width="2.6%"
                        height="3.8%"
                        x={-24}
                        y={-20}
                        preserveAspectRatio="none"
                        href={hex.terrain.image ?? undefined}
                      />
                    )}
                    {hex.unit && (
                      <image
                        width="2.5%"
                        height="4%"
                        x={-24}
                        y={-20}
                        preserveAspectRatio="none"
                        href={hex.unit.image ?? undefined}
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
    </>
  );
}
