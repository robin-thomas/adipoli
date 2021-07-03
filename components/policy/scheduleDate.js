import { forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import { Box, TextField } from '@material-ui/core';
import format from 'date-fns/format';
import addDays from 'date-fns/addDays';

import 'react-datepicker/dist/react-datepicker.min.css';

const Calendar = forwardRef(({ label, date, setDate, onClick }, ref) => (
  <Box sx={{ mt: 2 }}>
    <TextField
      variant="standard"
      inputRef={ref}
      label={label}
      value={date ? format(date, 'EEE MMM d, yyyy') : ''}
      onFocus={onClick}
      fullWidth
    />
  </Box>
));

const ScheduleDate = ({ date, setDate, label }) => (
  <DatePicker
    selected={date}
    onChange={setDate}
    withPortal
    minDate={addDays(new Date(), 1)}
    maxDate={addDays(new Date(), 7)}
    onClickOutside={() => document.activeElement.blur()}
    customInput={<Calendar date={date} setDate={setDate} label={label} />}
  />
);

export default ScheduleDate;
