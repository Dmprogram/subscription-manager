import dayjs from 'dayjs';

const today = dayjs();
export const todayStartOfTheDay = today.startOf('day');
export const maxDate = dayjs().add(366, 'day');

export const validateDate = (dayjs) => {
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
