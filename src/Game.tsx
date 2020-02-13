import React, { useState } from "react";
import Board from "./Board";
import ScorePanel from "./ScorePanel";
import ConfirmResetDialog from "./ConfirmResetDialog";
import { PointAttribution } from "./Utils";
import { Stack, StackItem } from "office-ui-fabric-react";



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
      <Stack horizontal     
             horizontalAlign="center"        
             verticalAlign="stretch"
             tokens={{maxWidth: "1920px", padding: 20, childrenGap: 30}} >
        
          <StackItem grow={0} disableShrink={true}>
            <Board key={gameId} 
                  startNewGame={() => setGameId(gameId + 1)}
                  addPoints={addPoints} />
          </StackItem>

          <StackItem grow={0.2} shrink={1} tokens={{}}>
          <ScorePanel scoreX={points.scoreX} 
                      scoreO={points.scoreO} 
                      ties={points.tie}
                      onResetClick={showDialog}
                      addPoints={addPoints}/> 
          </StackItem>
        
      </Stack>
    </div>
  );
}

export default Game;