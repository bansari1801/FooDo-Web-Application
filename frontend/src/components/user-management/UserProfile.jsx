// ==========================================
//  Author: Khushalkumar Gondaliya
// ==========================================
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import {
  Box,
  CardActions,
  CardContent,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { React, useEffect, useRef, useState } from "react";
import { tokens } from "../../Theme";

import { useFormik } from "formik";
import * as yup from "yup";

import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setLogin } from "../../config/state";
import { store } from "../../config/store";
import image from "../../restaurant-image.jpeg";
import { get, update } from "../../services/restaurantService";
import { FormTextField } from "../commons/FormTextField";
import { PrimaryButton } from "../commons/PrimaryButton";
import { SecondaryButton } from "../commons/SecondaryButton";
import Title from "../commons/Title";
import Toast from "../commons/Toast";

const validationSchema = yup.object({
  email: yup
    .string("Enter Email ID")
    .email("Enter a valid email")
    .required("Email is required"),
  name: yup.string("Enter Restaurant Name").required("Email is required"),
  chefEmail: yup
    .string("Enter Chef's Email ID")
    .email("Enter a valid email")
    .required("Chef's email is required"),
  firstName: yup.string("Enter Owner's First "),
  lastName: yup.string("Enter Owner's Last Name"),
  mobileNumber: yup.string("Enter Chef's Email ID"),
  address: yup.string("Enter Chef's Email ID"),
  cuisines: yup
    .array()
    .of(yup.string("Enter cuisine").required("Enter cuisine name")),
});

const UserProfile = () => {
  const colors = tokens();

  const formRef = useRef();

  const [error, setError] = useState(null);

  const params = useParams();

  const dispatch = useDispatch();

  const [success, setSuccess] = useState(null);

  const [restaurant, setRestaurant] = useState({
    email: "",
    _id: "",
    name: "",
    firstName: "",
    lastName: "",
    chefEmail: "",
    mobileNumber: "",
    address: "",
    cuisines: [""],
  });

  useEffect(() => {
    const state = store.getState();

    // setState(state);

    get(params.id).then((res) => {
      const restaurant = res.data.restaurant;
      setRestaurant({
        email: restaurant.email,
        _id: restaurant._id,
        name: restaurant.name,
        firstName: restaurant.firstName,
        lastName: restaurant.lastName,
        chefEmail: restaurant.chef.email,
        mobileNumber: restaurant.mobileNumber,
        address: restaurant.address,
        cuisines: restaurant.cuisine.length ? restaurant.cuisine : [""],
      });


      const token = state.token;
      const role = state.role;

      dispatch(
        setLogin({
          restaurant: restaurant,
          token: token,
          role: role,
        })
      );
    });
  }, []);

  const addItem = () => {
    let cuisineList = [...formik.values.cuisines, ""];
    setRestaurant({ ...formik.values, cuisines: cuisineList });
  };

  const removeItem = (index) => {
    let itemList = { ...formik.values };

    let cuisines = [...itemList.cuisines]

    cuisines.splice(index, 1);
    itemList.cuisines = cuisines;
    formik.setValues(itemList);
    setRestaurant(itemList);
  };

  const formik = useFormik({
    initialValues: restaurant,
    enableReinitialize: true,
    validationSchema: validationSchema,
    innerRef: formRef,
    onSubmit: async (values) => {
      const state = store.getState();

      if (formik.initialValues == values) {
        setEditable(!isEditable);
        return;
      }

      const data = {
        id: params.id,
        name: values.name,
        email: values.email,
        chefEmail: values.chefEmail,
        firstName: values.firstName,
        lastName: values.lastName,
        mobileNumber: values.mobileNumber,
        address: values.address,
        cuisines: values.cuisines,
      };

      const res = await update(data);

      if (res.meta.status === "fail") {
        setError(res.meta.message);
        return;
      }

      const restaurant = res.data.restaurant;

      setRestaurant({
        email: restaurant.email,
        _id: restaurant._id,
        name: restaurant.name,
        firstName: restaurant.firstName,
        lastName: restaurant.lastName,
        chefEmail: restaurant.chef.email,
        mobileNumber: restaurant.mobileNumber,
        address: restaurant.address,
        cuisines: restaurant.cuisine,
      });

      setSuccess(res.meta.message);

      const token = state.token;
      const role = state.role;

      dispatch(
        setLogin({
          restaurant: restaurant,
          token: token,
          role: role,
        })
      );
      setEditable(!isEditable);
    },
  });

  const [isEditable, setEditable] = useState(false);

  return (
    <Box className="pageBackground">
      <Container maxWidth="xl">
        {error && (
          <Toast
            severity="error"
            message={error}
            open={true}
            onClose={() => setError(null)}
          />
        )}
        {success && (
          <Toast
            severity="success"
            message={success}
            open={true}
            onClose={() => setSuccess(null)}
          />
        )}
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <Title titleText="User Profile" />
            </Grid>

            <Grid item xs={12} md={4} sx={{}}>
              <Paper
                sx={{
                  width: "100%",
                  overflow: "hidden",
                  padding: "20px",
                  backgroundColor: colors.primary[500],
                }}
              >
                <CardContent sx={{ justifyContent: "center", display: "flex" }}>
                  <img
                    className="profile-image"
                    src={image}
                    alt="Profile"
                    loading="lazy"
                  />
                </CardContent>
                <CardActions
                  sx={{ justifyContent: "center", display: "flex", pt: 2 }}
                >
                  {isEditable ? (
                    <PrimaryButton type="submit" btnText="Update profile" />
                  ) : (
                    <SecondaryButton
                      onBtnClick={() => setEditable(!isEditable)}
                      btnText="Edit profile"
                    />
                  )}
                </CardActions>
              </Paper>
            </Grid>
            <Grid item xs={12} md={8}>
              <Paper
                sx={{
                  width: "100%",
                  overflow: "hidden",
                  padding: "20px",
                  backgroundColor: colors.primary[500],
                }}
              >
                <CardContent>
                  <Grid container>
                    <Grid item sm={12} xs={12}>
                      <Typography variant="h1" sx={{ paddingBottom: 3 }}>
                        Restaurant Details
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid container>
                    <Grid item sm={6} xs={12} sx={{ pb: 3, pr: 3 }}>
                      {isEditable ? (
                        <FormTextField
                          fieldName="name"
                          fieldLabel="Restaurant Name"
                          formik={formik}
                        />
                      ) : (
                        <>
                          <Typography variant="h3" sx={{ pb: 1 }}>
                            Restaurant Name
                          </Typography>
                          <Typography variant="h5">
                            {restaurant.name}
                          </Typography>
                        </>
                      )}
                    </Grid>

                    <Grid item sm={6} xs={12} sx={{ pb: 3, pr: 3 }}>
                      {isEditable ? (
                        <FormTextField
                          fieldName="email"
                          fieldLabel="Restaurant Email"
                          formik={formik}
                        />
                      ) : (
                        <>
                          <Typography variant="h3" sx={{ pb: 1 }}>
                            Restaurant Email
                          </Typography>
                          <Typography variant="h5">
                            {restaurant.email}
                          </Typography>
                        </>
                      )}
                    </Grid>

                    <Grid item sm={6} xs={12} sx={{ pb: 3, pr: 3 }}>
                      {isEditable ? (
                        <FormTextField
                          fieldName="chefEmail"
                          fieldLabel="Chef's Email"
                          formik={formik}
                        />
                      ) : (
                        <>
                          <Typography variant="h3" sx={{ pb: 1 }}>
                            Chef Email
                          </Typography>
                          <Typography variant="h5">
                            {restaurant.chefEmail}
                          </Typography>
                        </>
                      )}
                    </Grid>

                    <Grid item sm={12} xs={12}>
                      <Typography variant="h1" sx={{ paddingBottom: 3 }}>
                        Owner Details
                      </Typography>
                    </Grid>

                    <Grid item sm={6} xs={12} sx={{ pb: 3, pr: 3 }}>
                      {isEditable ? (
                        <FormTextField
                          fieldName="firstName"
                          fieldLabel="First Name"
                          formik={formik}
                        />
                      ) : (
                        <>
                          <Typography variant="h3" sx={{ pb: 1 }}>
                            First Name
                          </Typography>
                          <Typography variant="h5">
                            {restaurant.firstName}
                          </Typography>
                        </>
                      )}
                    </Grid>

                    <Grid item sm={6} xs={12} sx={{ pb: 3, pr: 3 }}>
                      {isEditable ? (
                        <FormTextField
                          fieldName="lastName"
                          fieldLabel="Last Name"
                          formik={formik}
                        />
                      ) : (
                        <>
                          <Typography variant="h3" sx={{ pb: 1 }}>
                            Last Name
                          </Typography>
                          <Typography variant="h5">
                            {restaurant.lastName}
                          </Typography>
                        </>
                      )}
                    </Grid>

                    <Grid item sm={6} xs={12} sx={{ pb: 3, pr: 3 }}>
                      {isEditable ? (
                        <FormTextField
                          fieldName="mobileNumber"
                          fieldLabel="Mobile Number"
                          formik={formik}
                        />
                      ) : (
                        <>
                          <Typography variant="h3" sx={{ pb: 1 }}>
                            Mobile Number
                          </Typography>
                          <Typography variant="h5">
                            {restaurant.mobileNumber}
                          </Typography>
                        </>
                      )}
                    </Grid>

                    <Grid item sm={6} xs={12} sx={{ pb: 3, pr: 3 }}>
                      {isEditable ? (
                        <FormTextField
                          fieldName="address"
                          fieldLabel="address"
                          formik={formik}
                        />
                      ) : (
                        <>
                          <Typography variant="h3" sx={{ pb: 1 }}>
                            Address
                          </Typography>
                          <Typography variant="h5">
                            {restaurant.address}
                          </Typography>
                        </>
                      )}
                    </Grid>

                    <Grid container>
                      <Grid item sm={12} xs={12}>
                        <Typography variant="h1" sx={{ paddingBottom: 3 }}>
                          Cuisines
                        </Typography>
                      </Grid>
                    </Grid>

                    {isEditable ? (
                      formik?.values?.cuisines?.map((order, index) => (
                        <>
                          <Grid item sm={6} xs={8} sx={{ pb: 3, pr: 3 }}>
                            <FormTextField
                              // fieldName={`cuisines[${index}]`}
                              fieldIndex={index}
                              fieldArrayKey="cuisines"
                              fieldLabel="Cuisine"
                              formik={formik}
                              isArray={true}
                            />
                          </Grid>
                          <Grid
                            item
                            xs={6}
                            sm={4}
                            sx={{ pb: 3, pr: 3 }}
                            display="flex"
                            alignItems="center"
                          >
                            {formik.values.cuisines.length - 1 === index ? (
                              <a onClick={addItem}>
                                <AddCircleIcon fontSize="large" />
                              </a>
                            ) : (
                              <a onClick={() => removeItem(index)}>
                                <RemoveCircleIcon fontSize="large" />
                              </a>
                            )}
                          </Grid>
                        </>
                      ))
                    ) : (
                      <>
                        <Grid container>
                          {formik.values.cuisines?.map((cuisine) => (
                            <Grid item xs={12} sx={{ pb: 3, pr: 3 }}>
                              <Typography variant="h3" sx={{ pb: 1 }}>
                                {cuisine}
                              </Typography>
                            </Grid>
                          ))}
                        </Grid>
                      </>
                    )}
                  </Grid>
                </CardContent>
              </Paper>
            </Grid>
          </Grid>
        </form>
      </Container>
    </Box>
  );
};

export default UserProfile;
