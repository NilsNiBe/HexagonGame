import React from "react";
import { EditorMap } from "./EditorMap";
import { GameMap } from "./GameMap";
import { MainMenu } from "./MainMenu";

export type Page = "main-menu" | "game" | "editor";

export const Game = () => {
  const [page, setPage] = React.useState<Page>("main-menu");
  switch (page) {
    case "main-menu":
      return <MainMenu toPage={setPage} />;
    case "game":
      return <GameMap toMainMenu={() => setPage("main-menu")} />;
    case "editor":
      return <EditorMap toMainMenu={() => setPage("main-menu")} />;

    default:
      return null;
  }
};
