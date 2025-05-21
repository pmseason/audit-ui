import { configureStore } from '@reduxjs/toolkit';
import auditReducer from './auditSlice';

export const store = configureStore({
  reducer: {
    audit: auditReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 