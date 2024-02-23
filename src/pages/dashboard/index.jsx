import React from "react";
import Layout from "../../layout";
import ImgMediaCard from "./components/cards";
import { Grid, Paper } from "@mui/material";
import Graph from "./components/graph";
import Pie from "./components/pie";

const index = () => {
  return (
    <Layout>
      <Grid container sx={{ display: "flex", justifyContent: "space-around" }}>
        <Grid item sx={{ width: "230px", textAlign: "center" }}>
          <ImgMediaCard title="Uploaded Videos" count={256} />
        </Grid>
        <Grid item sx={{ width: "230px", textAlign: "center" }}>
          <ImgMediaCard title="Total Views" count={12345} />
        </Grid>
        <Grid item sx={{ width: "230px", textAlign: "center" }}>
          <ImgMediaCard title="Likes" count={500} />
        </Grid>
        <Grid item sx={{ width: "230px", textAlign: "center" }}>
          <ImgMediaCard title="Comments" count={42} />
        </Grid>
      </Grid>

      <Grid
        container
        justifyContent="center"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "50px",
        }}
      >
        <Paper elevation={6} square sx={{ width: "47%" }}>
          <Grid item>
            <Graph />
          </Grid>
        </Paper>
        <Paper elevation={6} square sx={{ width: "47%" }}>
          <Grid container justifyContent="center" alignItems="center">
            <Grid item sx={{ marginTop: "80px" }}>
              <Pie />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Layout>
  );
};

export default index;
