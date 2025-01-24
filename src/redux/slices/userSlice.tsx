import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { User } from "../types";

// Definition of state Type
interface UserState {
  user: User | null;
};

// Definition of initial state
const initialState: UserState = {
  user: null,
};

// Definition of state slice and reducers
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
  }
});

// Export reducers functions
export const { setUser } = userSlice.actions;
export default userSlice.reducer;

// Selector for user state
export const selectUser = (state: RootState) => state.user.user;