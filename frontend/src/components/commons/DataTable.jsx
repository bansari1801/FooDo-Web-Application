// ==========================================
//  Author: Khushalkumar Gondaliya, Bansari Shah
// ==========================================

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import StyledTableCell from './StyledTableCell';
import StyledTableRow from './StyledTableRow';
import * as React from 'react';
import { IconButton, TableContainer } from '@mui/material';

export function DataTable(props) {
  const minHeight = props.minHeight;
  const columns = props.columns;
  const data = props.data;

  const showActionButtons = (row) => {
    return (
      <span>
        {props?.isView ? (
          <a>
            <IconButton>
              {' '}
              <VisibilityIcon sx={{ marginRight: 1 }} onClick={() => props.onViewItem(row)} />
            </IconButton>
          </a>
        ) : (
          ''
        )}
        {props?.isEdit ? (
          <a>
            <IconButton disabled={row?.status === 'completed'}>
              <EditIcon sx={{ marginRight: 1 }} onClick={() => props.onEditItem(row)} />
            </IconButton>
          </a>
        ) : (
          ''
        )}
        {props?.isDelete ? (
          <a>
            <IconButton>
              {' '}
              <DeleteIcon sx={{ marginRight: 1 }} onClick={() => props.onDeleteItem(row)} />
            </IconButton>
          </a>
        ) : (
          ''
        )}
      </span>
    );
  };

  return (
    <>
      <TableContainer sx={{ minHeight: minHeight }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <StyledTableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                  {column.label}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, idx) => {
              return (
                <StyledTableRow hover role="checkbox" tabIndex={-1} key={idx}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <StyledTableCell key={column.id} align={column.align}>
                        {value}
                        {column.id === 'actions' ? showActionButtons(row) : ''}
                      </StyledTableCell>
                    );
                  })}
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default DataTable;
