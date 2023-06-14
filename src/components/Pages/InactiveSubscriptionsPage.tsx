import { InactiveSubscriptions } from '../InactiveSubscriptions/InactiveSubscriptions';
import { SearchSubscription } from '../SearchSubscription/SearchSubscription';
export const InactiveSubscriptionsPage = () => {
  return (
    <>
      <SearchSubscription />
      <InactiveSubscriptions />
    </>
  );
};
