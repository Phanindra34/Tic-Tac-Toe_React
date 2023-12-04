import { WINNING_COMBINATIONS } from "../WINNING_COMBINATIONS.js";

export const PLAYERS = {
  X: "Player 1",
  O: "Player 2",
};

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export function deriveGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }
  return gameBoard;
}

export function deriveWinner(gameBoard, players) {
  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    let firstSquarName = gameBoard[combination[0].row][combination[0].column];
    let secondSquarName = gameBoard[combination[1].row][combination[1].column];
    let thirdSquarName = gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquarName &&
      firstSquarName === secondSquarName &&
      firstSquarName === thirdSquarName
    ) {
      winner = players[firstSquarName].toUpperCase();
    }
  }
  return winner;
}

export function deriveActivePlayer(turns) {
  let currentPlayer = "X";
  if (turns.length > 0 && turns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}
