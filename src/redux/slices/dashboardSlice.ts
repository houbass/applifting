import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { AudioCollectionItem } from "@/types/types";

// Definition of state Type
interface DashboardState {
  timelineData: AudioCollectionItem[] | null;
}

// Definition of initial state
const initialState: DashboardState = {
  timelineData: null,
};

// Definition of state slice and reducers
const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setTimelineData: (
      state,
      action: PayloadAction<AudioCollectionItem[] | null>
    ) => {
      state.timelineData = action.payload;
    },
  },
});

// Export reducers functions
export const { setTimelineData } = dashboardSlice.actions;

export default dashboardSlice.reducer;

// Selector for user state
export const selecTimelineData = (state: RootState) =>
  state.dashboard.timelineData;
