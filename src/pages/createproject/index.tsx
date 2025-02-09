
import React from "react";
import { Box, Stack } from "@mui/material";
import useHomeRedirect from '@/hooks/redirects/useHomeRedirect';
import { PAGE_PADDING_X, PAGE_PADDING_TOP, MAX_WIDTH } from "@/constants/globalConstants";

// Components
import CreateProjectForm from "@/components/forms/CreateProjectForm";

const CreateProjectPage = () => {

  // Redirect when logout
  useHomeRedirect();

  return (
    <Stack 
      alignItems="center" 
      px={PAGE_PADDING_X} 
      py={PAGE_PADDING_TOP}
    >
      <Stack maxWidth={MAX_WIDTH}>
        <Box width="100%">
          <CreateProjectForm />
        </Box>
      </Stack>
    </Stack>
  )
}

export default CreateProjectPage;