import React from "react";
import { IButtonStyles, DefaultButton } from "office-ui-fabric-react";

interface ISquare {
    value: number,
    currentPlayer: number,
    ownedBy: number,
    gameStatus: string,
    onClick: (valClicked: number) => void;
}

const Square: React.FC<ISquare> = props => {

    const xStyles: IButtonStyles = {
        rootDisabled: {
            backgroundColor: "#daedf0",
            color: "#000000"
          }
        
    }

    const oStyles: IButtonStyles = {
        rootDisabled: {
            backgroundColor: "#e6c138",
            color: "#000000"
          }
        
    }

    const availableStyles: IButtonStyles = {
        rootHovered: {
            backgroundColor: props.currentPlayer === 1 ? '#daedf0' : "#e6c138"
        }
    }

    return(
       <DefaultButton 
            disabled={(props.ownedBy !== 0) || props.gameStatus !== 'active'} 

            styles={props.ownedBy === 1 ? xStyles:
                    props.ownedBy === 2 ? oStyles:
                                          availableStyles  }

            text={props.ownedBy === 0 ? '' :
                  props.ownedBy === 1 ? 'X':
                                        'O'  }

            onClick={() => props.onClick(props.value) }/>
    );
}

export default Square;