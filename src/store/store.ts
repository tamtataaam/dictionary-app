import { configureStore } from '@reduxjs/toolkit';

import dictionarySlice from './dictionary/slice';

export const store = configureStore({
  reducer: {
    dictionary: dictionarySlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
