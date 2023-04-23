import React from "react";
import "../App.css";
import { COLORS } from "../assets/colors";
import {
  createSimpleHexagonNodeGrid,
  HexagonNodeGrid,
  tileMapToHexagonGrid,
} from "../models/hexagonNodeGrid";
import { getId, HexNode } from "../models/hexNode";
import { PULSE } from "../models/maps/central/pulse";
import {
  GetTerrain,
  Terrain,
  TerrainType,
  TERRAIN_TYPES,
} from "../models/terrain/terrain";
import {
  GetUnit,
  UnitKind,
  UnitType,
  UNIT_TYPES,
  createUnit,
  GetUnitColor,
  COALITIONS,
  Unit,
  Coalition,
} from "../models/units/unit";
import Hexagon from "./Hexagon";
import HexGrid from "./HexGrid";
import Layout from "./Layout";
import { UnitSvg } from "./UnitSvg";
import { TerrainSvg } from "./TerrainSvg";

function createHexGrid(
  x: HexagonNodeGrid,
  hex: HexNode,
  terrain: Terrain,
  unit?: Unit
): HexagonNodeGrid {
  return {
    ...x,
    nodes: x.nodes.map((x) =>
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

export function EditorMap() {
  const [hexGrid, setHexGrid] = React.useState<HexagonNodeGrid>(
    tileMapToHexagonGrid(PULSE)
    // createHexagonGrid(15, 23, Plains)
    // new HexagonNodeGrid(47, 19)
  );

  const [selected, setSelected] = React.useState<
    TerrainType | UnitType | undefined
  >(undefined);
  const [selectedCoalition, setSelectedCoalition] =
    React.useState<Coalition>("Central");

  const cellStyle = {
    // fill: COLORS.orange[0],
    // stroke: COLORS.orange[1],
    // strokeWidth: 0.0,
  };

  return (
    <>
      <div>
        <div>
          {TERRAIN_TYPES.map((x) => (
            <label>
              <input
                type="radio"
                key={x}
                id={x}
                value={x}
                checked={selected === x}
                onChange={(e) => setSelected(e.target.value as TerrainType)}
              />
              {x}
            </label>
          ))}
        </div>
        <div>
          {UNIT_TYPES.map((x) => (
            <label>
              <input
                type="radio"
                key={x}
                id={x}
                value={x}
                checked={selected === x}
                onChange={(e) => setSelected(e.target.value as UnitType)}
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
              onChange={(e) => setSelected(undefined)}
            />
            No Unit
          </label>
        </div>
        <div>
          {COALITIONS.map((x) => (
            <label>
              <input
                type="radio"
                key={x}
                id={x}
                value={x}
                checked={selectedCoalition === x}
                onChange={(e) =>
                  setSelectedCoalition(e.target.value as Coalition)
                }
              />
              {x}
            </label>
          ))}
        </div>
        <button
          onClick={() =>
            console.log(JSON.stringify(createSimpleHexagonNodeGrid(hexGrid)))
          }
        >
          Print Map to Console
        </button>
      </div>
      <HexGrid width={1800} height={1040} viewBox="-30 -30 1800 1040">
        <Layout
          size={{ x: 24, y: 24 }}
          flat={true}
          spacing={1.05}
          origin={{ x: 0, y: 0 }}
        >
          <>
            {hexGrid.nodes.map((hex) => {
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
                  }}
                  onClick={() => {
                    if (selected === undefined) {
                      if (hex.unit !== undefined) {
                        setHexGrid((x) =>
                          createHexGrid(x, hex, hex.terrain, undefined)
                        );
                      }
                    } else if (
                      TERRAIN_TYPES.includes(selected as TerrainType)
                    ) {
                      const terrain = GetTerrain(selected as TerrainType);
                      if (hex.unit !== undefined) {
                        if (!hex.unit.kind.terrains.includes(terrain.type)) {
                          setHexGrid((x) =>
                            createHexGrid(x, hex, terrain, undefined)
                          );
                        } else {
                          setHexGrid((x) =>
                            createHexGrid(x, hex, terrain, hex.unit)
                          );
                        }
                      } else {
                        setHexGrid((x) =>
                          createHexGrid(x, hex, terrain, hex.unit)
                        );
                      }
                    } else if (UNIT_TYPES.includes(selected as UnitType)) {
                      const unit = GetUnit(selected as UnitType);
                      if (
                        unit.terrains.includes(hex.terrain?.type ?? "Water")
                      ) {
                        if (
                          hex.unit?.kind === unit &&
                          hex.unit.coalition === selectedCoalition
                        ) {
                          setHexGrid((x) =>
                            createHexGrid(x, hex, hex.terrain, undefined)
                          );
                        } else {
                          setHexGrid((x) =>
                            createHexGrid(x, hex, hex.terrain, {
                              coalition: selectedCoalition,
                              kind: unit,
                              experience: 0,
                              health: unit.size,
                            })
                          );
                        }
                      }
                    }
                  }}
                >
                  <>
                    {hex.terrain && (
                      <TerrainSvg
                        key={"terrain" + getId(hex)}
                        id={"terrain" + getId(hex)}
                        type={hex.terrain.type}
                        width="2.6%"
                        height="3.8%"
                        x={-24}
                        y={-20}
                      />
                    )}
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
                </Hexagon>
              );
            })}
          </>
        </Layout>
      </HexGrid>
    </>
  );
}
