import React from "react";
import "./App.css";
import { EditorMap } from "./components/EditorMap";
import { GameMap } from "./components/GameMap";

type page = "game" | "editor";

function App() {
  const [page, setPage] = React.useState<page>("editor");

  return (
    <div className="App">
      <div style={{}}>
        <input
          type="radio"
          id="editor"
          value="editor"
          checked={page === "editor"}
          onChange={e => setPage(e.target.value as page)}
        />{" "}
        Editor
        <input
          type="radio"
          id="game"
          value="game"
          checked={page === "game"}
          onChange={e => setPage(e.target.value as page)}
        />{" "}
        Game
      </div>
      {page === "editor" ? <EditorMap /> : <GameMap />}
    </div>
  );
}

export default App;
