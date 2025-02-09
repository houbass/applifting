import React, { createContext, ReactNode, useMemo } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline, PaletteMode } from "@mui/material";
import useLocalStorageState from 'use-local-storage-state'

// Define context type
interface ThemeContextProps {
  toggleColorMode: (value: PaletteMode) => void;
  mode: PaletteMode;
}

// Create context
export const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

// Provider component
export const ThemeProviderWrapper = ({ children }: { children: ReactNode }) => {

  // States
  const [mode, setMode] = useLocalStorageState<PaletteMode>('palleteMode', {
    defaultValue: "dark"
})

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
            main: mode === "light" ? "#1976d2" : "#90caf9",
          },
          secondary: {
            main: mode === "light" ? "#d32f2f" : "#f48fb1",
          },
          background: {
            default: mode === "light" ? "#ffffff" : "#121212",
            paper: mode === "light" ? "#f5f5f5" : "#1e1e1e",
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
};
