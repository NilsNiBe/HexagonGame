import React from "react";
import { HexagonNodeGrid } from "../models/hexagonNodeGrid";
import Popup from "./Popup";

export interface AttackPopup {
  onClose: () => void;
  grid: HexagonNodeGrid;
}

export const AttackPopup = (props: AttackPopup) => {
  const [content, setContent] = React.useState<string | undefined>(undefined);

  const attacked = props.grid.nodes.filter(x => x.unit?.attacked !== undefined);
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const changeContent = async () => {
    for (let i = 0; i < attacked.length; i++) {
      if (i > 0) {
        await delay(2000);
      }
      setContent(attacked[i].key);
    }
  };

  React.useEffect(() => {
    changeContent();
  }, []);

  return (
    <Popup onClose={props.onClose}>
      <h2>Attack</h2>
      <p>{content}</p>
    </Popup>
  );
};
