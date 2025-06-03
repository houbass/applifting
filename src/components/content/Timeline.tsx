import React from "react";
import { Stack } from "@mui/material";

// Types
import { Article } from "@/types/types";

// Components
import ArticleCard from "./ArticleCard";

interface Props {
  data: Article[];
}

export default function Timeline({ data }: Props) {
  return (
    <Stack sx={{ gap: 4 }}>
      {data.map((item, index) => {
        return <ArticleCard key={index} data={item} />;
      })}
    </Stack>
  );
}
