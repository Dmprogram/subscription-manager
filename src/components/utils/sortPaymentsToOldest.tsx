export const sortPaymentsToOldest = (fetchedSubscriptions, amount) => {
  if (fetchedSubscriptions.length === 0) return fetchedSubscriptions;
  const sortedArr = [...fetchedSubscriptions].sort((a, b) => {
    const timeA = new Date(`${a.date.year}-${a.date.month}-${a.date.day}`).getTime();
    const timeB = new Date(`${b.date.year}-${b.date.month}-${b.date.day}`).getTime();
    const sortByPaymentsDate = timeA - timeB;
    if (sortByPaymentsDate === 0) {
      return b.creationTime - a.creationTime;
    }
    return sortByPaymentsDate;
  });

  sortedArr.length = amount;
  return sortedArr;
};
