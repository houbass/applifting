import React, { useContext } from 'react';
import { 
  Drawer, 
  Divider, 
  IconButton, 
  Stack, 
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  PaletteMode
} from '@mui/material';
import { Close, DarkMode, LightMode } from '@mui/icons-material';
import { ThemeContext } from '@/contexts/ThemeContext';
import Logout from '../auth/Logout';

interface Props {
  settingsView: boolean,
  toggleDrawer: () => void
}

const UserSettingsPanel = ({
  settingsView, toggleDrawer
}: Props) => {

  const themeContext = useContext(ThemeContext);
  if (!themeContext) return null;
  const { toggleColorMode, mode } = themeContext;

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {

    //toggleColorMode(newAlignment as PaletteMode)
    //setAlignment(newAlignment);

    if(newAlignment) {
      toggleColorMode(newAlignment as PaletteMode)
    }
    console.log('--- newAlignment', newAlignment)
  };

  return (
    <Drawer
      anchor="right"
      open={settingsView}
      onClose={toggleDrawer}
    >
      <Stack>
        <Stack 
          flexDirection="row" 
          alignItems="center"
          justifyContent="space-between"
          gap={2}
          pl={2}
          py={1}
        >
          <Typography fontWeight={600}>
            Settings
          </Typography>

          <IconButton onClick={toggleDrawer}>
            <Close />
          </IconButton>
        </Stack>

        <Divider />

        <Stack p={2} gap={2}>
          <Stack>
            <Typography variant="overline">
              mode
            </Typography>

            <ToggleButtonGroup
              color="primary"
              value={mode}
              exclusive
              onChange={handleChange}
              aria-label="Platform"
            >
              <ToggleButton value="light" size="small">
                  <LightMode fontSize="small" sx={{marginRight: "8px"}} />
                  Light
              </ToggleButton>
              <ToggleButton value="dark" size="small">
                  <DarkMode fontSize="small" sx={{marginRight: "8px"}} />
                  Dark
              </ToggleButton>
            </ToggleButtonGroup>
          </Stack>

          <Logout />
        </Stack>
      </Stack>
    </Drawer>
  );
}

export default UserSettingsPanel;