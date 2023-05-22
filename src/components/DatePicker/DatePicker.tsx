import { useState, useMemo } from 'react';

import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateValidationError } from '@mui/x-date-pickers/models';
import 'dayjs/locale/en-gb';
import classes from './DatePicker.module.css';
import { validateDate } from '../utils/validateDate';

const today = dayjs();
const todayStartOfTheDay = today.startOf('day');
const maxDate = dayjs().add(366, 'day');

export const DatePick = ({ setFieldValue, values }) => {
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
        return <div className={classes.clue}>Please select a date from today to one year</div>;
      }
    }
  }, [error]);
  return (
    <div className={classes.container}>
      <div className={classes.pickerContainer}>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='en-gb'>
          <DatePicker
            className={classes.picker}
            onError={(newError) => setError(newError)}
            formatDensity='spacious'
            value={
              values.date
                ? dayjs(`${values.date.year}-${values.date.month}-${values.date.day}`)
                : values.dayjs
            }
            onChange={(value) => {
              setFieldValue('date', validateDate(value), true);
              setFieldValue('dayjs', value, true);
            }}
            orientation='portrait'
            slotProps={{
              textField: {
                size: 'small',
                id: 'datePicker',
              },
            }}
            minDate={todayStartOfTheDay}
            maxDate={maxDate}
          />
        </LocalizationProvider>
      </div>
      <div className={classes.error}>{errorMessage}</div>
    </div>
  );
};
