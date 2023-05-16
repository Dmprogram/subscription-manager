import classes from './Subscriptions.module.css';
import { Link } from 'react-router-dom';
import { SubscriptionItem } from '../SubscriptionsItem/SubscriptionItem';
import { useEffect } from 'react';
import { fetchSubscriptionsList } from '../store/subscriptionsListSlice';
import { useAppSelector, useAppDispatch } from '../../hooks/ReduxHooks';
import { Spinner } from '../Spinner/Spinner';
export const Subscriptions = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchSubscriptionsList());
  }, []);
  const { subscriptions, loading, error } = useAppSelector((state) => state.subscriptionsList);
  if (loading === 'pending') return <Spinner />;
  return (
    <section className={classes.payments}>
      <header className={classes.header}>
        <h3 className={classes.paymentsTitle}>ALL SUBSCRIPTIONS</h3>
        <Link to='/new-subscription' className={classes.link}>
          Add new subscription
        </Link>
      </header>
      {subscriptions.map((subscription) => (
        <SubscriptionItem key={subscription.id} {...subscription} />
      ))}
    </section>
  );
};
