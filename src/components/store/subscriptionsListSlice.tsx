import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { getSubscriptions } from '../services/requestSubscriptions';
import { countAverageExpenses } from '../utils/countAverageExpenses';
import { sortPaymentsToOldest } from '../utils/sortPaymentsToOldest';
import { sortByParameter } from '../utils/sortByParameter';
import { changeDate } from '../utils/changeDate';
export const fetchSubscriptionsList = createAsyncThunk(
  'users/fetchSubscriptionsList',
  getSubscriptions
);

interface SubscriptionState {
  subscription: {
    name: string;
    price: string;
    currency: string;
    paymentFrequency: string;
    id: string;
    date: {
      day: number | null;
      month: number | null;
      year: number | null;
    } | null;
    status: string;
    imageUrl: string;
  };
}

interface SubscriptionsListState {
  fetchedSubscriptions: Array<SubscriptionState>;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: any;
  inputSearch: string;
  sortByParameter: null | string;
  searchSubsciptions: Array<SubscriptionState>;
  activeSubscriptions: Array<SubscriptionState>;
  inactiveSubscriptions: Array<SubscriptionState>;
}

const initialState = {
  loading: 'idle',
  error: null,
  fetchedSubscriptions: [],
  activeSubscriptions: [],
  inactiveSubscriptions: [],
  upcomingPayments: [],
  searchSubsciptions: [],
  inputSearch: '',
  sortByParameter: null,
  averageExpenses: {
    averageExpensesRub: null,
    averageExpensesUsd: null,
    averageExpensesEur: null,
  },
} as SubscriptionsListState;

const subscriptionsListSlice = createSlice({
  name: 'subscriptionsList',
  initialState,
  reducers: {
    findSubscription(state, action: PayloadAction<{ inputSearch: string }>) {
      state.inputSearch = action.payload.inputSearch;
      state.searchSubsciptions = state.fetchedSubscriptions.filter((el) =>
        el.name.toLowerCase().includes(action.payload.inputSearch.toLowerCase())
      );
    },

    changeStatus(state, action: PayloadAction<{ status: boolean; id: string }>) {
      const subscription = state.fetchedSubscriptions.find((el) => el.id === action.payload.id);
      subscription.status = action.payload.status;
      state.activeSubscriptions = state.fetchedSubscriptions.filter((el) => el.status);
      state.inactiveSubscriptions = state.fetchedSubscriptions.filter((el) => !el.status);
      state.searchSubsciptions.forEach((el, index) => {
        if (el.id === subscription.id) {
          state.searchSubsciptions[index] = subscription;
        }
      });
    },

    clearSearchAndSortFields(state) {
      state.inputSearch = '';
    },

    clearAverageExpenses(state) {
      state.averageExpenses = {
        averageExpensesRub: null,
        averageExpensesUsd: null,
        averageExpensesEur: null,
      };
    },

    addSortByParameter(state, action: PayloadAction<{ sortByParameter: string | null }>) {
      state.sortByParameter = action.payload.sortByParameter;
      state.activeSubscriptions = sortByParameter(
        state.fetchedSubscriptions.filter((el) => el.status),
        state.sortByParameter
      );
      state.inactiveSubscriptions = sortByParameter(
        state.fetchedSubscriptions.filter((el) => !el.status),
        state.sortByParameter
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubscriptionsList.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(fetchSubscriptionsList.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.error = null;

        state.fetchedSubscriptions = action.payload;
        state.fetchedSubscriptions = changeDate(state.fetchedSubscriptions);

        state.activeSubscriptions = sortByParameter(
          state.fetchedSubscriptions.filter((el) => el.status),
          state.sortByParameter
        );

        state.inactiveSubscriptions = sortByParameter(
          state.fetchedSubscriptions.filter((el) => !el.status),
          state.sortByParameter
        );

        state.averageExpenses = countAverageExpenses(state.activeSubscriptions);

        state.upcomingPayments = sortPaymentsToOldest(state.activeSubscriptions, 3);

        state.searchSubsciptions = state.fetchedSubscriptions.filter((el) => {
          return el.name.toLowerCase().includes(state.inputSearch.toLowerCase());
        });
      })
      .addCase(fetchSubscriptionsList.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error;
      });
  },
});

export const {
  findSubscription,
  clearSearchAndSortFields,
  addSortByParameter,
  changeStatus,
  clearAverageExpenses,
} = subscriptionsListSlice.actions;
export default subscriptionsListSlice.reducer;
