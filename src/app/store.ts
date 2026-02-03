import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { doApi } from '../features/delivery-order/api/doApi';
import doReducer from '../features/delivery-order/slices/doSlice';

export const store = configureStore({
  reducer: {
    deliveryOrder: doReducer,
    [doApi.reducerPath]: doApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(doApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
