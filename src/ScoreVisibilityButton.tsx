import React from "react";
import { DefaultButton, IIconProps } from "office-ui-fabric-react";
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';

initializeIcons(/* optional base url */);

const hideIcon: IIconProps = { iconName: 'Hide3' };
const showIcon: IIconProps = { iconName: 'View' };

interface IScoreVisibilityButton {
    currentlyVisible: boolean,
    onClick: () => void
}

const ScoreVisibilityButton: React.FC<IScoreVisibilityButton> = props => {

    return (
        <DefaultButton toggle
                       checked={props.currentlyVisible}
                       text={props.currentlyVisible ? 'Hide scores' : 'Show scores'}
                       iconProps={props.currentlyVisible ? hideIcon : showIcon}
                       onClick={props.onClick} />
    );
}

export default ScoreVisibilityButton;