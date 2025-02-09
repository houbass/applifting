
import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import useHomeRedirect from '@/hooks/redirects/useHomeRedirect';
import { PAGE_PADDING_X, PAGE_PADDING_TOP } from "@/constants/globalConstants";

// Components
import CreateProjectForm from "@/components/forms/CreateProjectForm";

const CreateProjectPage = () => {

  // Redirect when logout
  useHomeRedirect();

  return (
    <Stack alignItems="center" px={PAGE_PADDING_X} py={PAGE_PADDING_TOP}>
      <Typography>
        CREATE COLLAB PROJECT
      </Typography>
      <Box width="100%" maxWidth={600}>
        <CreateProjectForm />
      </Box>
    </Stack>
  )
}

export default CreateProjectPage;