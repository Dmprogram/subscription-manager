import { ActiveSubscriptions } from '../ActiveSubscriptions/ActiveSubscriptions';
import { SearchSubscription } from '../SearchSubscription/SearchSubscription';
export const ActiveSubscriptionsPage = () => {
  return (
    <div>
      <SearchSubscription />
      <ActiveSubscriptions />
    </div>
  );
};
