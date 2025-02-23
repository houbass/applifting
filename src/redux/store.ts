import { configureStore, combineReducers } from '@reduxjs/toolkit';

// Slices
import userReducer from "./slices/userSlice";
import dashboardReducer from "./slices/dashboardSlice";


const rootReducer = combineReducers({
  user: userReducer,
  dashboard: dashboardReducer,
});

// Configure the Redux store
export const store = configureStore({
  reducer: rootReducer,

});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;