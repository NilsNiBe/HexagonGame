interface TopBarProps {
  toMainMenu: () => void;
}

export const TopBar = (props: TopBarProps) => {
  return <button onClick={() => props.toMainMenu()}>Main Menu</button>;
};
