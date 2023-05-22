import { sortPaymentsToOldest } from './sortPaymentsToOldest';

const currency = {
  RUB: 1,
  USD: 2,
  EUR: 3,
};

const sortPaymentsToNew = (fetchedSubscriptions) => {
  const sortedArr = [...fetchedSubscriptions].sort((a, b) => {
    const timeA = new Date(`${a.date.year}-${a.date.month}-${a.date.day}`).getTime();
    const timeB = new Date(`${b.date.year}-${b.date.month}-${b.date.day}`).getTime();
    const sortByPaymentsDate = timeB - timeA;
    if (sortByPaymentsDate === 0) {
      return a.creationTime - b.creationTime;
    }
    return sortByPaymentsDate;
  });
  return sortedArr;
};

const sortPaymentsToLow = (fetchedSubscriptions) => {
  return [...fetchedSubscriptions].sort((a, b) => {
    const sortByCurrency = currency[a.currency] - currency[b.currency];
    if (sortByCurrency === 0 && !!a.currency && !!b.currency) {
      return b.price - a.price;
    }
    return sortByCurrency;
  });
};

const sortPaymentsToHigh = (fetchedSubscriptions) => {
  return [...fetchedSubscriptions].sort((a, b) => {
    const sortByCurrency = currency[a.currency] - currency[b.currency];
    if (sortByCurrency === 0 && !!a.currency && !!b.currency) {
      return a.price - b.price;
    }
    return sortByCurrency;
  });
};

const sortPaymentsToZ = (fetchedSubscriptions) => {
  return [...fetchedSubscriptions].sort((a, b) => {
    return a.name > b.name ? 1 : -1;
  });
};

const sortPaymentsToA = (fetchedSubscriptions) => {
  return [...fetchedSubscriptions].sort((a, b) => {
    return b.name > a.name ? 1 : -1;
  });
};

export const sortByParameter = (fetchedSubscriptions, parameter) => {
  switch (parameter) {
    case null:
      return fetchedSubscriptions;
    case 'dateToOld':
      return sortPaymentsToOldest(fetchedSubscriptions, fetchedSubscriptions.length);
    case 'dateToNew':
      return sortPaymentsToNew(fetchedSubscriptions);
    case 'priceToHigh':
      return sortPaymentsToHigh(fetchedSubscriptions);
    case 'priceToLow':
      return sortPaymentsToLow(fetchedSubscriptions);
    case 'alphabetToZ':
      return sortPaymentsToZ(fetchedSubscriptions);
    case 'alphabetToA':
      return sortPaymentsToA(fetchedSubscriptions);
  }
};

// import { Account } from '../types';
// const products = {
//   debit: 1,
//   credit: 2,
//   external: 3,
//   saving: 4,
//   loan: 5,
// };
// const currency = {
//   RUB: 1,
//   USD: 2,
//   EUR: 3,
//   GBP: 4,
// };

// export const sortAccounts = (accounts: Array<Account>): Array<Account> => {
//   return [...accounts].sort((a, b) => {
//     const sortByProducts =
//       products[a.type as keyof typeof products] - products[b.type as keyof typeof products];
//     if (sortByProducts === 0 && !!a.currency && !!b.currency) {
//       return (
//         currency[a.currency as keyof typeof currency] -
//         currency[b.currency as keyof typeof currency]
//       );
//     }
//     return sortByProducts;
//   });
// };
