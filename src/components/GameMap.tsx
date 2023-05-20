import "../App.css";
import {
  HexagonNodeGrid,
  tileMapToHexagonGrid,
} from "../models/hexagonNodeGrid";
import { PULSE } from "../models/maps/central/pulse";
import { runAStar } from "../services/aStarService";
import { runDijkstra } from "../services/dijkstra";
import { distance } from "../services/hexService";
import "./terrain/Terrain.css";
import { Map } from "./Map";

export function GameMap() {
  const onHexClick = (
    index: number,
    grid: HexagonNodeGrid
  ): HexagonNodeGrid => {
    const hex = grid.nodes[index];
    // deselect unit
    if (hex.isSelected) {
      hex.isSelected = false;
      return {
        ...grid,
        nodes: grid.nodes.map((x) => ({
          ...x,
          isReachable: false,
          isPath: false,
          isSelected: false,
        })),
      };
    }
    // select unit
    if (!hex.blocked && hex.unit !== undefined) {
      // run dijkstra and set hex as selected
      const res = runDijkstra(
        grid.nodes,
        hex,
        (n) =>
          n.unit !== undefined && n.unit?.coalition !== hex.unit?.coalition
            ? Number.MAX_VALUE
            : n.weight,
        hex.unit.kind.speed
      );

      const reachable = res
        .filter(
          (x) =>
            x.cost < Number.MAX_VALUE &&
            x.node.unit?.coalition != hex.unit?.coalition &&
            !hex.blocked
        )
        .map((x) => x.node);

      return {
        ...grid,
        nodes: grid.nodes
          .map((x) =>
            reachable.find((r) => r.key === x.key) !== undefined
              ? { ...x, isReachable: true }
              : x
          )
          .map((x) => (hex.key === x.key ? { ...x, isSelected: true } : x)),
      };
    }
    // move unit
    const selectedHex = grid.nodes.find((x) => x.isSelected);
    if (
      selectedHex !== undefined &&
      hex.isReachable &&
      !hex.blocked &&
      hex.unit === undefined
    ) {
      return {
        ...grid,
        nodes: grid.nodes
          .map((x) =>
            x.isSelected
              ? { ...x, unit: undefined }
              : x.key === hex.key
              ? { ...x, unit: selectedHex.unit }
              : x
          )
          .map((x) => ({
            ...x,
            isReachable: false,
            isPath: false,
            isSelected: false,
          })),
      };
    }
    return grid;
  };

  function onHexHover(index: number, grid: HexagonNodeGrid): HexagonNodeGrid {
    const hex = grid.nodes[index];
    if (!hex.isReachable) {
      grid.nodes.forEach((x) => (x.isPath = false));
      return { ...grid };
    } else {
      grid.nodes.forEach((x) => (x.isPath = false));
      const selectedHex = grid.nodes.find((x) => x.isSelected);
      if (selectedHex !== undefined && selectedHex.unit !== undefined) {
        grid.nodes.forEach((x) => {
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
        return {
          ...grid,
          nodes: grid.nodes.map((x) =>
            path.find((p) => p.key === x.key) ? { ...x, isPath: true } : x
          ),
        };
      }
      return grid;
    }
  }

  return (
    <Map
      hexSize={50}
      createGrid={() => tileMapToHexagonGrid(PULSE)}
      onHexClick={onHexClick}
      onHexHover={onHexHover}
    />
  );
}
