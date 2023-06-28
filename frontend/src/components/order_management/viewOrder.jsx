// ==========================================
//  Author: Meet Master
// ==========================================

import CloseIcon from '@mui/icons-material/Close';
import { IconButton, MenuItem, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { DataGrid } from '@mui/x-data-grid';
import PropTypes from 'prop-types';
import * as React from 'react';
import { store } from '../../config/store';
import { updateOrder } from '../../services/orderService';
import { PrimaryButton } from '../commons/PrimaryButton';
import Toast from '../commons/Toast';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'itemName', headerName: 'Order Item', width: 130 },
  {
    field: 'qty',
    headerName: 'Quantity',
    type: 'number',
    width: 90,
  },
];

const SimpleDialog = (props) => {
  let { open, order, onClose } = props;
  const [showToast, setToast] = React.useState(false);
  const [toastMsg, setToastMessage] = React.useState();
  const state = store.getState();
  const isChefLogin = state.restaurant.loginRole === 'Chef' ? true : false;
  const closeDialog = () => {
    onClose(true);
  };

  if (order?.orderItems?.length > 0) {
    order.orderItems = order?.orderItems.map((o, idx) => {
      return { ...o, id: idx + 1 };
    });
  }

  const onOrderComplete = () => {
    order = { ...order, status: 'completed' };
    updateOrder(order).then((res) => {
      setToast(true);
      setToastMessage('Order Completed Successfully');
      closeDialog();
    });
  };

  const onCloseToast = () => {
    setToast(false);
  };

  const handleStatusChange = (value) => {
    order = { ...order, preparationStatus: value, isChef: true };
    updateOrder(order).then((res) => {
      setToast(true);
      setToastMessage('Preparation Status Changed successfully');
      closeDialog();
    });
  };

  return (
    <Dialog onClose={closeDialog} open={open}>
      {showToast && <Toast severity="success" message={toastMsg} open={true} onClose={onCloseToast} />}
      <DialogTitle>
        View Order #{order?._id}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        <div>
          <TextField value={order?.customerName} label="Customer Name" id="outlined-start-adornment" sx={{ m: 1, width: '25ch' }} disabled />
          <TextField value={order?.phoneNumber} label="Customer's Phone Number" id="outlined-start-adornment" sx={{ m: 1, width: '25ch' }} disabled />
          <TextField value={order?.totalItems} label="Total Order Items" id="outlined-start-adornment" sx={{ m: 1, width: '25ch' }} disabled />
          <TextField value={order?.price} label="Total Order Amount" id="outlined-start-adornment" sx={{ m: 1, width: '25ch' }} disabled />
          <TextField
            select
            value={order?.preparationStatus}
            onChange={(e) => handleStatusChange(e.target.value)}
            label="Preparation Status"
            id="outlined-start-adornment"
            sx={{ m: 1, width: '25ch', display: !isChefLogin ? 'none' : '' }}
          >
            <MenuItem value="received">Received</MenuItem>
            <MenuItem value="progress">In Progress</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
          </TextField>
          <div style={{ marginTop: 50, height: 400, width: '100%' }}>
            <DataGrid rows={order?.orderItems?.length ? order?.orderItems : []} columns={columns} pageSize={5} rowsPerPageOptions={[5]} />
          </div>
          <Box m={2}>
            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <PrimaryButton btnText="Order complete" onBtnClick={onOrderComplete} display={isChefLogin || order?.status === 'completed' ? 'none' : ''} />
            </Stack>
          </Box>
        </div>
      </Box>
    </Dialog>
  );
};

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default SimpleDialog;
