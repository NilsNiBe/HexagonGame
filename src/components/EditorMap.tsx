import React from "react";
import "../App.css";
import {
  createSimpleHexagonNodeGrid,
  HexagonNodeGrid,
  tileMapToHexagonGrid,
} from "../models/hexagonNodeGrid";
import { HexNode } from "../models/hexNode";
import { PULSE } from "../models/maps/central/pulse";
import { getOrientation } from "../models/orientation";
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
import { LayoutDimension } from "./Layout";
import { Map } from "./Map";

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

  const size = 25;
  const layout: LayoutDimension = {
    size: { x: size, y: size },
    orientation: getOrientation("flat"),
    spacing: 1.02,
    origin: { x: 0, y: 0 },
  };

  const onHexClick = (hex: HexNode) => {
    if (selected === undefined) {
      if (hex.unit !== undefined) {
        setHexGrid(x => createHexGrid(x, hex, hex.terrain, undefined));
      }
    } else if (TERRAIN_TYPES.includes(selected as TerrainType)) {
      const terrain = GetTerrain(selected as TerrainType);
      if (hex.unit !== undefined) {
        if (!hex.unit.kind.terrains.includes(terrain.type)) {
          setHexGrid(x => createHexGrid(x, hex, terrain, undefined));
        } else {
          setHexGrid(x => createHexGrid(x, hex, terrain, hex.unit));
        }
      } else {
        setHexGrid(x => createHexGrid(x, hex, terrain, hex.unit));
      }
    } else if (UNIT_TYPES.includes(selected as UnitType)) {
      const unit = GetUnit(selected as UnitType);
      if (unit.terrains.includes(hex.terrain?.type ?? "Water")) {
        if (
          hex.unit?.kind === unit &&
          hex.unit.coalition === selectedCoalition
        ) {
          setHexGrid(x => createHexGrid(x, hex, hex.terrain, undefined));
        } else {
          setHexGrid(x =>
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
  };

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
            console.log(JSON.stringify(createSimpleHexagonNodeGrid(hexGrid)))
          }
        >
          Print Map to Console
        </button>
      </div>
      <Map
        hexSize={25}
        createGrid={() => tileMapToHexagonGrid(PULSE)}
        onClick={h => onHexClick(h as HexNode)}
      />
    </>
  );
}
