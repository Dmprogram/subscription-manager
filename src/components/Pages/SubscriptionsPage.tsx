import { Subscriptions } from '../Subscriptions/Subscriptions';
import { SearchSubscription } from '../SearchSubscription/SearchSubscription';
export const SubscriptionsPage = () => {
  return (
    <div>
      <SearchSubscription />
      <Subscriptions />
    </div>
  );
};
