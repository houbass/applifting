import React, { useState } from "react";
import {
  AppBar,
  Badge,
  IconButton,
  Stack,
  Typography,
  Tooltip,
} from "@mui/material";
import {
  AccountBox,
  AddBox,
  Email,
  Notifications,
  Settings,
} from "@mui/icons-material";

import { selectUser } from "@/redux/slices/userSlice";
import Link from "next/link";
import { common } from "@mui/material/colors";
import { selectFilterData } from "@/redux/slices/dashboardSlice";

// Hooks
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";

// Components
import UserSettingsPanel from "./UserSettingsPanel";

const UserTopNavBar = () => {
  // Hooks
  const t = useTranslations("navbar");
  const router = useRouter();
  const user = useSelector(selectUser);
  const filterData = useSelector(selectFilterData);

  // States
  const [settingsView, setSettingsView] = useState(false);

  // Utils
  function toggleDrawer() {
    setSettingsView(!settingsView);
  }

  const handleRedirect = () => {
    router.push({
      pathname: "/dashboard",
      query: {
        filter: JSON.stringify(filterData),
      },
    });
  };

  return (
    <>
      {user && (
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
                  <Tooltip title={t("Create Project")} disableInteractive>
                    <IconButton
                      size="small"
                      color="inherit"
                      aria-label={t("Create Project")}
                    >
                      <AddBox />
                    </IconButton>
                  </Tooltip>
                </Link>

                <Tooltip title={t("Messages")} disableInteractive>
                  <IconButton
                    size="small"
                    // TODO
                    aria-label="show 12 new messages"
                    color="inherit"
                  >
                    <Badge badgeContent={12} color="error">
                      <Email />
                    </Badge>
                  </IconButton>
                </Tooltip>

                <Tooltip title={t("Notifications")} disableInteractive>
                  <IconButton
                    size="small"
                    // TODO
                    aria-label="show 17 new notifications"
                    color="inherit"
                  >
                    <Badge badgeContent={17} color="error">
                      <Notifications />
                    </Badge>
                  </IconButton>
                </Tooltip>

                <Tooltip title={t("Settings")} disableInteractive>
                  <IconButton
                    size="small"
                    onClick={toggleDrawer}
                    color="inherit"
                    aria-label={t("Settings")}
                  >
                    <Settings />
                  </IconButton>
                </Tooltip>

                <Link href={`/profile/${user.uid}`} passHref legacyBehavior>
                  <Tooltip title={t("Profile")} disableInteractive>
                    <IconButton
                      size="small"
                      color="inherit"
                      aria-label={t("Profile")}
                    >
                      <AccountBox />
                    </IconButton>
                  </Tooltip>
                </Link>
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
};

export default UserTopNavBar;
