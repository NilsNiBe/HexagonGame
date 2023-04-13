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
        maxCost: 10,
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
                  reachable === undefined
                    ? true
                    : reachable?.find(x => HexService.equals(x, hex)) !==
                      undefined;

                return (
                  <Hexagon
                    key={hex.getId()}
                    q={hex.q}
                    r={hex.r}
                    s={hex.s}
                    cellStyle={{
                      ...cellStyle,
                      fill:
                        hex.terrain?.type === "Water"
                          ? COLORS.blue[5]
                          : hex.terrain?.type === "Mountain"
                          ? COLORS.gray[3]
                          : hex.terrain?.type === "Street"
                          ? COLORS.gray[5]
                          : hex.terrain?.type === "Forrest"
                          ? COLORS.green[2]
                          : hex.terrain?.type === "Plains"
                          ? COLORS.green[5]
                          : COLORS.dark[9],
                      stroke: HexService.equals(startHex, hex)
                        ? COLORS.dark[9]
                        : isPath
                        ? COLORS.blue[9]
                        : undefined,
                      opacity: isReachable ? 1 : 0.4,
                      strokeWidth:
                        hex.blocked || hex.movementCost === Number.MAX_VALUE
                          ? 0
                          : HexService.equals(startHex, hex)
                          ? 5
                          : isPath
                          ? 5
                          : 0,
                    }}
                    onClick={() => {
                      if (HexService.equals(startHex, hex)) {
                        setStartHex(undefined);
                      } else if (!hex.blocked) {
                        setStartHex(hex);
                      }
                    }}
                    onMouseEnter={() => {
                      if (
                        hex.blocked ||
                        hex.movementCost === Number.MAX_VALUE
                      ) {
                        setEndHex(undefined);
                      } else {
                        setEndHex(hex);
                      }
                    }}
                  >
                    <>
                      {hex.terrain && (
                        <image
                          width="2.5%"
                          height="5%"
                          x={-23}
                          y={-20}
                          preserveAspectRatio="none"
                          href={hex.terrain.image ?? undefined}
                        />
                      )}
                      {hex.unit && (
                        <image
                          width="2.5%"
                          height="5%"
                          x={-20}
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
      </div>
    </div>
  );
}

export default App;
