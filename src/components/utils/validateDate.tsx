import dayjs, { Dayjs } from 'dayjs';

const today = dayjs();
const todayStartOfTheDay = today.startOf('day');
const maxDate = dayjs().add(366, 'day');

export const validateDate = (dayjs: Dayjs | null) => {
  if (maxDate - dayjs >= 0 && dayjs - todayStartOfTheDay >= 0) {
    return {
      day: dayjs.$D,
      month: dayjs.$M + 1,
      year: dayjs.$y,
    };
  } else {
    return null;
  }
};
