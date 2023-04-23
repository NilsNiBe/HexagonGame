import { Page } from "./Game";
import "./MainMenu.css";
interface MainMenuProps {
  toPage: (page: Page) => void;
}

export const MainMenu = (props: MainMenuProps) => {
  return (
    <nav className="main-menu">
      <div className="main-menu-buttons">
        <button
          className="main-menu-button"
          onClick={() => props.toPage("game")}
        >
          New Game
        </button>
        <button
          className="main-menu-button"
          onClick={() => props.toPage("editor")}
        >
          Editor
        </button>
      </div>
    </nav>
  );
};
