import { useState } from "react";

import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import Log from "./components/Log.jsx";
import GameOver from "./components/GameOver.jsx";

import {
  PLAYERS,
  deriveActivePlayer,
  deriveGameBoard,
  deriveWinner,
} from "./components/AppIniit.js";

function App() {
  const [players, setPlayerNames] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns);

  let gameBoard = deriveGameBoard(gameTurns);

  function handlePlayerChangeName(symbol, newName) {
    setPlayerNames((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    });
  }

  let winner = deriveWinner(gameBoard, players);

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      let currentPlayer = deriveActivePlayer(gameTurns);

      const updateTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];

      return updateTurns;
    });
  }

  let hasDraw = gameTurns.length === 9 && !winner;

  function handleRestartMatch() {
    setGameTurns([]);
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={PLAYERS.X}
            symbol="X"
            isActivePlayer={activePlayer === "X"}
            onChangeName={handlePlayerChangeName}
          />
          <Player
            initialName={PLAYERS.O}
            symbol="O"
            isActivePlayer={activePlayer === "O"}
            onChangeName={handlePlayerChangeName}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestartMatch={handleRestartMatch} />
        )}
        <GameBoard onSelectPlayer={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
