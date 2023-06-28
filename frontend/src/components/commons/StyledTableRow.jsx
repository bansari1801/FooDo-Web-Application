// ==========================================
//  Author: Khushalkumar Gondaliya
// ==========================================

import { styled } from "@mui/material/styles";
import TableRow from "@mui/material/TableRow";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.secondary.main,
  },
  "&:nth-of-type(even)": {
    backgroundColor: theme.palette.primary.main,
  },

  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default StyledTableRow;
