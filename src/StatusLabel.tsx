import React from "react";
import { Label, FontSizes } from "office-ui-fabric-react";

interface IStatusLabel {
    playerName: string,
    gameStatus: string
}

const StatusLabel: React.FC<IStatusLabel> = props => {

    return (
        <Label 
            style={{margin: 15, fontSize: FontSizes.xLarge, textAlign: "center"}}>
            {props.gameStatus === 'won' ? `${props.playerName} won!!!` :
             props.gameStatus === 'tie' ? `It's a tie!!!` :
                                          `Next player: ${props.playerName}`}
        </Label>
    );
}

export default StatusLabel