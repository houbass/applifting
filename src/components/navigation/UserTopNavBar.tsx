import React, { useState } from "react";
import { AppBar, IconButton, Stack, Typography, Tooltip } from "@mui/material";
import { AccountBox, AddBox, Settings } from "@mui/icons-material";

import { selectUser } from "@/redux/slices/userSlice";
import Link from "next/link";
import { common } from "@mui/material/colors";

// Hooks
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

// Components
import UserSettingsPanel from "./UserSettingsPanel";

const UserTopNavBar = () => {
  // Hooks
  const router = useRouter();
  const user = useSelector(selectUser);

  // States
  const [settingsView, setSettingsView] = useState(false);

  // Utils
  function toggleDrawer() {
    setSettingsView(!settingsView);
  }

  const handleRedirect = () => {
    router.push({
      pathname: "/",
    });
  };

  return (
    <>
      <AppBar position="fixed">
        <Stack
          px={2}
          py={1}
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <button
            style={{ all: "unset", cursor: "pointer" }}
            onClick={handleRedirect}
          >
            <Typography
              color={common.white}
              fontWeight={600}
              variant="overline"
              fontSize={14}
            >
              COLLABRO
            </Typography>
          </button>

          <Stack alignItems="center" flexDirection="row">
            <Link href="/createproject" passHref legacyBehavior>
              <Tooltip title="Create Project" disableInteractive>
                <IconButton
                  size="small"
                  color="inherit"
                  aria-label="Create Project"
                >
                  <AddBox />
                </IconButton>
              </Tooltip>
            </Link>

            <Tooltip title="Settings" disableInteractive>
              <IconButton
                size="small"
                onClick={toggleDrawer}
                color="inherit"
                aria-label="Settings"
              >
                <Settings />
              </IconButton>
            </Tooltip>

            {user && (
              <Link href={`/profile/${user.uid}`} passHref legacyBehavior>
                <Tooltip title="Profile" disableInteractive>
                  <IconButton size="small" color="inherit" aria-label="Profile">
                    <AccountBox />
                  </IconButton>
                </Tooltip>
              </Link>
            )}
          </Stack>
        </Stack>
      </AppBar>

      <UserSettingsPanel
        settingsView={settingsView}
        toggleDrawer={toggleDrawer}
      />
    </>
  );
};

export default UserTopNavBar;
