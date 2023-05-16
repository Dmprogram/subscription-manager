import classes from './EditSubscription.module.css';
import { DatePick } from '../DatePicker/DatePicker';
import cancel from '../../assets/cancel.png';
import { useAppSelector, useAppDispatch } from '../../hooks/ReduxHooks';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { fetchSubscriptionsList } from '../store/subscriptionsListSlice';
import { Spinner } from '../Spinner/Spinner';
import {
  addSubName,
  addSubCurrency,
  addSubPrice,
  addSubPaymentFrequency,
  clearField,
  fillDataSub,
} from '../store/subscriptionSlice';
import { doc, setDoc, deleteDoc } from 'firebase/firestore';
import { db, auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
export const EditSubscription = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { subscriptionId } = useParams();

  const { subscriptions, loading, error } = useAppSelector((state) => state.subscriptionsList);
  const subscription = subscriptions.find((el) => el.id === subscriptionId);
  const { name, price, currency, paymentFrequency, date, id } = useAppSelector(
    (state) => state.subscription.subscription
  );
  useEffect(() => {
    dispatch(fetchSubscriptionsList());
    dispatch(fillDataSub({ data: subscription }));
  }, [subscriptions.length]);

  const deleteSubscription = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        await deleteDoc(doc(db, 'users', user.uid, 'subscriptions', id));
        navigate('/subscriptions');
        dispatch(clearField());
      } catch (e) {
        console.error('Error delete subscription: ', e);
      }
    }
  };

  const editSubscription = async (ev: React.FormEvent) => {
    ev.preventDefault();

    const user = auth.currentUser;
    if (user) {
      try {
        await setDoc(doc(db, 'users', user.uid, 'subscriptions', id), {
          name,
          price,
          date,
          currency,
          paymentFrequency,
        });
        navigate('/subscriptions');
        dispatch(clearField());
      } catch (e) {
        console.error('Error adding subscription: ', e);
      }
    }
  };

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

  if (loading === 'pending') return <Spinner />;

  return (
    <section className={classes.container}>
      <h2 className={classes.header}>Edit your subscription</h2>
      <form className={classes.form}>
        <label htmlFor='name'>Name</label>
        <input
          className={classes.input}
          type='text'
          name='name'
          id='name'
          placeholder={name}
          value={name}
          onChange={(ev) => handleChange(ev)}
        />
        <label htmlFor='price'>Price</label>
        <input
          className={classes.input}
          type='text'
          name='price'
          id='price'
          placeholder={price}
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
          placeholder={currency}
          value={currency}
          onChange={(ev) => handleChange(ev)}
        />
        <label htmlFor='paymentFrequency'>Payment frequency</label>
        <select
          className={classes.input}
          id='paymentFrequency'
          name='paymentFrequency'
          value={paymentFrequency}
          onChange={(ev) => handleChange(ev)}
        >
          <option>once a month</option>
          <option>once a year</option>
        </select>
        <div className={classes.submit}>
          <input
            type='submit'
            value='Edit your subscription'
            className={classes.inputSubmit}
            onClick={(ev) => {
              editSubscription(ev);
            }}
          />
        </div>
        <div className={classes.delete} onClick={() => deleteSubscription()}>
          <div className={classes.deleteSubscription}>
            <img src={cancel} alt='cancel' className={classes.cancel} />
            <span>Cancel Subscription</span>
          </div>
        </div>
      </form>
    </section>
  );
};
