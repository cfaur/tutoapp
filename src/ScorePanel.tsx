import React, { useState } from "react";
import { Label, PrimaryButton, ILabelStyles, FontSizes, IContextualMenuProps, DefaultButton, Stack } from "office-ui-fabric-react";
import ScoreVisibilityButton from "./ScoreVisibilityButton";
import { PointAttribution, getRandomInt, X_COLOR, O_COLOR } from "./Utils";

interface IScorePanel {
    scoreX: number,
    scoreO: number,
    ties: number,
    onResetClick: () => void,
    addPoints: (pointsToAdd: number, attributedTo: PointAttribution) => void
}

const ScorePanel: React.FC<IScorePanel> = props => {

    const labelStyles: ILabelStyles = {
        root: {
            fontSize: FontSizes.xLarge,
            marginBottom: 5
        }
    }

    const menuProps: IContextualMenuProps = {
        items: [
          {
            key: 'cheatForX',
            text: 'Add points to player X',
            iconProps: { iconName: 'Clear' },
            onClick: () => props.addPoints(getRandomInt(1, 10), PointAttribution.PlayerX)
          },
          {
            key: 'cheatForO',
            text: 'Add points to player O',
            iconProps: { iconName: 'LocationCircle' },
            onClick: () => props.addPoints(getRandomInt(1, 10), PointAttribution.PlayerO)
          }
        ]
    };
      
    const [showScores, setShowScores] = useState(false);

    return (
        <div>
            <ScoreVisibilityButton currentlyVisible={showScores} onClick={() => {setShowScores(!showScores)}}/>
            {showScores && 
                <Stack gap={5} style={{marginTop: 50}}>
                    <Label styles={labelStyles}
                           style={{backgroundColor: X_COLOR}}>X score: {props.scoreX}</Label>
                    <Label styles={labelStyles}
                           style={{backgroundColor: O_COLOR}}>O score: {props.scoreO}</Label>
                    <Label styles={labelStyles}>Ties: {props.ties}</Label>
                    <PrimaryButton onClick={props.onResetClick}>Reset scores</PrimaryButton>
                    
                    <DefaultButton
                        text="Cheat"
                        split
                        splitButtonAriaLabel="Cheating options: for player X or player O"
                        aria-roledescription="split button"
                        menuProps={menuProps}                    
                    />                   
                    
                </Stack>}
        </div>
    );
}

export default ScorePanel;