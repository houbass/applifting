import { configureStore, combineReducers } from '@reduxjs/toolkit';



// Slices
import userReducer from "./slices/userSlice";




// Combine reducers into a root reducer
const rootReducer = combineReducers({
  user: userReducer,
});



// Configure the Redux store with the persisted reducer
export const store = configureStore({
  reducer: rootReducer,

});


// Types for Redux state and dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;