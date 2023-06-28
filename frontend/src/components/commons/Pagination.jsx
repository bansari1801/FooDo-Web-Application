// ==========================================
//  Author: Khushalkumar Gondaliya
// ==========================================

import TablePagination from "@mui/material/TablePagination";
import * as React from "react";
import { tokens } from "../../Theme";

function Pagination(props) {
  const colors = tokens();

  let rowsPerPage = props.rowsPerPage;
  let page = props.page;
  let totalRecords = props.totalRecords || 0;
  const handleChangePage = props.handleChangePage;
  const handleChangeRowsPerPage = props.handleChangeRowsPerPage;

  return (
    <TablePagination
      rowsPerPageOptions={[10, 25, 100, { label: "All", value: totalRecords }]}
      sx={{ backgroundColor: colors.primary[100] }}
      component="div"
      count={totalRecords}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
}

export default Pagination;
