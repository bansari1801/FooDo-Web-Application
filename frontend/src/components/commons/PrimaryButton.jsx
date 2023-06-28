// ==========================================
//  Author: Bansari Shah
// ==========================================

import { Button } from '@mui/material';
import { tokens } from '../../Theme';

export function PrimaryButton(props) {
  const colors = tokens();
  return (
    <>
      <Button
        variant="contained"
        onClick={props.onBtnClick}
        type={props.type}
        sx={{
          color: colors.primary[100],
          backgroundColor: colors.black[500],
          ':hover': { backgroundColor: colors.black[100] },
          display: props?.display || 'inherit',
        }}
      >
        {props.btnText}
      </Button>
    </>
  );
}
