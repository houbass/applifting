import React from "react";
import Link from 'next/link';
import { Box, Button, Stack } from '@mui/material';
import useHomeRedirect from '@/hooks/redirects/useHomeRedirect';

// Components
import BasicHead from "@/components/containers/BasicHead";
import PageLayout from "@/components/containers/PageLayout";
import Timeline from "@/components/content/Timeline";

export default function Dashboard() {

  // Redirect when logout
  const { user, userCheck } = useHomeRedirect();

  return (
    <>
      <BasicHead title="Collabro"/>

      { user && userCheck && (
        <PageLayout>
          <Stack 
            gap={2} 
            flexDirection="row" 
            justifyContent="center"
          >
            <Box pt={2}>
              <Link href="/createproject" passHref legacyBehavior>
                <Button 
                  variant="contained"
                  color="error"
                >
                  Create Collab
                </Button>
              </Link>
            </Box>
          </Stack>

          <Timeline />
        </PageLayout>
      )}
    </>
  )
}
