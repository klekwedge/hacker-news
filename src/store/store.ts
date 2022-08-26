import { configureStore } from '@reduxjs/toolkit';
import news from '../slices/newsSlice';

const store = configureStore({
  reducer: {
    news,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;