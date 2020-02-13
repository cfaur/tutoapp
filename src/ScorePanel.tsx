import React, { useState } from "react";
import { Label, PrimaryButton, ILabelStyles, FontSizes, IContextualMenuProps, DefaultButton, Stack, StackItem } from "office-ui-fabric-react";
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
            marginTop: 15,
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
      
    const [showScores, setShowScores] = useState(true);

    return (
        <Stack 
            verticalAlign="space-around"
            tokens={{padding: "20px 0px 0px 0px"}}>
            <ScoreVisibilityButton 
                currentlyVisible={showScores} 
                onClick={() => setShowScores(!showScores)} />

            {showScores && 
                <Stack                
                    horizontalAlign="stretch"                
                    verticalAlign="end"
                    tokens={{childrenGap: 5}} >
                    
                    <Label 
                        styles={labelStyles}
                        style={{backgroundColor: X_COLOR}}>X score: {props.scoreX}</Label>
                
                    <Label 
                        styles={labelStyles}
                        style={{backgroundColor: O_COLOR}}>O score: {props.scoreO}</Label>
                
                    <Label 
                        styles={labelStyles}>Ties: {props.ties}</Label>
                
                    <PrimaryButton 
                        text="Reset scores"
                        onClick={props.onResetClick} />
                                
                    <DefaultButton
                        text="Cheat"
                        split
                        splitButtonAriaLabel="Cheating options: for player X or player O"
                        aria-roledescription="split button"
                        menuProps={menuProps}                    
                    />
                </Stack>}
        </Stack>
    );
}

export default ScorePanel;