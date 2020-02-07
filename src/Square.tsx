import React from "react";
import { DefaultButton, IButtonStyles } from "office-ui-fabric-react";

interface ISquare {
    value: number,
    ownedBy: number,
    onClick: (valClicked: number) => void;
}

const Square: React.FC<ISquare> = props => {

    const styles: IButtonStyles = {
        root: [
            {
                background: props.ownedBy === 1 ? 'green' : 
                            props.ownedBy === 2 ? 'red' :
                                                  'white'
                                                   
            }
        ]
      }

    return(
       <DefaultButton 
            disabled={props.ownedBy !== 0} 
            styles={styles}
            text={props.ownedBy === 0 ? '' :
                  props.ownedBy === 1 ? 'X':
                                        'O'  }
            onClick={() => props.onClick(props.value) }/>
    );
}

export default Square;