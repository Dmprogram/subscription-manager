import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getSubscriptions } from '../services/requestSubscriptions';
import { SubscriptionState } from './subscriptionSlice';
export const fetchSubscriptionsList = createAsyncThunk(
  'users/fetchSubscriptionsList',
  getSubscriptions
);

interface SubscriptionsListState {
  subscriptions: Array<SubscriptionState>;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: any;
}

const initialState = { subscriptions: [], loading: 'idle', error: null } as SubscriptionsListState;

const subscriptionsListSlice = createSlice({
  name: 'subscriptionsList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubscriptionsList.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(fetchSubscriptionsList.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.subscriptions = action.payload;
        state.error = null;
      })
      .addCase(fetchSubscriptionsList.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error;
      });
  },
});

export default subscriptionsListSlice.reducer;
