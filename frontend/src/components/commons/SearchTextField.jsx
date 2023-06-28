// ==========================================
//  Author: Bansari Shah
// ==========================================

import SearchIcon from '@mui/icons-material/Search';
import { TextField } from '@mui/material';

export function SearchTextField(props) {
  return (
    <>
      <SearchIcon sx={{ mr: 1, my: 0.5 }} />
      <TextField id="input-with-sx" placeholder={props.placeholder} variant="standard" focused color="neutral" onChange={(e) => props.onChange(e.target.value)} />
    </>
  );
}
