import { useState, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/ReduxHooks';
import { addSubDate } from '../store/subscriptionSlice';
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

const formatDate = (dayjs: Dayjs | null) => {
  return !!dayjs
    ? {
        day: dayjs.$D,
        month: dayjs.$M + 1,
        year: dayjs.$y,
      }
    : null;
};
export const DatePick = () => {
  const dispatch = useAppDispatch();
  const date = useAppSelector((state) => state.subscription.subscription.date);
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

  return (
    <div className={classes.container}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='en-gb'>
        <DatePicker
          className={classes.datePicker}
          onError={(newError) => setError(newError)}
          formatDensity='spacious'
          value={date && dayjs(`${date.year}-${date.month}-${date.day}`)}
          onChange={(value) => dispatch(addSubDate({ date: formatDate(value) }))}
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
