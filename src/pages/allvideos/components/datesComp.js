import React, { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import Box from '@mui/material/Box';
import { TextField } from '@mui/material';

const YourComponent = () => {
  const [dateRange, setDateRange] = useState([null, null]);

  const handleDateChange = (newDateRange) => {
    setDateRange(newDateRange);
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateRangePicker
          startText="Start Date"
          endText="End Date"
          value={dateRange}
          onChange={handleDateChange}
          renderInput={(startProps, endProps) => (
            <>
              <TextField {...startProps} />
              <Box sx={{ mx: 2 }}> to </Box>
              <TextField {...endProps} />
            </>
          )}
        />
      </LocalizationProvider>
    </Box>
  );
};

export default YourComponent;
