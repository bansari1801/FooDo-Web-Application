// ==========================================
//  Author: Bansari Shah
// ==========================================

import { Button } from '@mui/material';

export function SecondaryButton(props) {
  
  return (
    <>
      <Button
        variant="contained"
        onClick={props.onBtnClick}
        color="secondary"
      >
        {props.btnText}
      </Button>
    </>
  );
}
