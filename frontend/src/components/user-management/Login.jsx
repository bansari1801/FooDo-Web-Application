// ==========================================
//  Author: Khushalkumar Gondaliya
// ==========================================

import { Box, Container, Grid, Typography } from "@mui/material";
import { useFormik } from "formik";
import { createRef, useState } from "react";
import { useDispatch } from "react-redux";
import * as yup from "yup";

import "./style.css";

import { useNavigate } from "react-router";
import { tokens } from "../../Theme";

import { setLogin } from "../../config/state";
import { store } from "../../config/store";
import { login } from "../../services/loginService";
import { FormTextField } from "../commons/FormTextField";
import { PrimaryButton } from "../commons/PrimaryButton";
import Toast from "../commons/Toast";

const validationSchema = yup.object({
  email: yup
    .string("Enter Email ID")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

const Login = () => {
  const colors = tokens();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [error, setError] = useState(null);

  const [success, setSuccess] = useState(null);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const res = await login(values.email, values.password);
      if (res.meta.status === "success") {
        dispatch(
          setLogin({
            restaurant: res.data.restaurant,
            token: res.data.token,
            role: res.data.loginRole,
          })
        );
        setSuccess(res.meta.message);
        navigate("/order");
      }
      if (res.meta.status === "fail") {
        setError(res.meta.message);
      }
    },
  });

  return (
    <div style={{ padding: 30 }}>
      <Box className="Dialog" sx={{ backgroundColor: colors.primary[500] }}>
        <Container>
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
                <Typography variant="h3">LOGIN</Typography>
              </Grid>

              <Grid item xs={12}>
                <FormTextField
                  fieldName="email"
                  fieldLabel="Email Name"
                  formik={formik}
                />
              </Grid>
              <Grid item xs={12}>
                <FormTextField
                  fieldName="password"
                  type="password"
                  fieldLabel="Password"
                  formik={formik}
                />
              </Grid>
              <Grid item xs={12}>
                <PrimaryButton type="submit" btnText="LOGIN" />
              </Grid>
              <Grid item xs={12}>
                <Typography color="neutral">
                  <a href="/register">
                    <u>If not a user?</u>
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

export default Login;
