//Author - Karan Rathore kr202401@dal.ca
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, Checkbox, Container, FormControl, MenuItem, Paper, Select, Stack, Table, TableBody, TableContainer, TableHead, TablePagination, TableRow, TextField } from '@mui/material';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { tokens } from '../../Theme';
import Pagination from '../commons/Pagination';
import StyledTableCell from '../commons/StyledTableCell';
import StyledTableRow from '../commons/StyledTableRow';
import Title from '../commons/Title';
import './styles/StaffHomePage.css';
import axios from "axios";
import Moment from 'moment';
import { getStaffMembers, deleteStaffMember, presentStaffMember, absentStaffMember } from '../../services/staffService';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { PrimaryButton } from '../commons/PrimaryButton';

export function StaffHomePage() {
  const [filterKeyword, setFilterKeyword] = React.useState('');
  const [filterStaffType, setFilterStaffType] = React.useState('All');
  const [data, setData] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [allData, setAllData] = React.useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [totalCount, setTotalCount] = React.useState(0);
  const colors = tokens();
  const url = 'http://localhost:8080/staff';

  const navigate = useNavigate();

  React.useEffect(() => {
    loadData(rowsPerPage,0,filterKeyword,filterStaffType);
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    loadData(rowsPerPage,newPage,filterKeyword,filterStaffType);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
    loadData(event.target.value,0,filterKeyword,filterStaffType);
  };

  const handleFilter = (keyword, type) => {
    loadData(rowsPerPage,page,keyword,type);
    setFilterStaffType(type);
    setFilterKeyword(keyword);
  };

  const handleFilterKeywordChange = (val) => {
    setFilterKeyword(val);
    handleFilter(val, filterStaffType);
  };

  const handleFilterStaffTypeChange = (val) => {
    setFilterStaffType(val);
    handleFilter(filterKeyword, val);
  };

  const addStaff = () => {
    navigate('/staff/add', { state: { operation: 'add' } });
  };

  const editStaff = (staff) => {
    navigate('/staff/add', { state: { operation: 'update', staffDetails: staff } });
  };

  const viewStaff = (staffDetails) => {
    navigate('/staff/view', { state: { staffDetails: staffDetails } });
  };

  const deleteStaff = (staff) => {
    deleteStaffMember(staff._id).then((res) => {
      loadData(rowsPerPage,page,filterKeyword,filterStaffType);
    });
  };

  const loadData = (rowsPerPage, page, keyword, type) => {
    let numberOfItemsToSkip = rowsPerPage*(page);

    getStaffMembers({limit: rowsPerPage, skip: numberOfItemsToSkip, date:Moment(new Date()).format('YYYY-MM-DD'), keyword: keyword, type:type }).then((res) => {
      setData(res.data);
      setAllData(res.data);
      setTotalCount(res.totalCount);
    });
  }

  const updateAttendance = (e, staffDetails) => {
    let payload ={staffId: staffDetails._id, date:Moment(new Date()).format('YYYY-MM-DD') };

    if(e.target.checked === false) // need to mark absent
    {
      absentStaffMember(payload).then((res) => {
        loadData(rowsPerPage, page,filterKeyword,filterStaffType);
      });
    }
    else // mark present
    {
      presentStaffMember(payload).then((res) => {
        loadData(rowsPerPage, page,filterKeyword,filterStaffType);
      });
    }

  };

  return (
    <div className="pageBackground">
      <Container maxWidth="xl">
        <Paper elevation={3}>
          <Title titleText="Staff Members"></Title>
          <Box sx={{ p: 1}}>
            <Stack direction="row" spacing={2} justifyContent="space-between">
              <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <SearchIcon sx={{  mr: 1, my: 0.5 }} />
                <TextField
                  focused
                  id="input-with-sx"
                  placeholder="Search"
                  variant="standard"
                  color="neutral"
                  value={filterKeyword}
                  onChange={(e) => handleFilterKeywordChange(e.target.value)}
                />

                <FormControl label="Staff type" variant="standard" sx={{ ml: 5, minWidth: 120 }}>
                  <Select
                    value={filterStaffType}
                    onChange={(e) => handleFilterStaffTypeChange(e.target.value)}
                  >
                    <MenuItem value="All">All</MenuItem>
                    <MenuItem value="Waiter">Waiter</MenuItem>
                    <MenuItem value="Chef">Chef</MenuItem>
                    <MenuItem value="Manager">Manager</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Box>
                <PrimaryButton btnText="Add" onBtnClick={addStaff} />
              </Box>
            </Stack>
          </Box>

          <TableContainer component={Paper} className="staffTable">
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell align="right">Type</StyledTableCell>
                  <StyledTableCell align="right">Attendance (Today)</StyledTableCell>
                  <StyledTableCell align="right">Contact</StyledTableCell>
                  <StyledTableCell align="right">Emergency Contact</StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody className="staffTable">
                {data.map((staff) => (
                  <StyledTableRow key={staff.id}>
                    <StyledTableCell>{staff.name}</StyledTableCell>
                    <StyledTableCell align="right">{staff.type}</StyledTableCell>
                    <StyledTableCell align="right">
                      <Checkbox aria-label="attendance" sx={{ color: 'black', '&.Mui-checked': { color: 'black' }}} checked={staff.attendanceToday} onClick={(e) => updateAttendance(e, staff)}/>
                    </StyledTableCell>
                    <StyledTableCell align="right">{staff.contact}</StyledTableCell>
                    <StyledTableCell align="right">{staff.emergencyContact}</StyledTableCell>
                    <StyledTableCell align="right">
                      <Button aria-label="edit" color="neutral" onClick={() => viewStaff(staff)}>
                        <VisibilityIcon/>
                      </Button>
                      <Button aria-label="edit" color="neutral" onClick={() => editStaff(staff)}>
                        <EditIcon />
                      </Button>
                      <Button aria-label="delete" color="neutral" onClick={() => deleteStaff(staff)}>
                        <DeleteIcon />
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100, { label: 'All', value: -1 }]}
            sx={{ backgroundColor: colors.primary[100] }}
            component="div"
            count={totalCount}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Container>
    </div>
  );
}

export default StaffHomePage;
