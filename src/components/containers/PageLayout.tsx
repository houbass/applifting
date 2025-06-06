import React, { ReactNode } from "react";
import { Stack, Typography } from "@mui/material";

// Constatnts
import {
  PAGE_PADDING_TOP,
  PAGE_PADDING_X,
  MAX_WIDTH,
} from "@/constants/globalConstants";

interface Props {
  children: ReactNode;
  title?: string;
  button?: ReactNode;
}

export default function PageLayout({ children, title, button }: Props) {
  return (
    <main>
      <Stack
        sx={{
          px: PAGE_PADDING_X,
          pt: PAGE_PADDING_TOP,
          pb: 6,
          alignItems: "center",
        }}
      >
        <Stack sx={{ maxWidth: MAX_WIDTH, width: "100%" }}>
          {title && (
            <header>
              <Stack
                sx={{
                  flexDirection: "row",
                  alignItems: "center",
                  mb: 6,
                  gap: 4,
                }}
              >
                <Typography variant="h1">{title}</Typography>
                {button && button}
              </Stack>
            </header>
          )}

          {children}
        </Stack>
      </Stack>
    </main>
  );
}
