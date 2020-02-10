import React, { useState } from "react";
import Board from "./Board";

interface IGame {

}

const Game: React.FC<IGame> = props => {

  const [gameId, setGameId] = useState(1);

  return (
      <div className="game">
        <div className="game-board">
          <div>
            <Board key={gameId} startNewGame={() => setGameId(gameId + 1)}/>
          </div>     
        </div>
      </div>
    );
}

export default Game;