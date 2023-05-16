import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface SubscriptionState {
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
  };
}

const initialState: SubscriptionState = {
  subscription: {
    name: '',
    price: '',
    currency: '',
    paymentFrequency: 'month',
    date: null,
    id: '',
  },
};

export const subscriptionSlice = createSlice({
  name: 'subscription',
  initialState,
  reducers: {
    addSubName(state, action: PayloadAction<{ name: string }>) {
      state.subscription.name = action.payload.name;
    },
    addSubPrice(state, action: PayloadAction<{ price: string }>) {
      state.subscription.price = action.payload.price;
    },
    addSubCurrency(state, action: PayloadAction<{ currency: string }>) {
      state.subscription.currency = action.payload.currency;
    },
    addSubPaymentFrequency(state, action: PayloadAction<{ paymentFrequency: string }>) {
      state.subscription.paymentFrequency = action.payload.paymentFrequency;
    },
    addSubDate(
      state,
      action: PayloadAction<{
        date: { day: number; month: number; year: number } | null;
      }>
    ) {
      state.subscription.date = action.payload.date;
    },

    fillDataSub(
      state,
      action: PayloadAction<{
        data: any;
      }>
    ) {
      state.subscription = { ...state.subscription, ...action.payload.data };
    },
    clearField(state) {
      state.subscription = {
        name: '',
        price: '',
        currency: '',
        paymentFrequency: 'month',
        date: null,
        id: '',
      };
    },
  },
});

export const {
  addSubName,
  addSubPrice,
  addSubCurrency,
  addSubPaymentFrequency,
  addSubDate,
  clearField,
  fillDataSub,
} = subscriptionSlice.actions;

export default subscriptionSlice.reducer;
