
import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import useHomeRedirect from '@/hooks/useHomeRedirect';

// Components
import CreateProjectForm from "@/components/forms/CreateProjectForm";

const CreateProjectPage = () => {

  useHomeRedirect();

  return (
    <Stack alignItems="center" p={1}>
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