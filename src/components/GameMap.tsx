import React from "react";
import "../App.css";
import { useGame } from "../hooks/useGame";
import {
  HexagonNodeGrid,
  tileMapToHexagonGrid,
} from "../models/hexagonNodeGrid";
import { HexNode } from "../models/hexNode";
import { PULSE } from "../models/maps/central/pulse";
import { getOrientationFromTo } from "../models/units/unit";
import { runAStar } from "../services/aStarService";
import { runDijkstra } from "../services/dijkstra";
import { distance } from "../services/hexService";
import { Map } from "./Map";
import "./terrain/Terrain.css";
import { TopBar } from "./TopBar";

export interface GameMapProps {
  toMainMenu: () => void;
}

export function GameMap(props: GameMapProps) {
  const { game, nextTurn } = useGame({
    player1: { coalition: "Central", name: "Spieler 1", number: "Player1" },
    player2: { coalition: "Entente", name: "Spieler 2", number: "Player2" },
  });

  const [hexGrid, setHexGrid] = React.useState<HexagonNodeGrid>(
    tileMapToHexagonGrid(PULSE)
  );

  const onHexClick = (
    index: number,
    grid: HexagonNodeGrid
  ): HexagonNodeGrid => {
    const hex = grid.nodes[index];
    if (game.round.mode === "Move") {
      if (
        hex.unit !== undefined &&
        hex.unit?.coalition !== game.round.player.coalition
      ) {
        return grid;
      }

      // deselect unit
      if (hex.isSelected) {
        hex.isSelected = false;
        return {
          ...grid,
          nodes: grid.nodes.map(x => ({
            ...x,
            isReachable: false,
            isPath: false,
            isSelected: false,
          })),
        };
      }
      const selectedHex = grid.nodes.find(x => x.isSelected);

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
          hex.unit.kind.speed
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

        return {
          ...grid,
          nodes: grid.nodes
            .map(x =>
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
            )
            .map(x => ({
              ...x,
              isReachable: false,
              isPath: false,
              isSelected: false,
            })),
        };
      }
    } else {
      // Attack
    }
    return grid;
  };

  function onHexEnter(index: number, grid: HexagonNodeGrid): HexagonNodeGrid {
    const hex = grid.nodes[index];

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
  }

  return (
    <div>
      <TopBar
        toMainMenu={props.toMainMenu}
        onNextTurn={() => {
          nextTurn();
          setHexGrid({
            ...hexGrid,
            nodes: hexGrid.nodes.map(x => ({
              ...x,
              unit:
                x.unit === undefined ? undefined : { ...x.unit, isDone: false },
            })),
          });
        }}
        round={game.round}
      />
      <Map
        grid={hexGrid}
        hexSize={50}
        onHexClick={onHexClick}
        onHexEnter={onHexEnter}
        setGrid={setHexGrid}
      />
    </div>
  );
}
