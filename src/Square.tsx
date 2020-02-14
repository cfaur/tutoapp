import React from "react";
import { IButtonStyles, DefaultButton, FontSizes } from "office-ui-fabric-react";
import { X_COLOR, O_COLOR } from "./Utils";

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
            backgroundColor: X_COLOR,
            color: "#000000"
          }
        
    }

    const oStyles: IButtonStyles = {
        rootDisabled: {
            backgroundColor: O_COLOR,
            color: "#000000"
          }
        
    }

    const availableStyles: IButtonStyles = {
        rootHovered: {
            backgroundColor: props.currentPlayer === 1 ? X_COLOR : O_COLOR
        }
    }

    return(
       <DefaultButton 
            
            disabled={(props.ownedBy !== 0) || props.gameStatus !== 'active'} 

            style={{ height: '80px', width: 80, fontSize: FontSizes.xxLarge}}
            
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