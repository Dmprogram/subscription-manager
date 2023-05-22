import { configureStore } from '@reduxjs/toolkit';
import subscriptionsListSlice from './subscriptionsListSlice';
export const store = configureStore({
  reducer: {
    subscriptionsList: subscriptionsListSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
