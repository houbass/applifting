import React from "react";
import { CircularProgress, Stack } from "@mui/material";
import { useSelector } from "react-redux";
import { selecTimelineData } from "@/redux/slices/dashboardSlice";

// TODO make on scroll fetching
const Timeline = () => {
  // States
  const timelineData = useSelector(selecTimelineData);

  if (!timelineData) {
    return (
      <Stack justifyContent="center" alignItems="center" height="200px">
        <CircularProgress />
      </Stack>
    );
  }

  return (
    <Stack pt={2} gap={2}>
      <p>timeline</p>
    </Stack>
  );
};

export default Timeline;
