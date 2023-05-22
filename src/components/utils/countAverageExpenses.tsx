const countAverageExpensesByCurrency = (fetchedSubscriptions, currency) => {
  return fetchedSubscriptions.reduce((sum, item) => {
    if (item.currency === currency) {
      return item.paymentFrequency === 'once a year' ? sum + item.price / 12 : sum + item.price;
    }
    return sum;
  }, null);
};

export const countAverageExpenses = (fetchedSubscriptions) => {
  const averageExpensesRub = countAverageExpensesByCurrency(fetchedSubscriptions, 'RUB');

  const averageExpensesUsd = countAverageExpensesByCurrency(fetchedSubscriptions, 'USD');

  const averageExpensesEur = countAverageExpensesByCurrency(fetchedSubscriptions, 'EUR');

  return {
    averageExpensesRub,
    averageExpensesUsd,
    averageExpensesEur,
  };
};
