import React from "react";
import "../App.css";
import { COLORS } from "../assets/colors";
import { createWaterHexagonGrid, HexagonNodeGrid } from "../models/HexagonGrid";
import { getId, HexNode } from "../models/HexNode";
import {
  GetTerrain,
  Terrain,
  TerrainType,
  TERRAIN_TYPES,
} from "../models/terrain/Terrain";
import { GetUnit, Unit, UnitType, UNIT_TYPES } from "../models/units/Unit";
import Hexagon from "./Hexagon";
import HexGrid from "./HexGrid";
import Layout from "./Layout";

export function EditorMap() {
  const [hexGrid, setHexGrid] = React.useState<HexagonNodeGrid>(
    createWaterHexagonGrid(15, 23)
    // new HexagonNodeGrid(47, 19)
  );

  const [selected, setSelected] = React.useState<
    TerrainType | UnitType | undefined
  >(undefined);

  const cellStyle = {
    // fill: COLORS.orange[0],
    // stroke: COLORS.orange[1],
    // strokeWidth: 0.0,
  };

  function createHexGrid(
    x: HexagonNodeGrid,
    hex: HexNode,
    terrain?: Terrain,
    unit?: Unit
  ): HexagonNodeGrid {
    return {
      ...x,
      nodes: x.nodes.map(x =>
        x === hex
          ? {
              ...x,
              terrain,
              unit,
            }
          : x
      ),
    };
  }

  return (
    <>
      <div>
        <div>
          {TERRAIN_TYPES.map(x => (
            <label>
              <input
                type="radio"
                key={x}
                id={x}
                value={x}
                checked={selected === x}
                onChange={e => setSelected(e.target.value as TerrainType)}
              />
              {x}
            </label>
          ))}
        </div>
        <div>
          {UNIT_TYPES.map(x => (
            <label>
              <input
                type="radio"
                key={x}
                id={x}
                value={x}
                checked={selected === x}
                onChange={e => setSelected(e.target.value as UnitType)}
              />
              {x}
            </label>
          ))}
          <label>
            <input
              type="radio"
              key="NoUnit"
              id="NoUnit"
              value={undefined}
              checked={selected === undefined}
              onChange={e => setSelected(undefined)}
            />
            No Unit
          </label>
        </div>
        {/* <text>{selected ? (selected as any) : ""}</text> */}
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
                  onClick={() => {
                    if (selected === undefined) {
                      if (hex.unit !== undefined) {
                        setHexGrid(x =>
                          createHexGrid(x, hex, hex.terrain, undefined)
                        );
                      }
                    } else if (
                      TERRAIN_TYPES.includes(selected as TerrainType)
                    ) {
                      const terrain = GetTerrain(selected as TerrainType);
                      if (hex.unit !== undefined) {
                        if (!hex.unit.terrains.includes(terrain.type)) {
                          setHexGrid(x =>
                            createHexGrid(x, hex, terrain, undefined)
                          );
                        } else {
                          setHexGrid(x =>
                            createHexGrid(x, hex, terrain, hex.unit)
                          );
                        }
                      } else {
                        setHexGrid(x =>
                          createHexGrid(x, hex, terrain, hex.unit)
                        );
                      }
                    } else if (UNIT_TYPES.includes(selected as UnitType)) {
                      const unit = GetUnit(selected as UnitType);
                      console.log(unit);
                      if (
                        unit.terrains.includes(hex.terrain?.type ?? "Water")
                      ) {
                        console.log(unit);

                        setHexGrid(x =>
                          createHexGrid(x, hex, hex.terrain, unit)
                        );
                      }
                    }
                  }}
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
