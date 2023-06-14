export const formatExpenses = (expenses: number, currency: string) => {
  return expenses.toLocaleString('ru-RU', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
};
