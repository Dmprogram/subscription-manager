import classes from './UpcomingPayments.module.css';
import { UpcomingPaymentsItem } from '../UpcomingPaymentsItem/UpcomingPaymentsItem';
import { useAppSelector, useAppDispatch } from '../../hooks/ReduxHooks';
import { useEffect } from 'react';
import { fetchSubscriptionsList } from '../store/subscriptionsListSlice';
import { UpcomingPaymentsSkeleton } from '../UpcomingPaymentsSkeleton/UpcomingPaymentsSkeleton';
export const UpcomingPayments = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchSubscriptionsList());
  }, []);
  const { upcomingPayments, loading, error } = useAppSelector((state) => state.subscriptionsList);
  if (loading === 'pending')
    return (
      <section className={classes.payments}>
        <h3 className={classes.paymentsTitle}>UPCOMING PAYMENTS</h3>
        <UpcomingPaymentsSkeleton />
      </section>
    );
  return (
    <section className={classes.payments}>
      <h3 className={classes.paymentsTitle}>
        {upcomingPayments.length !== 0 ? 'UPCOMING PAYMENTS' : 'THERE IS NO UPCOMING PAYMENT'}
      </h3>
      {upcomingPayments.map((subscription) => (
        <UpcomingPaymentsItem key={subscription.id} {...subscription} />
      ))}
    </section>
  );
};
