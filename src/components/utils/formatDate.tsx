export const formatDate = (year, month, day) => {
  const formatDay = day < 10 ? `0${day}` : day;
  const getMonth = new Date(year, month - 1, day);
  const formatMonth = getMonth.toLocaleString('default', { month: 'long' });
  return {
    formatDay,
    formatMonth,
  };
};
