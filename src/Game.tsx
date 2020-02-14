import React, { useState } from "react";
import Board from "./Board";
import ScorePanel from "./ScorePanel";
import ConfirmResetDialog from "./ConfirmResetDialog";
import { PointAttribution } from "./Utils";



interface IGame {

}

const Game: React.FC<IGame> = props => {

  const [gameId, setGameId] = useState(1);
  const [points, setPoints] = useState({tie: 0, scoreX: 0, scoreO: 0});
  const [hideDialog, setHideDialog] = useState(true);

  const addPoints = (pointsToAdd: number, attributedTo: PointAttribution) => {
    switch(attributedTo) {
      case(PointAttribution.Tie):
        setPoints({tie: (points.tie +pointsToAdd), scoreX: points.scoreX, scoreO: points.scoreO});
        break;
      case(PointAttribution.PlayerX):
        setPoints({tie: points.tie, scoreX: (points.scoreX + pointsToAdd), scoreO: points.scoreO});
        break;
      case(PointAttribution.PlayerO):
        setPoints({tie: points.tie, scoreX: points.scoreX, scoreO: (points.scoreO +pointsToAdd)});
        break;
    }
  }

  const resetScores = () => {
    setPoints({tie: 0, scoreX: 0, scoreO: 0});
  }

  const showDialog = () => {
    setHideDialog(false);
  }
  const closeDialog = () => {
    setHideDialog(true);
  }

  return (
    <div>
      <ConfirmResetDialog hideDialog={hideDialog} 
                          resetFunction={() => {resetScores(); closeDialog();}} 
                          cancelFunction={() => closeDialog()}/>
      <table style={{width: "100%", marginLeft: "auto", marginRight: "auto"}}>
        <tr>
          <td style={{padding: 20}}>  
            <div>
                <Board key={gameId} 
                       startNewGame={() => setGameId(gameId + 1)}
                       addPoints={addPoints} />
            </div>    
          </td>
          <td style={{padding: "30px 30px 20px 30px", verticalAlign: "top"}}>
            <ScorePanel scoreX={points.scoreX} 
                        scoreO={points.scoreO} 
                        ties={points.tie}
                        onResetClick={showDialog}
                        addPoints={addPoints}/> 
          </td>
        </tr>
      </table>
    </div>
  );
}

export default Game;