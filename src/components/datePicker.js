import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

export default function Calendar({ DateValue, handleSelectDate }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker
          value={DateValue}
          onChange={handleSelectDate}  
          format="DD/MM/YYYY"
          shouldDisableDate={(date) => date.isBefore(dayjs(), 'day')} 
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
