import React from "react";
import "./App.css";
import { EditorMap } from "./components/EditorMap";
import { GameMap } from "./components/GameMap";
import { MainMenu } from "./components/MainMenu";
import { Game } from "./components/Game";

function App() {
  return (
    <div className="App">
      <Game />
      {/* <div>
        <label>
          <input
            type="radio"
            id="editor"
            value="editor"
            checked={page === "editor"}
            onChange={e => setPage(e.target.value as page)}
          />
          Editor
        </label>
        <label>
          <input
            type="radio"
            id="game"
            value="game"
            checked={page === "game"}
            onChange={e => setPage(e.target.value as page)}
          />
          Game
        </label>
      </div>
      {page === "editor" ? <EditorMap /> : <GameMap />} */}
    </div>
  );
}

export default App;
