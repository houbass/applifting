import React, { ReactNode } from 'react';
import { Stack } from '@mui/material';

// Constatnts
import { PAGE_PADDING_TOP, PAGE_PADDING_X, MAX_WIDTH } from '@/constants/globalConstants';

interface PageLayoutProps {
  children: ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {

  return (
    <main>
      <Stack 
        px={PAGE_PADDING_X}
        py={PAGE_PADDING_TOP} 
        alignItems="center"
      >
        <Stack maxWidth={MAX_WIDTH} width="100%">
          {children}
        </Stack>
      </Stack>
    </main>
  )
}

export default PageLayout;