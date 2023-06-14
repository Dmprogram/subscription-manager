import classes from './ActiveSubscriptions.module.css';
import { Link } from 'react-router-dom';
import { SubscriptionItem } from '../SubscriptionItem/SubscriptionItem';
import { useEffect } from 'react';
import { fetchSubscriptionsList } from '../store/subscriptionsListSlice';
import { useAppSelector, useAppDispatch } from '../../hooks/ReduxHooks';
import { SubscriptionsSkeleton } from '../SubscriptionsSkeleton/SubscriptionsSkeleton';
import { SelectSortType } from '../SelectSortType/SelectSortType';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { Subscription } from '../store/types';
export const ActiveSubscriptions = () => {
  const dispatch = useAppDispatch();
  const { activeSubscriptions, loading, error, inputSearch, searchSubsciptions } = useAppSelector(
    (state) => state.subscriptionsList
  );
  const [parent] = useAutoAnimate({
    duration: 300,
    easing: 'ease-in-out',
    disrespectUserMotionPreference: false,
  });

  useEffect(() => {
    dispatch(fetchSubscriptionsList());
  }, [dispatch]);

  if (loading === 'pending')
    return (
      <section className={classes.payments}>
        <header className={classes.header}>
          <h3>ACTIVE SUBSCRIPTIONS</h3>
        </header>
        <div className={classes.paymentsTitle}>
          <Link to='/new-subscription' className={classes.link}>
            Add new subscription
          </Link>
        </div>
        <SubscriptionsSkeleton />
      </section>
    );
  return inputSearch.length !== 0 ? (
    <section className={classes.payments}>
      <header className={classes.results}>
        <h3>SEARCH RESULTS</h3>
      </header>
      {searchSubsciptions.length > 0 ? (
        <div>
          {searchSubsciptions.map((subscription: Subscription) => (
            <SubscriptionItem key={subscription.id} {...subscription} />
          ))}
        </div>
      ) : (
        <div className={classes.subscriptionNotFound}>There is no such subscription</div>
      )}
    </section>
  ) : (
    <section className={classes.payments}>
      <header className={classes.header}>
        <h3>
          {activeSubscriptions.length !== 0
            ? 'ACTIVE SUBSCRIPTIONS'
            : 'THERE IS NO ACTIVE SUBSCRIPTION'}
        </h3>
      </header>
      <div className={classes.paymentsTitle}>
        <Link to='/new-subscription' className={classes.link}>
          Add new subscription
        </Link>
        {activeSubscriptions.length !== 0 ? (
          <div>
            <SelectSortType />
          </div>
        ) : null}
      </div>
      <div ref={parent}>
        {activeSubscriptions.map((subscription: Subscription) => (
          <SubscriptionItem key={subscription.id} {...subscription} />
        ))}
      </div>
    </section>
  );
};
