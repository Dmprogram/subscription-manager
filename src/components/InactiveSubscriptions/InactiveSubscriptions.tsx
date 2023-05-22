import classes from './InactiveSubscriptions.module.css';
import { SubscriptionItem } from '../ActiveSubscriptionsItem/ActiveSubscriptionItem';
import { useEffect } from 'react';
import { fetchSubscriptionsList } from '../store/subscriptionsListSlice';
import { useAppSelector, useAppDispatch } from '../../hooks/ReduxHooks';
import { SubscriptionsSkeleton } from '../SubscriptionsSkeleton/SubscriptionsSkeleton';
import { SelectSortType } from '../SelectSortType/SelectSortType';
import { InactiveSubscriptionItem } from '../InactiveSubscriptionItem/InactiveSubscriptionItem';
export const InactiveSubscriptions = () => {
  const dispatch = useAppDispatch();
  const { inactiveSubscriptions, loading, error, inputSearch, searchSubsciptions } = useAppSelector(
    (state) => state.subscriptionsList
  );

  useEffect(() => {
    dispatch(fetchSubscriptionsList());
  }, []);

  if (loading === 'pending')
    return (
      <section className={classes.payments}>
        <header className={classes.header}>
          <h3>DEACTIVATED SUBSCRIPTIONS</h3>
        </header>
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
          {searchSubsciptions.map((subscription) => (
            <InactiveSubscriptionItem key={subscription.id} {...subscription} />
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
          {inactiveSubscriptions.length !== 0
            ? 'DEACTIVATED SUBSCRIPTIONS'
            : 'THERE IS NO DEACTIVATED SUBSCRIPTION'}
        </h3>
      </header>
      <div className={classes.paymentsTitle}>
        {inactiveSubscriptions.length !== 0 ? (
          <div>
            <SelectSortType />
          </div>
        ) : null}
      </div>
      {inactiveSubscriptions.map((subscription) => (
        <InactiveSubscriptionItem key={subscription.id} {...subscription} />
      ))}
    </section>
  );
};
