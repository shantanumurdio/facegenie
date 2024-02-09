import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { Box, Typography } from '@mui/material';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const InputFileUpload = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  return (
    <Box >
      <Typography sx={{ p: "20px", textAlign: "center",fontWeight:"bold", fontSize: "20px" }}>
        Upload Input Videos
      </Typography>
      <Box sx={{ position: 'relative' }}>
        {!file && (
          <Typography
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginLeft:"30px",
              transform: 'translate(-50%, -50%)',
            }}
          >
            No file chosen
          </Typography>
        )}
        <Button
          component="label"
          variant="contained"
          sx={{
            p: '10px',
            ml: '50px',
            width: '150px',
            textAlign: 'center',
            ...(file && { pl: '30px' }), // Adjust padding-left if file is chosen
          }}
        >
          Choose File
          <VisuallyHiddenInput type="file" onChange={handleFileChange} />
        </Button>
      </Box>
    </Box>
  );
};

export default InputFileUpload;
