import React from "react";
import { CircularProgress, Stack } from "@mui/material";
import { useSelector } from "react-redux";
import { selecTimelineData } from "@/redux/slices/dashboardSlice";

// Components
import ArticleCard from "./ArticleCard";

// TODO make on scroll fetching
export default function Timeline() {
  // States
  const timelineData = useSelector(selecTimelineData);
  const data = [1, 2, 3];

  if (!timelineData) {
    // TODO use skletons
    return (
      <Stack justifyContent="center" alignItems="center" height="200px">
        <CircularProgress />
      </Stack>
    );
  }

  return (
    <Stack sx={{ gap: 4 }}>
      {data.map((item, index) => {
        console.log(item);
        return <ArticleCard key={index} />;
      })}
    </Stack>
  );
}
