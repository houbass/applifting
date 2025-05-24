import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { AudioCollectionItem } from "@/components/types";

interface FilterData {
  instruments: string[];
  styles: string[];
}

// Definition of state Type
interface DashboardState {
  timelineData: AudioCollectionItem[] | null;
  filterData: FilterData;
  currentPlayingId: string;
}

// Definition of initial state
const initialState: DashboardState = {
  timelineData: null,
  filterData: {
    instruments: [],
    styles: [],
  },
  currentPlayingId: "",
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
    setFilterOut: (state, action: PayloadAction<string>) => {
      if (state.timelineData) {
        const filterdState = state.timelineData.filter(
          (item) => item.id !== action.payload
        );
        state.timelineData = filterdState;
      }
    },
    setFilterData: (state, action: PayloadAction<FilterData>) => {
      state.filterData = action.payload;
    },
    setCurrentPlayingId: (state, action: PayloadAction<string>) => {
      state.currentPlayingId = action.payload;
    },
  },
});

// Export reducers functions
export const {
  setTimelineData,
  setFilterOut,
  setFilterData,
  setCurrentPlayingId,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;

// Selector for user state
export const selecTimelineData = (state: RootState) =>
  state.dashboard.timelineData;
export const selectFilterData = (state: RootState) =>
  state.dashboard.filterData;
export const selectCurrentPlayingId = (state: RootState) =>
  state.dashboard.currentPlayingId;
