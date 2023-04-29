import React from "react";
import { EditorMap } from "./EditorMap";
import { GameMap } from "./GameMap";
import { MainMenu } from "./MainMenu";
import { TopBar } from "./TopBar";

export type Page = "main-menu" | "game" | "editor";

export const Game = () => {
  const [page, setPage] = React.useState<Page>("main-menu");
  switch (page) {
    case "main-menu":
      return <MainMenu toPage={setPage} />;
    case "game":
      return (
        <div>
          <TopBar toMainMenu={() => setPage("main-menu")} />
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
