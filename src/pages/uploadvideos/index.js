import React from "react";
import Layout from "../../layout";
import { styled } from "@mui/material/styles";
import InputFileUpload from "./components/InputFileUpload";
import UploadSRT from "./components/uploadSRT";
import MetaData from "./components/metadata";
import CheckBox from "./components/checkbox";
import Paper from "@mui/material/Paper";
import { Button, Grid, Typography } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

const index = () => {
  return (
    <Layout>
      <CssBaseline />
      <Typography
        sx={{
          textAlign: "center",
          margin: "30px",
          fontWeight: "bold",
          fontSize: "30px",
        }}
      >
        Upload Your Videos
      </Typography>
      <Grid container component="main" sx={{ justifyContent: "space-around" }}>
        <Grid item xs={12} sm={6} md={5} component={Paper} elevation={6} square>
          <InputFileUpload />
        </Grid>
        <Grid item xs={12} sm={6} md={5} component={Paper} elevation={6} square>
          <UploadSRT />
        </Grid>
      </Grid>
      <Grid
        container
        component="main"
        sx={{ justifyContent: "space-around", marginTop: "100px" }}
      >
        <Grid item xs={12} sm={6} md={5} component={Paper} elevation={6} square>
          <MetaData />
        </Grid>
        <Grid item xs={12} sm={6} md={5} component={Paper} elevation={6} square>
          <CheckBox />
        </Grid>
      </Grid>

      <Button
        sx={{
          padding: "15px",
          backgroundColor: "#fa2520",
          marginLeft: "auto",
          marginRight: "auto",
          display: "block",
          marginTop: "50px",
          width: "250px",
          color: "#fff",
          fontWeight: "bold",
          "&:hover": {
            backgroundColor: "#ff6347",
          },
        }}
      >
        UPLOAD VIDEOS
      </Button>
    </Layout>
  );
};

export default index;
