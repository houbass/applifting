import React, { useEffect } from "react";
import { CircularProgress, Stack, } from "@mui/material";
import { useSelector } from "react-redux";
import { selecTimelineData } from "@/redux/slices/dashboardSlice";

// Hooks
import useGetTimelineData from "@/hooks/firebase/useGetTimelineData";

// Components
import SongCard from "./SongCard";

// TODO make on scroll fetching
const Timeline = () => {

  // Hooks
  const { fetchCollection } = useGetTimelineData();

  // States
  const timelineData = useSelector(selecTimelineData);

  // Fetch data
  useEffect(() => {
    if(!timelineData) {
      fetchCollection();
    }
  }, [timelineData]);

  if(!timelineData) {
    return (
      <Stack justifyContent="center" alignItems="center" height="200px">
        <CircularProgress />
      </Stack>
    )
  }

  return (
    <Stack pt={3} gap={2}>
      {timelineData?.map((item, index) => {
        return (
          <SongCard 
            key={index}
            item={item}
          />
        )
      })}
    </Stack>
  )
}

export default Timeline;