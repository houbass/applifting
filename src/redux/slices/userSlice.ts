import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { User, Alert } from "../types";

// Definition of state Type
interface UserState {
  user: User | null;
  userCheck: boolean;
  alert: Alert;
}

// Definition of initial state
const initialState: UserState = {
  user: null,
  userCheck: false,
  alert: {
    text: "",
    type: "error",
  },
};

// Definition of state slice and reducers
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    setUserCheck: (state, action: PayloadAction<boolean>) => {
      state.userCheck = action.payload;
    },
    setAlert: (state, action: PayloadAction<string>) => {
      const text = action.payload;
      state.alert = {
        text: text.toUpperCase(),
        type: "error",
      };
    },
    setSucces: (state, action: PayloadAction<string>) => {
      const text = action.payload;
      state.alert = {
        text: text.toUpperCase(),
        type: "success",
      };
    },
  },
});

// Export reducers functions
export const { setUser, setUserCheck, setAlert, setSucces } = userSlice.actions;

export default userSlice.reducer;

// Selector for user state
export const selectUser = (state: RootState) => state.user.user;
export const selectUserCheck = (state: RootState) => state.user.userCheck;
export const selectAlert = (state: RootState) => state.user.alert;
