import React, { useContext } from "react";
import {
  Box,
  Drawer,
  Divider,
  IconButton,
  Stack,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  PaletteMode,
} from "@mui/material";
import { Close, DarkMode, LightMode } from "@mui/icons-material";
import { ThemeContext } from "@/contexts/ThemeContext";
import Logout from "../auth/Logout";

interface Props {
  settingsView: boolean;
  toggleDrawer: () => void;
}

const UserSettingsPanel = ({ settingsView, toggleDrawer }: Props) => {
  // Contexts
  const themeContext = useContext(ThemeContext);
  if (!themeContext) return null;
  const { toggleColorMode, mode } = themeContext;

  // Utils
  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    if (newAlignment) {
      toggleColorMode(newAlignment as PaletteMode);
    }
  };

  return (
    <Drawer anchor="right" open={settingsView} onClose={toggleDrawer}>
      <Stack height="100%">
        <Stack
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          gap={2}
          pl={2}
          py={1}
        >
          <Typography fontWeight={600} variant="overline">
            Settings
          </Typography>

          <IconButton onClick={toggleDrawer}>
            <Close />
          </IconButton>
        </Stack>

        <Divider />

        <Stack p={2} gap={2} height="100%" justifyContent="space-between">
          <Stack>
            <Typography variant="overline">mode</Typography>

            <ToggleButtonGroup
              color="primary"
              value={mode}
              exclusive
              onChange={handleChange}
              aria-label="Platform"
            >
              <ToggleButton value="light" size="small">
                <LightMode fontSize="small" sx={{ marginRight: "8px" }} />
                Light
              </ToggleButton>
              <ToggleButton value="dark" size="small">
                <DarkMode fontSize="small" sx={{ marginRight: "8px" }} />
                Dark
              </ToggleButton>
            </ToggleButtonGroup>
          </Stack>

          <Box>
            <Logout toggleDrawer={toggleDrawer} />
          </Box>
        </Stack>
      </Stack>
    </Drawer>
  );
};

export default UserSettingsPanel;
