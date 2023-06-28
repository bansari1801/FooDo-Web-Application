// ==========================================
//  Author: Meet Master
// ==========================================

import { FormControl, Grid, MenuItem, Select } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { Container } from '@mui/system';
import * as React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { tokens } from '../../Theme';
import { store } from '../../config/store';
import { getAllCurrentOrders } from '../../services/orderService';
import DataTable from '../commons/DataTable';
import Pagination from '../commons/Pagination';
import { PrimaryButton } from '../commons/PrimaryButton';
import { SearchTextField } from '../commons/SearchTextField';
import Title from '../commons/Title';
import './Style.css';
import SimpleDialog from './viewOrder';

export default function OrdersTable() {
  const navigate = useNavigate();

  const colors = tokens();
  const [open, setOpen] = React.useState(false);
  const [order, setOrder] = React.useState(null);
  const [status, setStatus] = React.useState('active');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState([]);
  const [totalRecords, setTotalRecords] = React.useState(0);
  const [filterOrder, setFilterOrder] = React.useState();
  const [statusValues, setStatusValues] = React.useState();
  const state = store.getState();
  const isChefLogin = state.restaurant.loginRole === 'Chef' ? true : false;
  const fetchRecords = (page, rowsPerPage, filterValue, filterStatus) => {
    getAllCurrentOrders({
      pageId: page,
      limit: rowsPerPage,
      filterOrder: filterValue,
      status: filterStatus,
      isChef: isChefLogin,
    }).then((res) => {
      setRows(res.data);
      setTotalRecords(res.meta.total_records);
    });
  };

  useEffect(() => {
    if (isChefLogin) {
      setStatusValues([
        { label: 'All', value: 'All' },
        { label: 'Received', value: 'received' },
        { label: 'In Progress', value: 'progress' },
        { label: 'Completed', value: 'completed' },
      ]);
      setStatus('received');
      fetchRecords(page, rowsPerPage, filterOrder, 'received');
    } else {
      setStatusValues([
        { label: 'All', value: 'All' },
        { label: 'Active', value: 'active' },
        { label: 'Completed', value: 'completed' },
      ]);
      fetchRecords(page, rowsPerPage, filterOrder, status);
    }
  }, []);

  const onSearchOrders = (value) => {
    setFilterOrder(value);
    fetchRecords(page, rowsPerPage, value, status);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    fetchRecords(newPage, rowsPerPage, filterOrder, status);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
    fetchRecords(0, event.target.value, filterOrder, status);
  };

  const createNewOrder = () => {
    navigate('/order/add');
  };

  const editOrder = (order) => {
    navigate(`/order/add/${order._id}`);
  };

  const openDialog = (odr) => {
    setOpen(true);
    setOrder(odr);
  };

  const onCloseDialog = () => {
    setTimeout(() => {
      setOpen(false);
      fetchRecords(page, rowsPerPage, filterOrder, status);
    }, 1000);
  };

  const handleFilterStatus = (value) => {
    setStatus(value);
    fetchRecords(page, rowsPerPage, filterOrder, value);
  };

  const columns = [
    { id: '_id', label: 'Order Number', minWidth: 170 },
    { id: 'customerName', label: 'Customer Name', minWidth: 100 },
    {
      id: 'phoneNumber',
      label: 'Phone Number',
      minWidth: 170,

      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'totalItems',
      label: 'Total Items',
      minWidth: 170,

      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'price',
      label: 'Total Amount ($)',
      minWidth: 170,

      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'actions',
      label: 'Actions',
      minWidth: 170,
      align: 'right',
    },
  ];
  return (
    <Box className="pageBackground">
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Title titleText="Orders" />
          </Grid>

          <Grid item xs={12} md={12}>
            <Paper
              sx={{
                width: '100%',
                overflow: 'hidden',
                padding: '20px',
                backgroundColor: colors.primary[500],
              }}
            >
              <Box sx={{ p: 1 }}>
                <Stack direction="row" spacing={2} justifyContent="space-between">
                  <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <SearchTextField placeholder="Search Orders" onChange={(value) => onSearchOrders(value)} />
                    <FormControl label="Order Status" variant="standard" sx={{ ml: 5, minWidth: 120 }}>
                      <Select value={status} onChange={(e) => handleFilterStatus(e.target.value)}>
                        {statusValues?.map((statusValue) => {
                          return <MenuItem value={statusValue.value}>{statusValue.label}</MenuItem>;
                        })}
                      </Select>
                    </FormControl>
                  </Box>
                  <PrimaryButton btnText="Place New Order" onBtnClick={createNewOrder} display={isChefLogin ? 'none' : ''} />
                </Stack>
              </Box>
              <DataTable
                minHeight="650px"
                columns={columns}
                data={rows}
                page={page}
                rowsPerPage={rowsPerPage}
                isView={true}
                isEdit={isChefLogin ? false : true}
                onEditItem={(row) => editOrder(row)}
                onViewItem={(row) => openDialog(row)}
              />

              <Pagination
                data={rows}
                rowsPerPage={rowsPerPage}
                page={page}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
                totalRecords={totalRecords}
              />
              <SimpleDialog open={open} order={order} onClose={onCloseDialog} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
