import React from "react";
import { EditorMap } from "./EditorMap";
import { GameMap } from "./GameMap";
import { MainMenu } from "./MainMenu";
import { PeerConnector } from "./PeerConnector";
import { PeerVideoConnector } from "./PeerVideoConnector";

export type Page =
  | "main-menu"
  | "game"
  | "editor"
  | "host-peer"
  | "join-peer"
  | "host-video-peer"
  | "join-video-peer";

export const Game = () => {
  const [page, setPage] = React.useState<Page>("main-menu");
  switch (page) {
    case "main-menu":
      return <MainMenu toPage={setPage} />;
    case "game":
      return <GameMap toMainMenu={() => setPage("main-menu")} />;
    case "editor":
      return <EditorMap toMainMenu={() => setPage("main-menu")} />;
    case "host-peer":
      return (
        <PeerConnector toMainMenu={() => setPage("main-menu")} isHost={true} />
      );
    case "join-peer":
      return (
        <PeerConnector toMainMenu={() => setPage("main-menu")} isHost={false} />
      );
    case "host-video-peer":
      return (
        <PeerVideoConnector
          toMainMenu={() => setPage("main-menu")}
          isHost={true}
        />
      );
    case "join-video-peer":
      return (
        <PeerVideoConnector
          toMainMenu={() => setPage("main-menu")}
          isHost={false}
        />
      );

    default:
      return null;
  }
};
