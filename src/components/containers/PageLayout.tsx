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
  button?: ReactNode;
}

export default function PageLayout({
  children,
  title,
  button,
}: PageLayoutProps) {
  return (
    <main>
      <Stack
        sx={{
          px: PAGE_PADDING_X,
          pt: PAGE_PADDING_TOP,
          alignItems: "center",
        }}
      >
        <Stack sx={{ maxWidth: MAX_WIDTH, width: "100%" }}>
          <header>
            <Stack sx={{ flexDirection: "row", gap: 4, alignItems: "center" }}>
              {title && <Typography variant="h1">{title}</Typography>}
              {button && button}
            </Stack>
          </header>

          {children}
        </Stack>
      </Stack>
    </main>
  );
}
