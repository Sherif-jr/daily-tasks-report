import { configureStore } from "@reduxjs/toolkit";
import slices from "./slices";

const store = configureStore({
  reducer: slices,
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type StoreState = ReturnType<typeof store.getState>;
