import React from "react";
import "./App.css";
import { COLORS } from "./assets/colors";
import Hexagon from "./components/Hexagon";
import HexGrid from "./components/HexGrid";
import Layout from "./components/Layout";
import { HexagonNodeGrid } from "./models/HexagonGrid";
import { HexNode } from "./models/HexNode";
import { runAStar } from "./services/aStarService";
import { runDijkstra } from "./services/Dijkstra";
import { distance, equals } from "./services/HexService";

function App() {
  const [hexGrid, setHexGrid] = React.useState<HexagonNodeGrid>(
    new HexagonNodeGrid(47, 19, 30)
  );
  const [startHex, setStartHex] = React.useState<HexNode | undefined>(
    undefined
  );
  const [endHex, setEndHex] = React.useState<HexNode | undefined>(undefined);
  const [foundPath, setFoundPath] = React.useState<HexNode[] | undefined>(
    undefined
  );

  const [reachable, setReachable] = React.useState<HexNode[] | undefined>(
    undefined
  );

  const cellStyle = {
    // fill: COLORS.orange[0],
    // stroke: COLORS.orange[1],
    // strokeWidth: 0.0,
  };

  React.useEffect(() => {
    if (startHex != undefined) {
      const res = runDijkstra(hexGrid.hexNodes, startHex, 10);

      const reachable = res
        .filter(x => x.cost < Number.MAX_VALUE)
        .map(x => x.node);

      setReachable(reachable);
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

      const res = runAStar(startHex, endHex, (c, n) => n.weight ?? 1, distance);

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
                  foundPath?.find(x => equals(x, hex)) !== undefined;
                const isReachable =
                  reachable === undefined
                    ? true
                    : reachable?.find(x => equals(x, hex)) !== undefined;

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
                      stroke: equals(startHex, hex)
                        ? COLORS.dark[9]
                        : isPath
                        ? COLORS.blue[9]
                        : undefined,
                      opacity: isReachable ? 1 : 0.4,
                      strokeWidth:
                        hex.blocked || hex.weight === Number.MAX_VALUE
                          ? 0
                          : equals(startHex, hex)
                          ? 5
                          : isPath
                          ? 5
                          : 0,
                    }}
                    onClick={() => {
                      if (equals(startHex, hex)) {
                        setStartHex(undefined);
                      } else if (!hex.blocked) {
                        setStartHex(hex);
                      }
                    }}
                    onMouseEnter={() => {
                      if (hex.blocked || hex.weight === Number.MAX_VALUE) {
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
