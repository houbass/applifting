import React, { ReactNode, useMemo } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

// Provider component
export function ThemeProviderWrapper({ children }: { children: ReactNode }) {
  // Memoized theme object
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          primary: {
            main: "#007BFF",
          },
          secondary: {
            main: "#6C757D",
          },
          error: {
            main: "#DC3545",
          },
          background: {
            default: "#ffffff",
            paper: "#f5f5f5",
          },
          text: {
            primary: "#212529",
            secondary: "#6c757d",
          },
        },

        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                textTransform: "none",
              },
            },
          },
        },

        typography: {
          fontFamily: '"Helvetica", "Roboto", "Arial", sans-serif',
          h1: {
            fontSize: "40px",
            fontWeight: 500,
          },
          h3: {
            fontSize: "28px",
            fontWeight: 500,
          },
          h4: {
            fontSize: "24px",
            fontWeight: 500,
          },
          h6: {
            fontSize: "16px",
            fontWeight: 600,
          },
          body1: {
            lineHeight: "24px",
          },
        },
      }),
    []
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
