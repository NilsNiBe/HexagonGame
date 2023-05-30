import React from "react";
import { Coalition } from "../models/units/unit";

export type PlayerNumber = "Player1" | "Player2";
export type Mode = "Move" | "Attack";

export interface GameStateProps {
  player1: Player;
  player2: Player;
}

export interface Player {
  number: PlayerNumber;
  name: string;
  coalition: Coalition;
}

export interface Round {
  player: Player;
  mode: Mode;
  number: number;
}

export interface GameState {
  player1: Player;
  player2: Player;
  //   isMultipleDevice: boolean;
  round: Round;
}

export const useGame = (props: GameStateProps) => {
  const [game, setGame] = React.useState<GameState>({
    player1: props.player1,
    player2: props.player2,
    round: { player: props.player1, number: 1, mode: "Move" },
  });

  const nextTurn = () => {
    const isPlayer1Round = game.round.player.number === "Player1";

    setGame({
      ...game,
      round: {
        player: isPlayer1Round ? game.player2 : game.player1,
        number: isPlayer1Round ? game.round.number : game.round.number + 1,
        mode: isPlayer1Round
          ? game.round.mode === "Move"
            ? "Attack"
            : "Move"
          : game.round.mode,
      },
    });
  };

  const isAttackRound = () => game.round.mode === "Attack";
  const isMoveRound = () => game.round.mode === "Move";

  return { game, nextTurn, isAttackRound, isMoveRound };
};
