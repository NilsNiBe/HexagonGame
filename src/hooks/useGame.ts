import React from "react";
import { Coalition } from "../models/units/unit";

export type GameMode = "OneAfterEachOther" | "Simultaneous";
export type PlayerNumber = "1" | "2";
export type Mode = "Move" | "AttackSelection" | "Attacking";
type PlayerMode =
  | "1-Move"
  | "1-AttackSelection"
  | "1-Attacking"
  | "2-Move"
  | "2-AttackSelection"
  | "2-Attacking";

export interface GameStateProps {
  mode: GameMode;
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
  mode: GameMode;
  player1: Player;
  player2: Player;
  //   isMultipleDevice: boolean;
  round: Round;
}

export const useGame = (props: GameStateProps) => {
  const [{ mode, player1, player2, round }, setGame] =
    React.useState<GameState>({
      mode: props.mode,
      player1: props.player1,
      player2: props.player2,
      round: { player: props.player1, number: 1, mode: "Move" },
    });

  const getPlayer = (number: PlayerNumber) =>
    number === "1" ? player1 : player2;

  function nextTurnOneAfterTheOther(): Round {
    const playerMode = `${round.player.number}-${round.mode}` as PlayerMode;
    switch (playerMode) {
      case "1-Move":
        return {
          player: getPlayer("2"),
          mode: "AttackSelection",
          number: round.number,
        };
      case "2-AttackSelection":
        return {
          player: getPlayer("2"),
          mode: "Attacking",
          number: round.number,
        };
      case "2-Attacking":
        return {
          player: getPlayer("1"),
          mode: "AttackSelection",
          number: round.number,
        };
      case "1-AttackSelection":
        return { player: getPlayer("2"), mode: "Move", number: round.number };
      case "2-Move":
        return {
          player: getPlayer("1"),
          mode: "Attacking",
          number: round.number,
        };
      case "1-Attacking":
        return {
          player: getPlayer("1"),
          mode: "Move",
          number: round.number + 1,
        };
    }
  }

  function nextTurnSimultaneous(): Round {
    return round;
  }

  function nextTurn() {
    setGame({
      mode,
      player1,
      player2,
      round:
        mode === "OneAfterEachOther"
          ? nextTurnOneAfterTheOther()
          : nextTurnSimultaneous(),
    });
  }

  const isMoveRound = () => round.mode === "Move";
  const isAttackSelectionRound = () => round.mode === "AttackSelection";
  const isAttackingRound = () => round.mode === "Attacking";

  return {
    player1,
    player2,
    round,
    nextTurn,
    isMoveRound,
    isAttackSelectionRound,
    isAttackingRound,
  };
};
