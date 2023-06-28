// ==========================================
//  Author: Bansari Shah
// ==========================================

import { yupResolver } from '@hookform/resolvers/yup';
import { Container } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { store } from '../../config/store';
import { createNewMenuItem, getMenuItem, updateMenuItem } from '../../services/menuService';
import { tokens } from '../../Theme';
import { FormMultilineTextField } from '../commons/FormMultilineTextField';
import { FormSelectField } from '../commons/FormSelectField';
import { FormTextField } from '../commons/FormTextField';
import { FormTextFieldWithInputProps } from '../commons/FormTextFieldWithInputProps';
import { PrimaryButton } from '../commons/PrimaryButton';
import { SecondaryButton } from '../commons/SecondaryButton';
import Title from '../commons/Title';
import Toast from '../commons/Toast';

const AddMenuItem = () => {
  const navigate = useNavigate();
  const params = useParams();
  const colors = tokens();
  const [initialValues, setInitialValues] = useState({
    name: '',
    cuisine: '',
    spicyLevel: '',
    ingredients: '',
    price: '',
  });
  const [showToast, setToast] = useState(false);
  const [toastMsg, setToastMessage] = useState();
  const isEdit = params?.id ? true : false;
  const reduxState = store.getState();

  const cuisine = reduxState.restaurant?.cuisine?.map((cuisine) => {
    return {
      label: cuisine,
      value: cuisine,
    };
  });

  const validationSchema = Yup.object({
    name: Yup.string().required('Please enter item name'),
    cuisine: Yup.string().required('Please select cuisine'),
    spicyLevel: Yup.string().required('Please select spicy level'),
    ingredients: Yup.string().required('Please specify main ingredients'),
    price: Yup.string().required('Please enter the price'),
  });

  useEffect(() => {
    if (isEdit) {
      fetchMenuItem(params.id);
    }
  }, [isEdit, params.id, showToast]);

  const fetchMenuItem = (id) => {
    getMenuItem(id).then((res) => {
      setInitialValues(res.data);
    });
  };

  const onCloseToast = () => {
    setToast(false);
  };

  const {
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      const serviceName = isEdit ? updateMenuItem : createNewMenuItem;
      serviceName(values).then((res) => {
        setToast(true);
        setToastMessage(res.meta.message);
        setTimeout(() => {
          navigate('/menu');
        }, 1000);
      });
    },
  });

  const spiciness = [
    {
      value: '1',
      label: '1',
    },
    {
      value: '2',
      label: '2',
    },
    {
      value: '3',
      label: '3',
    },
  ];

  const onCancel = () => {
    navigate('/menu');
  };

  return (
    <Box className="pageBackground">
      <Container maxWidth="xl">
        {showToast && <Toast severity="success" message={toastMsg} open={true} onClose={onCloseToast} />}
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Title titleText={isEdit ? 'Update Menu Item' : 'Add Menu Item'} />
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
              <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={4}>
                    <FormTextField fieldName="name" fieldLabel="Item Name" formik={formik} />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <FormSelectField fieldName="cuisine" fieldLabel="Cuisine" formik={formik} options={cuisine} />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <FormSelectField fieldName="spicyLevel" fieldLabel="Spicy Level" formik={formik} options={spiciness} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormMultilineTextField fieldName="ingredients" fieldLabel="Ingredients" maxRows="4" formik={formik} />
                  </Grid>
                  <Grid item xs={12}>
                    <Grid item xs={12} sm={4}>
                      <FormTextFieldWithInputProps fieldName="price" fieldLabel="Price" formik={formik} inputAdornment="$" />
                    </Grid>
                  </Grid>
                </Grid>
                <Box mt={2}>
                  <Stack direction="row" spacing={2} justifyContent="flex-end">
                    <SecondaryButton btnText="Cancel" onBtnClick={onCancel} />
                    <PrimaryButton btnText={isEdit ? 'Update' : 'Add'} type="submit" />
                  </Stack>
                </Box>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AddMenuItem;
