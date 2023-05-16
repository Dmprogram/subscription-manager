import classes from './UpcomingPayments.module.css';
import { UpcomingPaymentsItem } from '../UpcomingPaymentsItem/UpcomingPaymentsItem';
import { useAppSelector, useAppDispatch } from '../../hooks/ReduxHooks';
import { useEffect } from 'react';
import { fetchSubscriptionsList } from '../store/subscriptionsListSlice';
import { Spinner } from '../Spinner/Spinner';
export const UpcomingPayments = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchSubscriptionsList());
  }, []);
  const { subscriptions, loading, error } = useAppSelector((state) => state.subscriptionsList);
  if (loading === 'pending') return <Spinner />;
  return (
    <section className={classes.payments}>
      <h3 className={classes.paymentsTitle}>UPCOMING PAYMENTS</h3>
      {subscriptions.map((subscription) => (
        <UpcomingPaymentsItem key={subscription.id} {...subscription} />
      ))}
    </section>
  );
};
