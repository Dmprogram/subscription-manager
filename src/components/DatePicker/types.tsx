import { Subscription } from '../store/types';
import { NewSubscriptionValues } from '../NewSubscription/types';
export type DatePickProps = {
  setFieldValue: (
    first: string,
    second: { day: number; year: number; month: number } | null,
    third: boolean
  ) => void;
  values: Subscription | NewSubscriptionValues;
};
