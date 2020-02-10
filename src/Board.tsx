import React, { useState } from "react";
import Square from "./Square";
import StatusLabel from "./StatusLabel"
import { range } from "./Utils"
import { DefaultButton } from "office-ui-fabric-react";

interface IBoard {
    startNewGame: () => void
}

const Board: React.FC<IBoard> = props => {    
    
    //Picks 1 or 2 randomly
    const firstPlayer: number = 1 + Math.floor(Math.random() * 2);
    const initX: number[] = [];
    const initO: number[] = [];
    const initStatus: string = 'active';

    const [currentPlayer, setCurrentPlayer] = useState(firstPlayer);
    const [XOwned, setXOwned] = useState(initX);
    const [OOwned, setOOwned] = useState(initO);
    const [gameStatus, setGameStatus] = useState(initStatus);

    const getLetterForPlayer = (id: number) => {
        return (id === 1 ? 'X': 'O');
    }

    const getOwner = (sqId: number) => {
        if(XOwned.includes(sqId))
        {
            return 1;
        }

        if(OOwned.includes(sqId))
        {
            return 2;
        }

        return 0;
    }

    const isGameDone = (currentPlayerOwned: number[], lastValClicked: number, nbOpponentOwned: number) => {
        const lines = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6],
        ];
        
        const currentlyOwned = currentPlayerOwned.concat(lastValClicked);
        const winningArray: boolean[] = lines.map(winningLine => { 
            return (winningLine.every(element => { 
                        return currentlyOwned.includes(element) }) ? true : false) 
            });

        if(winningArray.includes(true))
        {
            setGameStatus('won');
            return true;
        }

        // game is not won but we should check for tie        
        if(currentlyOwned.length + nbOpponentOwned === 9)
        {
            setGameStatus('tie');
            return true;
        }

        return false;
    }

    const handleSquareClick = (valClicked: number) => {
        if(currentPlayer === 1)
        {
            setXOwned(XOwned.concat(valClicked));
            if(!isGameDone(XOwned, valClicked, OOwned.length))
                setCurrentPlayer(2);
        }
        else if(currentPlayer === 2)
        {
            setOOwned(OOwned.concat(valClicked));
            if(!isGameDone(OOwned, valClicked, XOwned.length))
                setCurrentPlayer(1);
        }
    }

    const renderSquare = (i: number) => {
        return <Square 
            key={i} 
            value={i} 
            ownedBy={getOwner(i)} 
            currentPlayer={currentPlayer} 
            gameStatus={gameStatus}
            onClick={handleSquareClick}/>;
    }

    const renderRow = (start: number, end: number) => {
        return (
            <div key={start}>
                { range(start, end).map(val => renderSquare(val))}
             </div>
        );
    }

   return (        
        <div>
            <StatusLabel playerName={getLetterForPlayer(currentPlayer)} gameStatus={gameStatus} />
            { range(0, 2).map(val => renderRow(val*3, (val*3)+2)) }  
            { gameStatus !== 'active' && <DefaultButton style={{margin: 25}} text = 'Play again' onClick={props.startNewGame} />  }         
        </div>        
    );
}

export default Board;