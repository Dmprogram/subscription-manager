import { useState, useMemo } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateValidationError } from '@mui/x-date-pickers/models';
import 'dayjs/locale/en-gb';
import classes from './DatePicker.module.css';

const today = dayjs();
const todayStartOfTheDay = today.startOf('day');
const maxDate = dayjs().add(366, 'day');

export const DatePick = () => {
  const [error, setError] = useState<DateValidationError | null>(null);

  const errorMessage = useMemo(() => {
    switch (error) {
      case 'maxDate':
      case 'minDate': {
        return 'Please select a date from today to one year';
      }

      case 'invalidDate': {
        return 'Your date is not valid';
      }

      default: {
        return '';
      }
    }
  }, [error]);

  const [value, setValue] = useState<Dayjs | null>(null);
  return (
    <div className={classes.container}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='en-gb'>
        <DatePicker
          className={classes.datePicker}
          onError={(newError) => setError(newError)}
          formatDensity='spacious'
          value={value}
          onChange={(newValue) => setValue(newValue)}
          orientation='portrait'
          slotProps={{
            textField: {
              helperText: errorMessage,
              size: 'small',
            },
          }}
          minDate={todayStartOfTheDay}
          maxDate={maxDate}
        />
      </LocalizationProvider>
    </div>
  );
};
