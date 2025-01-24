import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { User } from "../types";

// Definition of state Type
interface UserState {
  user: User | null
  userCheck: boolean
};

// Definition of initial state
const initialState: UserState = {
  user: null,
  userCheck: false
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
  }
});

// Export reducers functions
export const { 
  setUser,
  setUserCheck
} = userSlice.actions;

export default userSlice.reducer;

// Selector for user state
export const selectUser = (state: RootState) => state.user.user;
export const selectUserCheck = (state: RootState) => state.user.userCheck;