import { configureStore } from '@reduxjs/toolkit';
import { emptySplitApi } from './api/apiSlice';
import appUserReducer from "./reducer/appUserReducer";

export const store = configureStore({
  reducer: {
    [emptySplitApi.reducerPath]: emptySplitApi.reducer,
    appUser: appUserReducer,
    // bookData: bookDataReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(emptySplitApi.middleware),
});