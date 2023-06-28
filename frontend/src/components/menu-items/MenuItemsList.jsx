// ==========================================
//  Author: Bansari Shah
// ==========================================

import { FormControl, Grid, MenuItem, Select } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { Container } from '@mui/system';
import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { store } from '../../config/store';
import { deleteMenuItem, getMenuList } from '../../services/menuService';
import { tokens } from '../../Theme';
import AlertDialog from '../commons/AlertDialog';
import DataTable from '../commons/DataTable';
import Pagination from '../commons/Pagination';
import { PrimaryButton } from '../commons/PrimaryButton';
import { SearchTextField } from '../commons/SearchTextField';
import Title from '../commons/Title';
import Toast from '../commons/Toast';

const columns = [
  { id: '_id', label: '#', minWidth: 170 },
  { id: 'name', label: 'Item Name', minWidth: 100 },
  {
    id: 'ingredients',
    label: 'Main\u00a0Ingredients',
    minWidth: 170,

    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'cuisine',
    label: 'Cuisine',
    minWidth: 170,

    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'spicyLevel',
    label: 'Spicy Level (1-3)',
    minWidth: 170,

    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'price',
    label: 'Price ($)',
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
const MenuItemsList = () => {
  const colors = tokens();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [menuItemList, setMenuItemList] = useState([]);
  const [showToast, setToast] = useState(false);
  const [toastMsg, setToastMessage] = useState();
  const [filterName, setFilterName] = useState();
  const [filterCuisine, setFilterCuisine] = useState('All');
  const [cuisineList, setCuisineList] = useState();
  const reduxState = store.getState();

  React.useEffect(() => {
    setCuisineList(reduxState.restaurant.cuisine);
    fetchMenuList(page, rowsPerPage, filterName, filterCuisine);
  }, []);

  const fetchMenuList = (page, rowsPerPage, filterName, filterCuisine) => {
    let queryParams = {
      pageId: page,
      limit: rowsPerPage,
      name: filterName,
      cuisine: filterCuisine,
    };
    getMenuList(queryParams).then((res) => {
      setMenuItemList(res.data);
      setTotalRecords(res.meta.total_records);
      setPage(res.meta.current_page - 1);
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    fetchMenuList(newPage, rowsPerPage, filterName, filterCuisine);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
    fetchMenuList(0, event.target.value, filterName, filterCuisine);
  };

  const navigate = useNavigate();

  const showAddMenuPage = () => {
    navigate('/menu/add');
  };

  const [open, setOpen] = React.useState(false);
  const [item, setItem] = React.useState();

  const openDialog = (item) => {
    setOpen(true);
    setItem(item);
  };

  const openEditItem = (item) => {
    navigate('/menu/add/' + item._id);
  };

  const onSearchFieldChange = (value) => {
    setFilterName(value);
    fetchMenuList(page, rowsPerPage, value, filterCuisine);
  };

  const handleFilterCuisine = (value) => {
    setFilterCuisine(value);
    fetchMenuList(page, rowsPerPage, filterName, value);
  };

  const onCloseToast = () => {
    setToast(false);
  };

  const deleteItem = () => {
    setOpen(false);
    setItem(null);
    deleteMenuItem(item._id).then((res) => {
      setToast(true);
      setToastMessage(res.meta.message);
      fetchMenuList(page, rowsPerPage, filterName, filterCuisine);
    });
  };
  return (
    <Box className="pageBackground">
      <Container maxWidth="xl">
        {showToast && <Toast severity="success" message={toastMsg} open={true} onClose={onCloseToast} />}
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Title titleText="Menu List" />
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
                    <SearchTextField placeholder="Search Item" onChange={(value) => onSearchFieldChange(value)} />
                    <FormControl label="Staff type" variant="standard" sx={{ ml: 5, minWidth: 120 }}>
                      <Select value={filterCuisine} onChange={(e) => handleFilterCuisine(e.target.value)}>
                        <MenuItem value="All">All</MenuItem>
                        {cuisineList?.map((cuisine, idx) => {
                          return (
                            <MenuItem key={idx} value={cuisine}>
                              {cuisine}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </Box>
                  <PrimaryButton btnText="Add" onBtnClick={showAddMenuPage} />
                </Stack>
              </Box>
              <DataTable
                minHeight="650px"
                columns={columns}
                data={menuItemList}
                page={page}
                rowsPerPage={rowsPerPage}
                isEdit={true}
                isDelete={true}
                onEditItem={(row) => openEditItem(row)}
                onDeleteItem={(row) => openDialog(row)}
              />

              <Pagination
                totalRecords={totalRecords}
                data={menuItemList}
                rowsPerPage={rowsPerPage}
                page={page}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
              />
              <AlertDialog open={open} onClose={() => setOpen(false)} onConfirmItem={deleteItem} dialogTitle="Delete Menu Item?" dialogBody="Are you sure to delete menu item?" />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default MenuItemsList;
