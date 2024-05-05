import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { baseAPI } from "./baseApi";
import { pageReducer } from "./features/page";
import { authReducer } from "./features/auth";

export const store = configureStore({
  reducer: {
    [baseAPI.reducerPath]: baseAPI.reducer,
    auth: persistReducer({ key: "auth", storage }, authReducer) as any,
    page: pageReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(baseAPI.middleware) as any,
});

export const persistor = persistStore(store);
