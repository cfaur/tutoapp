import React, { useState } from "react";
import { Dialog, DialogType, PrimaryButton, DialogFooter, DefaultButton } from "office-ui-fabric-react"

interface IConfirmResetDialog {
    hideDialog: boolean,
    resetFunction: () => void,
    cancelFunction: () => void
}

const ConfirmResetDialog: React.FC<IConfirmResetDialog> = props => {
    
    return (
        <Dialog
          hidden={props.hideDialog}
          onDismiss={props.cancelFunction}
          dialogContentProps={{
            type: DialogType.normal,
            title: 'Are you sure?',
            closeButtonAriaLabel: 'Close',
            subText: 'Scores reset is irreversible. Please confirm your action.'
          }}
          modalProps={{
            isBlocking: true,
            styles: { main: { maxWidth: 450 } }
          }}
        >
          <DialogFooter>
            <PrimaryButton onClick={props.resetFunction} text="Confirm" />
            <DefaultButton onClick={props.cancelFunction} text="Cancel" />
          </DialogFooter>
        </Dialog>
    );
}

export default ConfirmResetDialog;