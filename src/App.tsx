import React from "react";
import "./App.css";
import { COLORS } from "./assets/colors";
import Hexagon from "./components/Hexagon";
import HexGrid from "./components/HexGrid";
import Layout from "./components/Layout";
import { hexagonNodeGrid } from "./models/hexagonGrid";
import { hexNode } from "./models/hexNode";
import { aStar } from "./services/aStarService";
import { DijkstraProps, runDijkstra } from "./services/Dijkstra";
import HexService from "./services/HexService";

function App() {
  const [hexGrid, setHexGrid] = React.useState<hexagonNodeGrid>(
    new hexagonNodeGrid(47, 19, 30)
  );
  const [startHex, setStartHex] = React.useState<hexNode | undefined>(
    undefined
  );
  const [endHex, setEndHex] = React.useState<hexNode | undefined>(undefined);
  const [foundPath, setFoundPath] = React.useState<hexNode[] | undefined>(
    undefined
  );

  const [reachable, setReachable] = React.useState<hexNode[] | undefined>(
    undefined
  );

  const cellStyle = {
    // fill: COLORS.orange[0],
    // stroke: COLORS.orange[1],
    // strokeWidth: 0.0,
  };

  React.useEffect(() => {
    if (startHex != undefined) {
      const graph: DijkstraProps = {
        startindex: hexGrid.hexNodes.indexOf(startHex),
        graph: hexGrid.hexNodes.map(x => ({
          neighborIndexes: x.neighborIndexes,
          weight: x.blocked
            ? Number.MAX_VALUE
            : x.movementCost ?? Number.MAX_VALUE,
          id: x.getId(),
        })),
        maxCost: 12,
      };

      const res = runDijkstra(graph);
      const found: hexNode[] = [];
      res
        .filter(x => x.cost < Number.MAX_VALUE)
        .forEach(x => {
          const foo = hexGrid.hexNodes.find(h => h.getId() === x.id)!;
          found.push(foo);
        });
      setReachable(found);
    } else {
      setReachable(undefined);
    }
  }, [startHex]);

  React.useEffect(() => {
    if (startHex !== undefined && endHex !== undefined) {
      hexGrid.hexNodes.forEach(x => {
        x.f = 0;
        x.g = 0;
        x.h = undefined;
        x.predecessor = undefined;
      });

      const aStarAlg = new aStar(
        startHex,
        endHex,
        (c, n) => (n as hexNode).movementCost ?? 1,
        (a, b) => HexService.distance(a as hexNode, b as hexNode)
      );
      const res = aStarAlg.run() as hexNode[];
      setFoundPath(res);
    } else {
      setFoundPath(undefined);
    }
  }, [startHex, endHex]);

  return (
    <div className="App">
      <div style={{ background: COLORS.gray[4], padding: 8, paddingLeft: 8 }}>
        {/* <h2 style={{ color: COLORS.dark[8] }}>Coordinates</h2> */}
        <HexGrid width={1800} height={870} viewBox="-30 -30 1800 870">
          <Layout
            size={{ x: 24, y: 24 }}
            flat={true}
            spacing={1.05}
            origin={{ x: 0, y: 0 }}
          >
            <>
              {hexGrid.hexNodes.map(hex => {
                const isPath =
                  foundPath?.find(x => HexService.equals(x, hex)) !== undefined;
                const isReachable =
                  reachable?.find(x => HexService.equals(x, hex)) !== undefined;
                return (
                  <Hexagon
                    key={hex.getId()}
                    q={hex.q}
                    r={hex.r}
                    s={hex.s}
                    cellStyle={{
                      ...cellStyle,
                      fill: HexService.equals(startHex, hex)
                        ? COLORS.green[9]
                        : HexService.equals(endHex, hex)
                        ? COLORS.red[9]
                        : hex.terrainType === "Water"
                        ? COLORS.blue[6]
                        : hex.terrainType === "Mountain"
                        ? COLORS.gray[3]
                        : hex.terrainType === "Hills"
                        ? COLORS.orange[3]
                        : hex.terrainType === "RiverPlains"
                        ? COLORS.green[2]
                        : hex.terrainType === "Plains"
                        ? COLORS.green[5]
                        : COLORS.dark[9],
                      stroke: isPath ? COLORS.blue[9] : undefined,
                      opacity: isReachable ? 1 : 0.3,
                      strokeWidth: isPath ? 2 : 0,
                    }}
                    onClick={() => {
                      if (HexService.equals(startHex, hex)) {
                        setStartHex(undefined);
                      } else if (
                        !hex.blocked &&
                        startHex === undefined &&
                        !HexService.equals(endHex, hex)
                      ) {
                        setStartHex(hex);
                      } else if (HexService.equals(endHex, hex)) {
                        setEndHex(undefined);
                      } else if (
                        !hex.blocked &&
                        endHex === undefined &&
                        !HexService.equals(startHex, hex)
                      ) {
                        setEndHex(hex);
                      }
                    }}
                    // onCtrlMouseClick={() => {
                    //   // setHexGrid(grid => ({
                    //   //   ...grid,
                    //   //   hexagons: grid.hexNodes.map(x => {
                    //   //     return x.getId() === hex.getId()
                    //   //       ? new hexagon(x.q, x.r, x.s, !x.blocked)
                    //   //       : x;
                    //   //   }) as hexagon[],
                    //   // }));
                    // }}
                  >
                    {/* <Coordinates q={hex.q} r={hex.r} s={hex.s} /> */}
                  </Hexagon>
                );
              })}
            </>
          </Layout>
        </HexGrid>
      </div>
    </div>
  );
}

export default App;
