import React from "react";
import "../App.css";
import { useGame } from "../hooks/useGame";
import {
  deselectUnit,
  HexagonNodeGrid,
  tileMapToHexagonGrid,
} from "../models/hexagonNodeGrid";
import { getHexKey } from "../models/hexagonTile";
import { HexNode } from "../models/hexNode";
import { PULSE2 } from "../models/maps/central/pulse";
import { getOrientationFromTo, Unit, UnitKind } from "../models/units/unit";
import { runAStar } from "../services/aStarService";
import { runDijkstra } from "../services/dijkstra";
import { distance, hexInRange } from "../services/hexService";
import { AttackPopup } from "./AttackPopup";
import { Map, MapRef } from "./Map";
import "./terrain/Terrain.css";
import { TopBar } from "./TopBar";

export interface GameMapProps {
  toMainMenu: () => void;
}

export function GameMap(props: GameMapProps) {
  const {
    round,
    nextTurn,
    isMoveRound,
    isAttackSelectionRound,
    isAttackingRound,
  } = useGame({
    mode: "OneAfterEachOther",
    player1: { coalition: "Central", name: "Spieler 1", number: "1" },
    player2: { coalition: "Entente", name: "Spieler 2", number: "2" },
  });

  const [hexGrid, setHexGrid] = React.useState<HexagonNodeGrid>(
    tileMapToHexagonGrid(PULSE2)
  );
  const [showAttackPopup, setShowAttackPopup] = React.useState(false);

  const mapRef = React.useRef<MapRef>(null);

  const onHexClick = (
    index: number,
    grid: HexagonNodeGrid
  ): HexagonNodeGrid => {
    const hex = grid.nodes[index];
    // deselect unit
    if (hex.isSelected) {
      return deselectUnit(grid);
    }

    const selectedHex = grid.nodes.find(x => x.isSelected);

    if (isMoveRound()) {
      // no action for enemy units
      if (
        hex.unit !== undefined &&
        hex.unit.coalition !== round.player.coalition
      ) {
        return grid;
      }

      // select unit
      if (
        selectedHex === undefined &&
        !hex.blocked &&
        hex.unit !== undefined &&
        !hex.unit.isDone
      ) {
        // run dijkstra and set hex as selected
        const res = runDijkstra(
          grid.nodes,
          hex,
          n =>
            n.unit !== undefined && n.unit?.coalition !== hex.unit?.coalition
              ? Number.MAX_VALUE
              : n.weight,
          hex.unit.properties.speed
        );

        const reachable = res
          .filter(
            x =>
              x.cost < Number.MAX_VALUE &&
              x.node.unit?.coalition != hex.unit?.coalition &&
              !hex.blocked
          )
          .map(x => x.node);

        return {
          ...grid,
          nodes: grid.nodes
            .map(x =>
              reachable.find(r => r.key === x.key) !== undefined
                ? { ...x, isReachable: true }
                : x
            )
            .map(x => (hex.key === x.key ? { ...x, isSelected: true } : x)),
        };
      }
      // move unit
      if (
        selectedHex !== undefined &&
        hex.isReachable &&
        !hex.blocked &&
        hex.unit === undefined
      ) {
        const path = runAStar(
          selectedHex,
          hex,
          (_, n) =>
            n.unit !== undefined &&
            n.unit?.coalition !== selectedHex.unit?.coalition
              ? Number.MAX_VALUE
              : n.weight,
          distance
        );

        return deselectUnit({
          ...grid,
          nodes: grid.nodes.map(x =>
            x.isSelected
              ? { ...x, unit: undefined }
              : x.key === hex.key
              ? {
                  ...x,
                  unit: {
                    ...selectedHex.unit!,
                    orientation: getOrientationFromTo(path[1], path[0]),
                    isDone: true,
                  },
                }
              : x
          ),
        });
      }
    }
    // Attack

    if (selectedHex === undefined) {
      // if unit not selected no action for enemy units
      if (
        hex.unit !== undefined &&
        hex.unit.coalition !== round.player.coalition
      ) {
        return grid;
      }

      // select unit
      if (
        selectedHex === undefined &&
        !hex.blocked &&
        hex.unit !== undefined &&
        !hex.unit.isDone
      ) {
        const reachable = reachableUnitsToAttack(grid, hex);

        return {
          ...grid,
          nodes: grid.nodes
            .map(x =>
              reachable.find(r => getHexKey(r) === x.key) !== undefined &&
              !x.blocked
                ? { ...x, isReachable: true }
                : x
            )
            .map(x => (hex.key === x.key ? { ...x, isSelected: true } : x)),
        };
      }
    } else {
      // hex is selected
      const reachable = reachableUnitsToAttack(grid, selectedHex);
      if (reachable.find(x => x.key === hex.key) !== undefined) {
        return deselectUnit({
          ...grid,
          nodes: grid.nodes.map(x => ({
            ...x,
            unit:
              selectedHex.key === x.key
                ? x.unit === undefined
                  ? undefined
                  : { ...x.unit, isDone: true, attacked: hex }
                : x.unit,
          })),
        });
      }
    }

    return grid;
  };

  function reachableUnitsToAttack(
    grid: HexagonNodeGrid,
    hex: HexNode
  ): HexNode[] {
    const reachableUnits = (hex: HexNode, kind: UnitKind): HexNode[] => {
      const range = (unit: Unit | undefined, kind: UnitKind) => {
        if (unit === undefined) return 0;
        return kind === "ground"
          ? unit.properties.ground.range
          : kind === "air"
          ? unit.properties.air.range
          : kind === "water"
          ? unit.properties.water.range
          : 0;
      };

      return grid.nodes.filter(
        x =>
          x.unit !== undefined &&
          x !== hex &&
          x.unit.coalition !== round.player.coalition &&
          x.unit.properties.kind === kind &&
          hexInRange(hex, range(hex.unit, kind)).find(
            r => getHexKey(r) === x.key
          ) !== undefined
      );
    };

    const reachable = reachableUnits(hex, "ground")
      .concat(reachableUnits(hex, "air"))
      .concat(reachableUnits(hex, "water"));
    return reachable;
  }

  function onHexEnter(index: number, grid: HexagonNodeGrid): HexagonNodeGrid {
    const hex = grid.nodes[index];

    if (round.mode === "Move") {
      const calcNodes = (): HexNode[] => {
        if (!hex.isReachable) {
          return grid.nodes.map(x => ({ ...x, isPath: false }));
        } else {
          const selectedHex = grid.nodes.find(x => x.isSelected);
          if (selectedHex !== undefined && selectedHex.unit !== undefined) {
            grid.nodes.forEach(x => {
              x.f = 0;
              x.g = 0;
              x.h = undefined;
              x.predecessor = undefined;
            });

            const path = runAStar(
              selectedHex,
              hex,
              (_, n) =>
                n.unit !== undefined &&
                n.unit?.coalition !== selectedHex.unit?.coalition
                  ? Number.MAX_VALUE
                  : n.weight,
              distance
            );
            return grid.nodes.map(x => ({
              ...x,
              isPath: path.find(p => p.key === x.key) !== undefined,
            }));
          }
          return { ...grid.nodes };
        }
      };

      return {
        ...grid,
        nodes: calcNodes().map(x => ({ ...x, isMouseOver: x.key === hex.key })),
      };
    } else {
      // Attack
      return {
        ...grid,
        nodes: grid.nodes.map(x => ({ ...x, isMouseOver: x.key === hex.key })),
      };
    }
  }

  function runAttack() {
    if (isAttackSelectionRound()) {
      handleScrollToItem();
      setShowAttackPopup(true);
    }
  }

  function OnNextTurn() {
    nextTurn();
    if (isMoveRound() || isAttackingRound()) {
      resetGrid();
    }
  }

  const handleScrollToItem = () => {
    document
      .getElementById("q:3,r:-1")
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  function nextTurnAndResetGrid() {
    nextTurn();
    setHexGrid({
      ...hexGrid,
      nodes: hexGrid.nodes.map(x => ({
        ...x,
        unit:
          x.unit === undefined
            ? undefined
            : { ...x.unit, isDone: false, attacked: undefined },
      })),
    });
  }

  function resetGrid() {
    setHexGrid({
      ...hexGrid,
      nodes: hexGrid.nodes.map(x => ({
        ...x,
        unit:
          x.unit === undefined
            ? undefined
            : { ...x.unit, isDone: false, attacked: undefined },
      })),
    });
  }

  return (
    <div>
      <TopBar
        toMainMenu={props.toMainMenu}
        onNextTurn={OnNextTurn}
        round={round}
      />
      <Map
        grid={hexGrid}
        ref={mapRef}
        hexSize={50}
        onHexClick={onHexClick}
        onHexEnter={onHexEnter}
        setGrid={setHexGrid}
      />
      {isAttackingRound() && (
        <AttackPopup
          onClose={() => {
            setShowAttackPopup(false);
            nextTurnAndResetGrid();
          }}
          grid={hexGrid}
        />
      )}
    </div>
  );
}
