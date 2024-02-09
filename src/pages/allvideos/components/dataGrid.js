import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import Modal from "@mui/material/Modal";
import { Button, Grid, Paper, TextField, Typography } from "@mui/material";

const columns = [
  { field: "id", headerName: "S.NO", width: 110 },
  { field: "date", headerName: "Date", width: 110, editable: true },
  { field: "time", headerName: "Time", width: 110, editable: true },
  {
    field: "sessionName",
    headerName: "Session Name",
    type: "number",
    width: 110,
    editable: true,
  },
  {
    field: "totalCount",
    headerName: "Total Count",
    width: 110,
    sortable: false,
  },
  { field: "maleCount", headerName: "Male Count", width: 110, sortable: false },
  {
    field: "femaleCount",
    headerName: "Female Count",
    width: 110,
    sortable: false,
  },
  { field: "totalLaps", headerName: "Total Laps", width: 110, sortable: false },
  { field: "video", headerName: "Video", width: 110, sortable: false },
  { field: "report", headerName: "Report", width: 110, sortable: false },
];

const rows = [
  {
    id: 1,
    date: "2024-02-01",
    time: "10:00:00",
    sessionName: "Sess_1",
    totalCount: 300,
    maleCount: 150,
    femaleCount: 150,
    totalLaps: 12,
    video: "Play",
    report: "Download",
  },
  {
    id: 2,
    date: "2024-02-02",
    time: "11:30:00",
    sessionName: "Sess_2",
    totalCount: 300,
    maleCount: 150,
    femaleCount: 150,
    totalLaps: 12,
    video: "Inprocess",
    report: "Download",
  },
  // Add more rows as needed
];

export default function DataGridDemo({ handlePlayVideo }) {
  const [openModal, setOpenModal] = React.useState(false);
  const [selectedVideo, setSelectedVideo] = React.useState(null);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handlePlay = (event, params) => {
    event.preventDefault();
    setSelectedVideo(
      "https://www.youtube.com/embed/lA4hgkaaWHc?si=x80wMKY4_J4ucHVh"
    );
    setOpenModal(true);
  };

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns.map((column) => ({
          ...column,
          renderCell: (params) =>
            column.field === "video" ? (
              <a href="#" onClick={(event) => handlePlay(event, params)}>
                Play
              </a>
            ) : (
              <div>{params.value}</div>
            ),
        }))}
        pageSize={5}
        checkboxSelection
        disableRowSelectionOnClick
      />
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="play-video-modal-title"
        aria-describedby="play-video-modal-description"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            backgroundColor: "white",
            p: 2,
            outline: "none",
            width: "80%",
            maxWidth: "80vw", 
            height:"80%",
            height:"80vh",
          }}
        >
          <p id="play-video-modal-description">Video: {selectedVideo}</p>
          {/* Embed video using iframe */}
          <iframe
            width="100%"
            height="315"
            src={selectedVideo}
            title="Embedded Video"
            allowFullScreen
          ></iframe>

          <Paper elevation={6} square>
            <Grid
              container
              spacing={2}
              justifyContent="center"
              marginTop="10px"
            >
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    p: 2,
                  }}
                >
                  <Typography>Total Saplings</Typography>
                  <TextField size="small" variant="outlined" />
                  <Typography>Laps</Typography>
                  <TextField size="small" variant="outlined" />
                  <Button sx={{backgroundColor:"#fa2520"}}>Download Report</Button>
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    p: 2,
                  }}
                >
                  <Typography>Male Saplings</Typography>
                  <TextField size="small" variant="outlined" sx={{marginLeft:"28px"}}  />
                  <Typography sx={{marginRight:"30px"}}>Female Saplings</Typography>
                  <TextField size="small" variant="outlined" sx={{marginLeft:"-100px"}} />
                  <Button sx={{backgroundColor:"#fa2520"}}>Download Report</Button>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Modal>
    </Box>
  );
}
