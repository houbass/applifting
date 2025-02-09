import React, { useState } from 'react';
import { AppBar, Badge, Box, IconButton, Stack, Typography, Tooltip } from '@mui/material';
import { AccountBox, AddBox, Email, Notifications, Settings } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { selectUser } from '@/redux/slices/userSlice';
import useRedirect from '@/hooks/redirects/useRedirect';
import Link from 'next/link';

// Components
import UserSettingsPanel from './UserSettingsPanel';

const UserTopNavBar = () => {

  // Hooks
  const user = useSelector(selectUser);
  const { goToDashboard } = useRedirect();

  // States
  const [settingsView, setSettingsView] = useState(false);

  // Utils
  function toggleDrawer() {
    setSettingsView(!settingsView);
  }

  return (
    <>
      {user && (
        <>
          <AppBar position="fixed">
            <Stack 
              pl={2}
              py={1}
              flexDirection="row" 
              alignItems="center"
              justifyContent="space-between"  
            >
              <Box 
                onClick={goToDashboard}
                sx={{
                  cursor: 'pointer'
                }}
              >
                <Typography fontWeight={600}>COLLABRO</Typography>
              </Box>

              <Stack alignItems="center" flexDirection="row">
                <Tooltip title="Create Project" disableInteractive>
                  <Link href="/createproject" passHref legacyBehavior>
                    <IconButton 
                      size="small"
                      color="inherit"
                      aria-label="Create Collab Project"
                    >
                      <AddBox  fontSize="small" />
                    </IconButton>
                  </Link>
                </Tooltip>
                
                <Tooltip title="Messages" disableInteractive>
                  <IconButton
                    size="small"
                    aria-label="show 12 new messages"
                    color="inherit"
                  >
                    <Badge badgeContent={12} color="error">
                      <Email fontSize="small" />
                    </Badge>
                  </IconButton>
                </Tooltip>

                <Tooltip title="Notifications" disableInteractive>
                  <IconButton
                    size="small"
                    aria-label="show 17 new notifications"
                    color="inherit"
                  >
                    <Badge badgeContent={17} color="error">
                      <Notifications fontSize="small" />
                    </Badge>
                  </IconButton>
                </Tooltip>

                <Tooltip title="Settings" disableInteractive>
                  <IconButton 
                    size="small"
                    onClick={toggleDrawer} 
                    color="inherit"
                    aria-label="Settings"
                  >
                    <Settings  fontSize="small" />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Profile" disableInteractive>
                  <IconButton 
                    size="small"
                    color="inherit"
                    aria-label="Account"
                  >
                    <AccountBox fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Stack>
            </Stack>
          </AppBar>

          <UserSettingsPanel 
            settingsView={settingsView}
            toggleDrawer={toggleDrawer}
          />
        </>
      )}
    </>
  );
}

export default UserTopNavBar;