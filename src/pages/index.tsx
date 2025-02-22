import React from 'react';
import Link from 'next/link';
import { Button, Stack } from '@mui/material';
import useDashboardRedirect from '@/hooks/redirects/useDashboardRedirect';

// Components
import BasicHead from '@/components/containers/BasicHead';

export default function Home() {

  // Redirect when log in
  const { user, userCheck } = useDashboardRedirect();

  return (
    <>
      <BasicHead title='Collabro' />

      { !user && userCheck && (
        <main>
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
        </main>
      )}
    </>
  )
}
