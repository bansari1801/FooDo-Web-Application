//Author - Karan Rathore kr202401@dal.ca
import { Button, Container, Grid, MenuItem, Paper, TextField, Typography } from '@mui/material';
import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import moment from 'moment';

export function StaffDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const [staffDetails, setStaffDetails] = React.useState({});


  React.useEffect(() => {
    if (!location.state) {
      navigate('/staff');
    } else if (location?.state?.staffDetails) {
      setStaffDetails(location.state.staffDetails);
    }
  });

  return (
    <>
      <div className="pageBackground">
        <Grid container>
          <Grid item xs={0} sm={3} md={4}></Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Container>
                <Paper elevation={3} sx={{ p: 6 }} >
                  <Grid container spacing={3}>

                        <Grid xs = {6}>Name : </Grid><Grid xs = {6}>{staffDetails.name}</Grid>
                        <Grid xs = {6}>Type : </Grid><Grid xs = {6}>{staffDetails.type}</Grid>
                        <Grid xs = {6}>Blood Group : </Grid><Grid xs = {6}>{staffDetails.bloodGroup}</Grid>
                        <Grid xs = {6}>Contact : </Grid><Grid xs = {6}>{staffDetails.contact}</Grid>
                        <Grid xs = {6}>Emergency Contact : </Grid><Grid xs = {6}>{staffDetails.emergencyContact}</Grid>
                        <Grid xs = {6} sx = {{mt:1}}>Attendance : </Grid>
                        <Grid xs = {6}>

                        <List>
                            { staffDetails.attendance ? staffDetails.attendance.map((attendance) => (
                                <ListItem sx = {{p:0, m:0}}>
                                    <ListItemText
                                    primary= {moment(attendance).format("DD/MM/YYYY")}
                                    />
                                </ListItem>
                            )) : null}
                         </List>

                        </Grid>
                  </Grid>
                </Paper>
            </Container>
          </Grid>
          <Grid item xs={0} sm={6} md={4}></Grid>
        </Grid>
      </div>
    </>
  );
}

export default StaffDetails;
