// ==========================================
//  Author: Bansari Shah
// ==========================================

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { tokens } from '../../Theme';

export function Title({ titleText }) {
  const colors = tokens();

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: colors.primary[500] }}>
          <Toolbar>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
              {titleText}
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}

export default Title;
