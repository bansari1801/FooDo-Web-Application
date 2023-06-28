// ==========================================
//  Author: Meet Master
// ==========================================

import { yupResolver } from '@hookform/resolvers/yup';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { matchIsValidTel, MuiTelInput } from 'mui-tel-input';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import { Container } from '@mui/system';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createNewOrder, getMenuItems, getOrderById, updateOrder } from '../../services/orderService';
import { tokens } from '../../Theme';
import { FormSelectField } from '../commons/FormSelectField';
import { FormTextField } from '../commons/FormTextField';
import { FormTextFieldWithInputProps } from '../commons/FormTextFieldWithInputProps';
import { PrimaryButton } from '../commons/PrimaryButton';
import { SecondaryButton } from '../commons/SecondaryButton';
import Title from '../commons/Title';
import Toast from '../commons/Toast';
import './Style.css';

const CreateNewOrder = () => {
  const navigate = useNavigate();
  const params = useParams();
  const colors = tokens();

  const isEdit = params?.id ? true : false;

  const [showToast, setToast] = useState(false);
  const [toastMsg, setToastMessage] = useState();

  const validationSchema = Yup.object().shape({
    customerName: Yup.string().required('Please enter customer name:'),
    phoneNumber: Yup.number().required('Please enter customer phone number:'),
    orderItems: Yup.array().of(
      Yup.object().shape({
        itemName: Yup.string().required('Please select item name'),
        qty: Yup.number().min(1, 'Quantity must be atleast 1').required('Please enter quantity'),
      })
    ),
  });

  const [orderList, setOrderList] = useState([{ itemName: '', qty: 0 }]);
  const [initialValues, setInitialValues] = useState({
    customerName: '',
    phoneNumber: '',
    orderItems: orderList,
    price: 0,
  });

  const [menuList, setMenuList] = useState();

  const handleChange = (e) => {
    formik.handleChange(e);
    setTimeout(() => {
      let selectedItems = formik.values.orderItems;
      let totalPrice = formik.values.price;
      console.log(formik.values)
      formik.values.orderItems.map(async (order) => {
        if (order.qty > 0) {
          await menuList.filter((menu) => {
            if (menu?.label === order?.itemName) {
              totalPrice = totalPrice + Number(menu.price) * Number(order.qty);
              formik.setFieldValue('price', totalPrice);
            }
          });
        }
      });
    }, 6000);
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    enableReinitialize: true,

    onSubmit: (values) => {
      values.orderItems.map(async (order) => {
        if (order.qty > 0) {
          let totalPrice = values.price;
          await menuList.filter((menu) => {
            if (menu?.label === order?.itemName) {
              order.price = menu.price;
              order.cuisine = menu.cuisine;
              totalPrice = totalPrice + Number(menu.price) * Number(order.qty);
              values.price = totalPrice;
            }
          });
        }
      });

      const serviceName = isEdit ? updateOrder : createNewOrder;
      serviceName(values).then((res) => {
        setToast(true);
        setToastMessage(res.meta.message);
        setTimeout(() => {
          navigate('/order');
        }, 1000);
      });
    },
  });

  const fetchOrder = (id) => {
    getOrderById(id).then((res) => {
      setInitialValues(res.data);
    });
  };

  useEffect(() => {
    if (isEdit) {
      fetchOrder(params.id);
    }
    getMenuItems().then(async (res) => {
      let data = res.data;
      data = data?.map((list) => {
        return { label: list.name, value: list.name, price: list.price, cuisine: list.cuisine };
      });
      setMenuList(data);
    });
  }, []);

  const onCancel = () => {
    navigate('/order');
  };

  const addItem = () => {
    let itemList = [...formik.values.orderItems, { itemName: '', qty: 0 }];
    setInitialValues({ ...formik.values, orderItems: itemList });
  };

  const removeItem = (index) => {
    let itemList = { ...formik.values };
    itemList.orderItems.splice(index, 1);
    formik.setValues(itemList);
    setInitialValues(itemList);
  };

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onCloseToast = () => {
    setToast(false);
  };

  return (
    <Box className="pageBackground">
      <Container maxWidth="xl">
        {showToast && <Toast severity="success" message={toastMsg} open={true} onClose={onCloseToast} />}
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Title titleText={isEdit ? 'Update Order' : 'Create New Order'} />
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
                    <FormTextField fieldName="customerName" fieldLabel="Customer Name" formik={formik} />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Controller
                      control={control}
                      rules={{
                        validate: matchIsValidTel,
                      }}
                      render={({ field, fieldState }) => (
                        <MuiTelInput
                          {...field}
                          defaultCountry="CA"
                          error={formik.touched['phoneNumber'] && Boolean(formik.errors['phoneNumber'])}
                          helperText={formik.touched['phoneNumber'] && formik.errors['phoneNumber']}
                          onChange={formik.handleChange('phoneNumber')}
                          value={formik.values['phoneNumber']}
                        />
                      )}
                      name="phoneNumber"
                    />
                  </Grid>
                </Grid>
                {formik?.values?.orderItems.map((order, index) => (
                  <Grid container spacing={3} style={{ marginTop: '1rem' }}>
                    <Grid item xs={12} sm={4}>
                      <FormSelectField
                        fieldName="itemName"
                        fieldIndex={index}
                        fieldArrayKey="orderItems"
                        fieldLabel="Item Name"
                        formik={formik}
                        isArray={true}
                        options={menuList}
                        handleChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={1}>
                      <FormTextField
                        fieldName="qty"
                        fieldIndex={index}
                        fieldArrayKey="orderItems"
                        fieldLabel="Quantity"
                        formik={formik}
                        isArray={true}
                        type="number"
                        handleChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={2} display="flex" alignItems="center">
                      {formik.values.orderItems.length - 1 === index ? (
                        <a onClick={addItem}>
                          <AddCircleIcon fontSize="large" />
                        </a>
                      ) : (
                        <a onClick={() => removeItem(index)}>
                          <RemoveCircleIcon fontSize="large" />
                        </a>
                      )}
                    </Grid>
                  </Grid>
                ))}
                <Grid container item xs={12} sm={1} style={{ marginTop: '1rem' }}>
                  <FormTextFieldWithInputProps fieldName="price" fieldLabel="Price" formik={formik} inputAdornment="$" disabled={true} />
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

export default CreateNewOrder;
