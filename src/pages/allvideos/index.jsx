import React from "react";
import Layout from "../../layout";
import DatesComp from "./components/datesComp";
import DataGrid from "./components/dataGrid"
import { Button, Grid, Typography } from "@mui/material";

const index = () => {
  return (
    <Layout>
      <Typography
        sx={{
          textAlign: "center",
          margin: "40px",
          fontWeight: "bold",
          fontSize: "30px",
        }}  
      >
        Analyzed Videos
      </Typography>
      <Grid container component="main" sx={{ justifyContent: "space-around" }}>
        <Grid item xs={12} sm={6} md={5} sx={{display:"flex" ,textAlign: "left" }}>
          <DatesComp  />{" "}
          <Button sx={{ml:"25px", p:"15px",fontWeight: "bold",backgroundColor: "#fa2520",color: "#fff","&:hover": {
                backgroundColor: "#d31414",
              },}}>
            Filter
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={5} sx={{ textAlign: "right" }}>
          <Button
            sx={{
              width: "250px",
              padding: "15px",
              fontWeight: "bold",
              backgroundColor: "#fa2520",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#d31414",
              },
            }}
          >
            Download Report
          </Button>
        </Grid>
      </Grid>

      <Grid container component="main" sx={{ justifyContent: "space-around" }}>
        <Grid sx={{marginTop:"30px"}}>
          <DataGrid/>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default index;
