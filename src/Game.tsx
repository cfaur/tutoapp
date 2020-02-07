import React from "react";
import Board  from "./Board"

interface IGame {

}

const Game: React.FC<IGame> = props => {

    return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
}

export default Game;