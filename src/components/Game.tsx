import React from "react";
import { EditorMap } from "./EditorMap";
import { GameMap } from "./GameMap";
import { MainMenu } from "./MainMenu";
import { TopBar } from "./TopBar";
import { useGame } from "../hooks/useGame";

export type Page = "main-menu" | "game" | "editor";

export const Game = () => {
  const [page, setPage] = React.useState<Page>("main-menu");
  const { game, nextTurn } = useGame({
    player1: { coalition: "Central", name: "Spieler 1", number: "Player1" },
    player2: { coalition: "Entente", name: "Spieler 2", number: "Player2" },
  });
  switch (page) {
    case "main-menu":
      return <MainMenu toPage={setPage} />;
    case "game":
      return (
        <div>
          <TopBar
            toMainMenu={() => setPage("main-menu")}
            onNextTurn={nextTurn}
            round={game.round}
          />
          <GameMap />
        </div>
      );
    case "editor":
      return (
        <div>
          <TopBar toMainMenu={() => setPage("main-menu")} />
          <EditorMap />
        </div>
      );
    default:
      return null;
  }
};
