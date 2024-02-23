import * as React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Typography } from "@mui/material";

export default function CheckboxLabels() {
  return (
    <FormGroup>
      <Typography sx={{ p: "20px", fontWeight: "bold", fontSize: "20px" }}>
        Confirm Embedded
      </Typography>
      <FormControlLabel
        control={<Checkbox defaultChecked />}
        label="Latitude Embedded"
      />
      <FormControlLabel
        control={<Checkbox defaultChecked />}
        label="Longitude Embedded"
      />
      <FormControlLabel
        control={<Checkbox defaultChecked />}
        label="Altitude Embedded"
      />
    </FormGroup>
  );
}
