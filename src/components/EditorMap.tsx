import React from "react";
import "../App.css";
import {
  createSimpleHexagonNodeGrid,
  HexagonNodeGrid,
  tileMapToHexagonGrid,
} from "../models/hexagonNodeGrid";
import { HexNode } from "../models/hexNode";
import { PULSE } from "../models/maps/central/pulse";
import {
  GetTerrain,
  Terrain,
  TerrainType,
  TERRAIN_TYPES,
} from "../models/terrain/terrain";
import {
  Coalition,
  COALITIONS,
  GetUnit,
  Unit,
  UnitType,
  UNIT_TYPES,
} from "../models/units/unit";
import { Map } from "./Map";
import { TopBar } from "./TopBar";

function createHexGrid(
  x: HexagonNodeGrid,
  hex: HexNode,
  terrain: Terrain,
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

export interface EditorMapProps {
  toMainMenu: () => void;
}

export function EditorMap(props: EditorMapProps) {
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

  const onHexClick = (
    index: number,
    grid: HexagonNodeGrid
  ): HexagonNodeGrid => {
    const hex = grid.nodes[index];
    if (selected === undefined) {
      if (hex.unit !== undefined) {
        return createHexGrid(grid, hex, hex.terrain, undefined);
      }
    } else if (TERRAIN_TYPES.includes(selected as TerrainType)) {
      const terrain = GetTerrain(selected as TerrainType);
      if (hex.unit !== undefined) {
        if (!hex.unit.properties.terrains.includes(terrain.type)) {
          return createHexGrid(grid, hex, terrain, undefined);
        } else {
          return createHexGrid(grid, hex, terrain, hex.unit);
        }
      } else {
        return createHexGrid(grid, hex, terrain, hex.unit);
      }
    } else if (UNIT_TYPES.includes(selected as UnitType)) {
      const unit = GetUnit(selected as UnitType);
      if (unit.terrains.includes(hex.terrain?.type ?? "Water")) {
        if (
          hex.unit?.properties === unit &&
          hex.unit.coalition === selectedCoalition
        ) {
          return createHexGrid(grid, hex, hex.terrain, undefined);
        } else {
          return createHexGrid(grid, hex, hex.terrain, {
            coalition: selectedCoalition,
            properties: unit,
            experience: 0,
            health: unit.size,
            orientation: "North",
            isDone: false,
          });
        }
      }
    }
    return grid;
  };

  return (
    <>
      <TopBar toMainMenu={props.toMainMenu} />
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
        <div>
          {COALITIONS.map(x => (
            <label>
              <input
                type="radio"
                key={x}
                id={x}
                value={x}
                checked={selectedCoalition === x}
                onChange={e =>
                  setSelectedCoalition(e.target.value as Coalition)
                }
              />
              {x}
            </label>
          ))}
        </div>
        <button
          onClick={() =>
            navigator.clipboard.writeText(
              JSON.stringify(createSimpleHexagonNodeGrid(hexGrid).nodes)
            )
          }
        >
          Print Map to Console
        </button>
      </div>
      <Map
        hexSize={25}
        grid={hexGrid}
        setGrid={setHexGrid}
        onHexClick={onHexClick}
      />
    </>
  );
}
