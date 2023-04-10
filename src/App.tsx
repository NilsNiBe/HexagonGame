import React from "react";
import "./App.css";
import { COLORS } from "./assets/colors";
import Hexagon from "./components/Hexagon";
import HexGrid from "./components/HexGrid";
import Layout from "./components/Layout";
import { hexagonNodeGrid } from "./models/hexagonGrid";
import { hexNode } from "./models/hexNode";
import { aStar } from "./services/aStarService";
import HexService from "./services/HexService";

function App() {
  const [hexGrid, setHexGrid] = React.useState<hexagonNodeGrid>(
    new hexagonNodeGrid(47, 19, 30)
    //new hexagonNodeGrid(3, 3)
  );
  const [startHex, setStartHex] = React.useState<hexNode | undefined>(
    undefined
  );
  const [endHex, setEndHex] = React.useState<hexNode | undefined>(undefined);
  const [foundPath, setFoundPath] = React.useState<hexNode[] | undefined>(
    undefined
  );

  const cellStyle = {
    fill: COLORS.orange[0],
    stroke: COLORS.orange[1],
    strokeWidth: 0.0,
  };

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
        (a, b) => HexService.distance(a as hexNode, b as hexNode),
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
              {hexGrid.hexNodes.map(hex => (
                <Hexagon
                  key={hex.getId()}
                  q={hex.q}
                  r={hex.r}
                  s={hex.s}
                  cellStyle={{
                    ...cellStyle,
                    fill: HexService.equals(startHex, hex)
                      ? COLORS.green[3]
                      : HexService.equals(endHex, hex)
                      ? COLORS.red[3]
                      : foundPath?.find(x => HexService.equals(x, hex))
                      ? COLORS.blue[3]
                      : hex.blocked
                      ? COLORS.dark[1]
                      : cellStyle.fill,
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
              ))}
            </>
          </Layout>
        </HexGrid>
      </div>
    </div>
  );
}

export default App;
