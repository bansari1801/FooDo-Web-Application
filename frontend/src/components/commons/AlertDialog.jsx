// ==========================================
//  Author: Bansari Shah
// ==========================================

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';
import { PrimaryButton } from './PrimaryButton';
import { SecondaryButton } from './SecondaryButton';

export default function AlertDialog(props) {
  const { open, onClose, onConfirmItem, dialogTitle, dialogBody } = props;

  const closeDialog = () => {
    onClose(true);
  };

  const confirmItem = () => {
    onConfirmItem(true);
  };

  return (
    <div>
      <Dialog open={open} onClose={closeDialog} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{dialogBody}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <SecondaryButton btnText="Cancel" onBtnClick={closeDialog} />
          <PrimaryButton btnText="Yes" onBtnClick={confirmItem} />
        </DialogActions>
      </Dialog>
    </div>
  );
}
