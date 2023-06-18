import { Round } from "../hooks/useGame";

interface TopBarProps {
  round?: Round;
  toMainMenu: () => void;
  onNextTurn?: () => void;
}

export const TopBar = (props: TopBarProps) => {
  return (
    <div
      style={{
        position: "sticky",
        backgroundColor: "white",
        width: "100%",
        padding: 5,
        top: 0,
      }}
    >
      <button onClick={props.toMainMenu}>Main Menu</button>
      {props.round && (
        <>
          <span style={{ margin: 5 }}>{props.round?.player.name}</span>
          <span style={{ margin: 5 }}>{props.round?.mode}</span>
        </>
      )}
      {props.onNextTurn && (
        <button onClick={props.onNextTurn}>Next Turn</button>
      )}
    </div>
  );
};
