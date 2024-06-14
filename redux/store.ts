import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";

const Allreducer = combineReducers({
  user: authSlice,
});
export const store = configureStore({
  reducer: Allreducer,
});

export type IRootState = ReturnType<typeof store.getState>;
