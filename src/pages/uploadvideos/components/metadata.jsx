import * as React from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { Paper, Typography } from '@mui/material';

export default function TextFieldHiddenLabel() {
  return (
    <Stack
      component="form"
      sx={{
        width: '25ch',
        justifyContent: 'center',
        textAlign:'center' // Center the items horizontally
      }}
      spacing={2}
      noValidate
      autoComplete="off"
    >
        <Typography sx={{ p: "15px", textAlign: "center",fontWeight:"bold", fontSize: "20px" }}>
            Add MetaData
        </Typography>
      <TextField
        hiddenLabel
        id="filled-hidden-label-small"
        defaultValue="Overall Rows"
        variant="filled"
        size="small"
      />
      <TextField
        hiddenLabel
        id="filled-hidden-label-small"
        defaultValue="Male Rows"
        variant="filled"
        size="small"
      />
      <TextField
        hiddenLabel
        id="filled-hidden-label-small"
        defaultValue="Female Rows"
        variant="filled"
        size="small"
      />
    </Stack>
  );
}
