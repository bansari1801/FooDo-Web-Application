// ==========================================
//  Author: Khushalkumar Gondaliya
// ==========================================

import { Box, Container, Grid, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { register } from "../../services/restaurantService";
import { tokens } from "../../Theme";
import { FormTextField } from "../commons/FormTextField";
import { PrimaryButton } from "../commons/PrimaryButton";
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
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
  chefPassword: yup
    .string("Enter your chef's password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

const Register = () => {
  const colors = tokens();
  const navigate = useNavigate();

  const [error, setError] = useState(null);

  const [success, setSuccess] = useState(null);

  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      chefEmail: "",
      password: "",
      chefPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const res = await register(values);

      if (res.meta.status === "success") {
        setSuccess(res.meta.message);
        navigate("/login");
      }
      if (res.meta.status === "fail") {
        setError(res.meta.message);
      }
    },
  });

  const onCloseToast = () => {
    setError(null);
  };

  return (
    <div style={{ padding: 30 }}>
      <Box className="Dialog" sx={{ backgroundColor: colors.primary[500] }}>
        <Container>
          {error && (
            <Toast
              severity="error"
              message={error}
              open={true}
              onClose={onCloseToast}
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
            <Grid
              container
              spacing={3}
              direction={"column"}
              justify={"center"}
              alignItems={"center"}
            >
              <Grid item xs={12}>
                <Typography variant="h1">FooDo</Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h3">REGISTER</Typography>
              </Grid>
              <Grid item xs={12}>
                <FormTextField
                  fieldName="name"
                  fieldLabel="Restaurant Name"
                  formik={formik}
                />
              </Grid>
              <Grid item xs={12}>
                <FormTextField
                  fieldName="email"
                  fieldLabel="Email"
                  formik={formik}
                />
              </Grid>
              <Grid item xs={12}>
                <FormTextField
                  fieldName="chefEmail"
                  fieldLabel="Chef's Email"
                  formik={formik}
                />
              </Grid>
              <Grid item xs={12}>
                <FormTextField
                  fieldName="password"
                  type="password"
                  fieldLabel="Restaurant Password"
                  formik={formik}
                />
              </Grid>
              <Grid item xs={12}>
                <FormTextField
                  fieldName="chefPassword"
                  type="password"
                  fieldLabel="Chef's Password"
                  formik={formik}
                />
              </Grid>
              <Grid item xs={12}>
                <PrimaryButton type="submit" btnText="REGISTER" />
              </Grid>
              <Grid item xs={12}>
                <Typography color="neutral">
                  <a href="/login">
                    <u>If already a user?</u>
                  </a>
                </Typography>
              </Grid>
            </Grid>
          </form>
        </Container>
      </Box>
    </div>
  );
};

export default Register;
