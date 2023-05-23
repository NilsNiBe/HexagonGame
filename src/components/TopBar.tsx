import { Mode, Player, Round } from "../hooks/useGame";

interface TopBarProps {
  round?: Round;
  toMainMenu: () => void;
  onNextTurn?: () => void;
}

export const TopBar = (props: TopBarProps) => {
  return (
    <div>
      <button onClick={props.toMainMenu}>Main Menu</button>
      {props.round && (
        <>
          <text style={{ margin: 5 }}>{props.round?.player.name}</text>
          <text style={{ margin: 5 }}>{props.round?.mode}</text>
        </>
      )}
      {props.onNextTurn && (
        <button onClick={props.onNextTurn}>Next Turn</button>
      )}
    </div>
  );
};
