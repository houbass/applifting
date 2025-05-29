import React from "react";
import { CircularProgress, Stack } from "@mui/material";
import { useSelector } from "react-redux";
import { selecTimelineData } from "@/redux/slices/dashboardSlice";

// Components
import ArticleCard from "./ArticleCard";

// TODO make on scroll fetching
const Timeline = () => {
  // States
  const timelineData = useSelector(selecTimelineData);
  const data = [1, 2, 3];

  if (!timelineData) {
    return (
      <Stack justifyContent="center" alignItems="center" height="200px">
        <CircularProgress />
      </Stack>
    );
  }

  return (
    <Stack sx={{ pt: 6, gap: 4 }}>
      {data.map((item, index) => {
        console.log(item);
        return <ArticleCard key={index} />;
      })}
    </Stack>
  );
};

export default Timeline;
