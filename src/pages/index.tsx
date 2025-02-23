import React from 'react';
import Link from 'next/link';
import { Box, Button, Stack, Typography } from '@mui/material';
import useDashboardRedirect from '@/hooks/redirects/useDashboardRedirect';

// Components
import BasicHead from '@/components/containers/BasicHead';
import PageLayout from '@/components/containers/PageLayout';

export default function Home() {

  // Redirect when log in
  const { user, userCheck } = useDashboardRedirect();

  return (
    <>
      <BasicHead title='Collabro' />

      { !user && userCheck && (
        <PageLayout>

          <Stack>
            <Box pb={6}>
              <Typography variant="h4" textTransform="uppercase" textAlign="center">
                wanna collab bro?
              </Typography>
            </Box>

            <Stack gap={1}>
              <Link href="/signin" passHref legacyBehavior>
                <Button variant="contained">
                  sign in
                </Button>
              </Link>

              <Link href="/signup" passHref legacyBehavior>
                <Button variant="contained">
                  sign up
                </Button>
              </Link>
            </Stack>
          </Stack>
        </PageLayout>
      )}
    </>
  )
}
