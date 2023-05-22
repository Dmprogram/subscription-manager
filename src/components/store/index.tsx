import { configureStore } from '@reduxjs/toolkit';
import subscriptionSlice from './subscriptionSlice';
import subscriptionsListSlice from './subscriptionsListSlice';
export const store = configureStore({
  reducer: {
    // subscription: subscriptionSlice,
    subscriptionsList: subscriptionsListSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
