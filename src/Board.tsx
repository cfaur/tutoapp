import React, { useState } from "react";
import Square from "./Square";
import { Label } from "office-ui-fabric-react";
import { range } from "./Utils"

interface IBoard {

}

const Board: React.FC<IBoard> = props => {
    
    const firstPlayer: number = 1;
    const initX: number[] = [];
    const initO: number[] = [];

    const [XOwned, setXOwned] = useState(initX);
    const [OOwned, setOOwned] = useState(initO);
    const [currentPlayer, setCurrentPlayer] = useState(firstPlayer);

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

    const handleClick= (valClicked: number) => {
        console.log(`Button ${valClicked} was clicked`);
        if(currentPlayer === 1)
        {
            setXOwned(XOwned.concat(valClicked));
            setCurrentPlayer(2);
        }
        else if(currentPlayer === 2)
        {
            setOOwned(OOwned.concat(valClicked));
            setCurrentPlayer(1);
        }
    }

    const renderSquare = (i: number) => {
        return <Square key={i} value={i} ownedBy={getOwner(i)} onClick={handleClick}/>;
    }

    const renderRow = (start: number, end: number) => {
        return (
            <div key={start}>
                { range(start, end).map(val => renderSquare(val))}
             </div>
        );
    }

    const status = `Next player: ${currentPlayer === 1 ? 'X': 'O' }`;

    return (
        <div>
            <Label>{status}</Label>
            { range(0, 2).map(val => renderRow(val*3, (val*3)+2)) }            
        </div>
    );
}

export default Board;