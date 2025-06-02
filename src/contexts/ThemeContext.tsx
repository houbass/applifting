import React, { createContext, ReactNode, useMemo } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline, PaletteMode } from "@mui/material";
import useLocalStorageState from "use-local-storage-state";

// Define context type
interface ThemeContextProps {
  toggleColorMode: (value: PaletteMode) => void;
  mode: PaletteMode;
}

// Create context
export const ThemeContext = createContext<ThemeContextProps | undefined>(
  undefined
);

// Provider component
export function ThemeProviderWrapper({ children }: { children: ReactNode }) {
  // States
  const [mode, setMode] = useLocalStorageState<PaletteMode>("palleteMode", {
    defaultValue: "light",
  });

  // FToggle between dark and light mode
  const toggleColorMode = (mode: PaletteMode) => {
    setMode(mode);
  };

  // Memoized theme object
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: mode === "light" ? "#007BFF" : "#90caf9",
          },
          secondary: {
            main: mode === "light" ? "#6C757D" : "#f48fb1",
          },
          error: {
            main: "#DC3545",
          },
          background: {
            default: mode === "light" ? "#ffffff" : "#121212",
            paper: mode === "light" ? "#f5f5f5" : "#1e1e1e",
          },
          text: {
            primary: mode === "light" ? "#212529" : "#ffffff",
            secondary: mode === "light" ? "#6c757d" : "#b0bec5",
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
          body1: {
            lineHeight: "24px",
          },
        },
      }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={{ toggleColorMode, mode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
