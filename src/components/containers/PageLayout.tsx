import React, { ReactNode } from "react";
import { Stack, Typography } from "@mui/material";

// Constatnts
import {
  PAGE_PADDING_TOP,
  PAGE_PADDING_X,
  MAX_WIDTH,
} from "@/constants/globalConstants";

interface PageLayoutProps {
  children: ReactNode;
  title?: string;
}

const PageLayout = ({ children, title }: PageLayoutProps) => {
  return (
    <main>
      <Stack px={PAGE_PADDING_X} py={PAGE_PADDING_TOP} alignItems="center">
        <Stack maxWidth={MAX_WIDTH} width="100%">
          {title && <Typography variant="h1">{title}</Typography>}
          {children}
        </Stack>
      </Stack>
    </main>
  );
};

export default PageLayout;
