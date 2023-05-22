export const formatExpenses = (expenses, currency) => {
  return expenses.toLocaleString('ru-RU', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
};
