//Author - Karan Rathore kr202401@dal.ca
import { Button, Container, Grid, MenuItem, Paper, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import axios from "axios";
import { addStaffMember,updateStaffMember } from '../../services/staffService';

export function StaffAdd() {
  const navigate = useNavigate();
  const location = useLocation();

  const isUpdate = location?.state?.operation === 'add' ? false : true;

  const [initialValues, setInitialValues] = React.useState({
    name: '',
    type: 'NS',
    contact: '',
    emergencyContact: '',
    bloodGroup: ' '
  });

  React.useEffect(() => {
    if (!location.state) {
      navigate('/staff');
    } else if (location?.state?.operation === 'update') {
      setInitialValues(location.state.staffDetails);
    }
  });

  const validationSchema = yup.object({
    name: yup.string('Enter staff name').min(3, 'Name is short, must have at least 3 characaters').required('Name is required'),
    type: yup.string('Please select staff type').min(3, 'Staff type is required').required('Staff type is required'),
    contact: yup
      .string('Enter contact number')
      .min(10, 'Contact number should have 10 digits')
      .max(10, 'Contact number should have only 10 digits')
      .required('Contact number is required'),
    emergencyContact: yup
      .string('Enter emergency contact number')
      .min(10, 'Emergency contact number should have 10 digits')
      .max(10, 'Emergency contact number should have only 10 digits')
      .required('Emergency contact number is required'),
    bloodGroup: yup.string('Select blood group').min(2, 'Select blood group').required('Blood group is required'),
  });

  let formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {

      if(isUpdate){
        values = {...values, "staffId": initialValues._id};
        updateStaffMember(values).then((res) => {
          navigateToStaffHomePage();
        });
      }
      else
      {
        addStaffMember(values).then((res) => {
          navigateToStaffHomePage();
        });
      }
    },
  });

  const navigateToStaffHomePage = () => {
    navigate('/staff');
  };

  return (
    <>
      <div className="pageBackground">
        <Grid container>
          <Grid item xs={0} sm={3} md={4}></Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Container>
              <form onSubmit={formik.handleSubmit}>
                <Paper elevation={3} sx={{ p: 2 }}>
                  <Grid container spacing={3} direction={'column'}>
                    <Grid item xs={12}>
                      <Typography  align={'center'}>
                        <h2> {!isUpdate ? 'ADD STAFF' : 'UPDATE STAFF'}</h2>
                      </Typography>
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        id="name"
                        label="Staff Name"
                        value={formik.values.name}
                        color="primary"
                        onChange={formik.handleChange('name')}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                        fullWidth
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        select
                        id="type"
                        label="Staff Type"
                        value={formik.values.type}
                        color="primary"
                        onChange={formik.handleChange('type')}
                        error={formik.touched.type && Boolean(formik.errors.type)}
                        helperText={formik.touched.type && formik.errors.type}
                        fullWidth
                      >
                        <MenuItem value="NS">Select staff type</MenuItem>
                        <MenuItem value="Waiter">Waiter</MenuItem>
                        <MenuItem value="Chef">Chef</MenuItem>
                        <MenuItem value="Manager">Manager</MenuItem>
                      </TextField>
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        id="contact"
                        label="Contact number"
                        value={formik.values.contact}
                        color="primary"
                        onChange={formik.handleChange('contact')}
                        error={formik.touched.contact && Boolean(formik.errors.contact)}
                        helperText={formik.touched.contact && formik.errors.contact}
                        fullWidth
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        id="emergencyContact"
                        label="Emergency contact number"
                        value={formik.values.emergencyContact}
                        color="primary"
                        onChange={formik.handleChange('emergencyContact')}
                        error={formik.touched.emergencyContact && Boolean(formik.errors.emergencyContact)}
                        helperText={formik.touched.emergencyContact && formik.errors.emergencyContact}
                        fullWidth
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        select
                        label="Blood Group"
                        id="bloodGroup"
                        value={formik.values.bloodGroup}
                        color="primary"
                        onChange={formik.handleChange('bloodGroup')}
                        error={formik.touched.bloodGroup && Boolean(formik.errors.bloodGroup)}
                        helperText={formik.touched.bloodGroup && formik.errors.bloodGroup}
                        fullWidth
                      >
                        <MenuItem value=" ">Select blood group</MenuItem>
                        <MenuItem value="Not available">Not available</MenuItem>
                        <MenuItem value="A-">A-</MenuItem>
                        <MenuItem value="A+">A+</MenuItem>
                        <MenuItem value="B-">B-</MenuItem>
                        <MenuItem value="B+">B+</MenuItem>
                        <MenuItem value="O-">O-</MenuItem>
                        <MenuItem value="O+">O+</MenuItem>
                        <MenuItem value="AB-">AB-</MenuItem>
                        <MenuItem value="AB+">AB+</MenuItem>
                      </TextField>
                    </Grid>

                    <Grid item display="flex" justifyContent="flex-end">
                      <Button color="secondary" variant="contained" sx={{ mr: 2 }} onClick={navigateToStaffHomePage}>
                        {' '}
                        Cancel{' '}
                      </Button>
                      <Button  variant="contained" type="submit">
                        {' '}
                        SAVE{' '}
                      </Button>
                    </Grid>
                  </Grid>
                </Paper>
              </form>
            </Container>
          </Grid>
          <Grid item xs={0} sm={6} md={4}></Grid>
        </Grid>
      </div>
    </>
  );
}

export default StaffAdd;
