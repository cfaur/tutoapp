import React, { useState, useEffect } from "react";
import Square from "./Square";
import StatusLabel from "./StatusLabel"
import { range, PointAttribution, getRandomInt } from "./Utils"
import { DefaultButton } from "office-ui-fabric-react";

interface IBoard {
    startNewGame: () => void
    addPoints: (pointsToAdd: number, attributedTo: PointAttribution) => void
}

const Board: React.FC<IBoard> = props => {    
    
    const initStatus: string = 'active';
    //Picks 1 or 2 randomly
    const firstPlayer: number = getRandomInt(1, 2);
    const initX: number[] = [];
    const initO: number[] = [];    

    const [gameStatus, setGameStatus] = useState(initStatus);
    const [currentPlayer, setCurrentPlayer] = useState(firstPlayer);

    const [XOwned, setXOwned] = useState(initX);
    const [OOwned, setOOwned] = useState(initO);
    
    useEffect(() => {
        if((XOwned.length + OOwned.length) > 0)
        {
            if(currentPlayer === 1 && !isGameDone(XOwned, OOwned.length))
            {
                setCurrentPlayer(2);
            }
            else if(!isGameDone(OOwned, XOwned.length))
            {
                setCurrentPlayer(1);
            }
        }
    }, [XOwned, OOwned])

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

    const isGameDone = (currentPlayerOwned: number[], nbOpponentOwned: number) => {
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
        
        const winningArray: boolean[] = lines.map(winningLine => { 
            return (winningLine.every(element => { 
                        return currentPlayerOwned.includes(element) }) ? true : false) 
            });

        if(winningArray.includes(true))
        {
            setGameStatus('won');
            props.addPoints(1, currentPlayer);
            return true;
        }

        // game is not won but we should check for tie        
        if(currentPlayerOwned.length + nbOpponentOwned === 9)
        {
            setGameStatus('tie');
            props.addPoints(1, PointAttribution.Tie);
            return true;
        }

        return false;
    }

    const handleSquareClick = (valClicked: number) => {
        (currentPlayer === 1) ? setXOwned(XOwned.concat(valClicked)) : setOOwned(OOwned.concat(valClicked));        
    }

    const renderSquare = (i: number) => {
        return <Square key={i} 
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
        <div style={{minWidth: 240}}>
            <StatusLabel playerName={getLetterForPlayer(currentPlayer)} gameStatus={gameStatus} />
            { range(0, 2).map(val => renderRow(val*3, (val*3)+2)) }  
            { gameStatus !== 'active' && <DefaultButton style={{margin: 25}} text = 'Play again' onClick={props.startNewGame} />  }         
        </div>        
    );
}

export default Board;