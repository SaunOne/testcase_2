import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { DOLineItem, DOSummary } from '../types/do.types';

interface DOState {
  lineItems: DOLineItem[];
  summary: DOSummary;
}

const initialState: DOState = {
  lineItems: [],
  summary: {
    totalItems: 0,
    totalPacks: 0,
    totalWeight: 0,
  },
};

const calculateSummary = (lineItems: DOLineItem[]): DOSummary => {
  return lineItems.reduce(
    (acc, item) => ({
      totalItems: acc.totalItems + 1,
      totalPacks: acc.totalPacks + (item.packToDeliver || 0),
      totalWeight: acc.totalWeight + item.weightToDeliver,
    }),
    { totalItems: 0, totalPacks: 0, totalWeight: 0 }
  );
};

const doSlice = createSlice({
  name: 'deliveryOrder',
  initialState,
  reducers: {
    addLineItem: (state, action: PayloadAction<DOLineItem>) => {
      state.lineItems.push(action.payload);
      state.summary = calculateSummary(state.lineItems);
    },
    removeLineItem: (state, action: PayloadAction<string>) => {
      state.lineItems = state.lineItems.filter((item) => item.id !== action.payload);
      state.summary = calculateSummary(state.lineItems);
    },
    updateLineItem: (state, action: PayloadAction<DOLineItem>) => {
      const index = state.lineItems.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        state.lineItems[index] = action.payload;
        state.summary = calculateSummary(state.lineItems);
      }
    },
    clearLineItems: (state) => {
      state.lineItems = [];
      state.summary = initialState.summary;
    },
  },
});

export const { addLineItem, removeLineItem, updateLineItem, clearLineItems } = doSlice.actions;
export default doSlice.reducer;
