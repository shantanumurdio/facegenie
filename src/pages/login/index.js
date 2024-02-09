import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import * as Yup from "yup";
import { useFormik } from "formik";

import FacegenieLogo from "../../assets/FaceGenieLogo.webp";
import ResoluteaiLogo from "../../assets/resoluteai_logo.png";
import { InputField } from "../../components/Fields";
import { Typography } from "@mui/material";

const Login = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = (values) => {
    setIsSubmitting(true);
    navigate("/dashboard");
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => handleSubmit(values),
  });

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          bgcolor: "#fa2520",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          color: "#ffffff",
        }}
      >
        <Typography variant="h2" sx={{fontSize:"65px" , fontWeight:"bold"}}>Plant Sapling Counting</Typography>
      </Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 3,
            mx: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src={FacegenieLogo}
            alt="Facegenie Logo"
            style={{ width: "230px", marginTop: "130px" }}
          />
          <Typography sx={{ color: "grey", mt: "10px" }}>
            Connect with us, enter your details.
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={formik.handleSubmit}
            mt={2}
          >
            <Typography sx={{ mb: "-10px" }}>
              Email{" "}
              <Typography sx={{ color: "red", display: "inline" }}>
                *
              </Typography>
            </Typography>
            <InputField
              margin="normal"
              size="small"
              type="email"
              name="email"
              label="Enter email address"
              formik={formik}
            />
            <Typography sx={{ mb: "-10px" }}>
              Password{" "}
              <Typography sx={{ color: "red", display: "inline" }}>
                *
              </Typography>
            </Typography>
            <InputField
              margin="normal"
              size="small"
              type="password"
              name="password"
              label="Password"
              formik={formik}
            />
            {isSubmitting ? (
              <LoadingButton
                fullWidth
                loading
                variant="contained"
                sx={{ mt: 3, mb: 2, height: "50px", fontSize: "15px" }}
              >
                <span>Submit</span>
              </LoadingButton>
            ) : (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ my: "1rem", backgroundColor: "#fa2520" }}
              >
                Get Started
              </Button>
            )}
          </Box>
          <Box
            sx={{
              my: 3,
              mx: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography sx={{ fontWeight: "bold", color: "red" }}>
              Powerd By
            </Typography>
            <img
              src={ResoluteaiLogo}
              alt="Resoluteai Logo"
              style={{ width: "200px", marginTop: "5px" }}
            />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;
