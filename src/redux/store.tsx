import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist/es/constants';

// Slices
import userReducer from "./slices/userSlice";


// Configuration for redux-persist
const persistConfig = {
  key: 'root',
  storage,
  whitelist: [], // Specify slices to persist
  //whitelist: ['user'],
};

// Combine reducers into a root reducer
const rootReducer = combineReducers({
  user: userReducer,
});

// Create a persisted reducer using the combined root reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the Redux store with the persisted reducer
export const store = configureStore({
  reducer: persistedReducer,

  // debug for console log error
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types from redux-persist
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Create a persistor object to control when to persist
export const persistor = persistStore(store);

// Types for Redux state and dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;