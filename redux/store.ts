import { combineReducers, configureStore } from "@reduxjs/toolkit";

const Allreducer = combineReducers({});
export const store = configureStore({
  reducer: Allreducer,
});

export type IRootState = ReturnType<typeof store.getState>;
