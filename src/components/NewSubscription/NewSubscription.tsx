import { collection, addDoc } from 'firebase/firestore';
import { db, auth } from '../../firebase';
import { useAppDispatch, useAppSelector } from '../../hooks/ReduxHooks';
import {
  addSubName,
  addSubCurrency,
  addSubPrice,
  addSubPaymentFrequency,
  clearField,
} from '../store/subscriptionSlice';
import classes from './NewSubscription.module.css';
import { DatePick } from '../DatePicker/DatePicker';
import { useEffect } from 'react';

export const NewSubscription = () => {
  const { uid } = auth.currentUser;

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(clearField());
  }, []);
  const { name, price, currency, paymentFrequency, date } = useAppSelector(
    (state) => state.subscription.subscription
  );

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = ev.target;
    switch (name) {
      case 'name':
        dispatch(addSubName({ name: value }));
        break;
      case 'price':
        dispatch(addSubPrice({ price: value }));
        break;
      case 'currency':
        dispatch(addSubCurrency({ currency: value }));
        break;
      case 'paymentFrequency':
        dispatch(addSubPaymentFrequency({ paymentFrequency: value }));
        break;
    }
  };

  const addNewSubscription = async (ev: React.FormEvent) => {
    ev.preventDefault();
    dispatch(clearField());
    try {
      await addDoc(collection(db, 'users', uid, 'subscriptions'), {
        name,
        price,
        date,
        currency,
        paymentFrequency,
      });
    } catch (e) {
      console.error('Error adding subscription: ', e);
    }
  };

  return (
    <section className={classes.container}>
      <h2 className={classes.header}>New Subscription</h2>
      <form className={classes.form}>
        <label htmlFor='name'>Name</label>
        <input
          className={classes.input}
          type='text'
          name='name'
          id='name'
          placeholder='Spotify'
          value={name}
          onChange={(ev) => handleChange(ev)}
        />
        <label htmlFor='price'>Price</label>
        <input
          className={classes.input}
          type='text'
          name='price'
          id='price'
          placeholder='200'
          value={price}
          onChange={(ev) => handleChange(ev)}
        />
        <div>Next payment</div>
        <DatePick />
        <label htmlFor='currency'>Currency</label>
        <input
          className={classes.input}
          type='text'
          name='currency'
          id='currency'
          placeholder='USD, EUR, RUB'
          value={currency}
          onChange={(ev) => handleChange(ev)}
        />
        <label htmlFor='paymentFrequency'>Payment frequency</label>
        <select
          className={classes.input}
          id='frequepaymentFrequencyncy'
          name='paymentFrequency'
          value={paymentFrequency}
          onChange={(ev) => handleChange(ev)}
        >
          <option value='month'>once a month</option>
          <option value='year'>once a year</option>
        </select>
        <div className={classes.inputSubmitLink}>
          <input
            name='submit'
            type='submit'
            value='Add new subscription'
            className={classes.inputSubmit}
            onClick={(ev) => addNewSubscription(ev)}
          />
        </div>
      </form>
    </section>
  );
};
