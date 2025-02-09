import React from "react";
import useHomeRedirect from '@/hooks/redirects/useHomeRedirect';
import { Stack, Typography } from "@mui/material";
import { PAGE_PADDING_X, PAGE_PADDING_TOP } from "@/constants/globalConstants";

const FindProject = () => {
  
  // Redirect when logout
  useHomeRedirect();

  return (
    <Stack px={PAGE_PADDING_X} py={PAGE_PADDING_TOP}>
      <Typography>
        FIND COLLAB PROJECT
      </Typography>
    </Stack>
  )
}

export default FindProject;