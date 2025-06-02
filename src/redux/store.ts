import { configureStore, combineReducers } from "@reduxjs/toolkit";

// Slices
import userReducer from "./slices/userSlice";

const rootReducer = combineReducers({
  user: userReducer,
});

// Configure the Redux store
export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
