import React from "react";
import Layout from "../../layout";
import Card from "./components/cards";
import { Grid, Paper } from "@mui/material";
import Graph from "./components/graph";
import Pie from "./components/pie"

const index = () => {
  return (
    <Layout>
      <Grid sx={{ display: "flex", justifyContent: "space-around" }}>
        <Card />
        <Card />
        <Card />
        <Card />
      </Grid>

      <Paper elevation={6} square sx={{marginTop:"50px"}}>
      <Grid sx={{display:"flex"}}>
        <Grid>
        <Graph />
        </Grid>

        <Grid sx={{ marginTop:"100px"}}>
        <Pie />
        </Grid>
      </Grid>
      </Paper>
      
    </Layout>
  );
};

export default index;
