import React, { useState } from "react";
import Image from "next/image";
import {
  AppBar,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  Button,
} from "@mui/material";
import { AccountBox, Settings, ArrowForward } from "@mui/icons-material";
import { selectUser } from "@/redux/slices/userSlice";
import Link from "next/link";
import logo from "../../../public/logo.png";

// Constants
import { MAX_WIDTH, PAGE_PADDING_X } from "@/constants/globalConstants";

// Hooks
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

// Components
import UserSettingsPanel from "./UserSettingsPanel";

export default function UserTopNavBar() {
  // Hooks
  const router = useRouter();
  const user = useSelector(selectUser);
  const path = router.asPath;

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

  function linkOpacity(target: string) {
    return path === target ? "initial" : "secondary";
  }

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#F8F9FA",
          color: "text.primary",
          boxShadow: "none",
        }}
      >
        <Stack sx={{ alignItems: "center", px: PAGE_PADDING_X, py: 1 }}>
          <Stack
            sx={{
              width: "100%",
              maxWidth: MAX_WIDTH,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Stack
              sx={{ flexDirection: "row", alignItems: "center", gap: "40px" }}
            >
              <button className="unsetLink" onClick={handleRedirect}>
                <Image
                  alt="logo"
                  src={logo}
                  style={{ width: "39px", height: "auto" }}
                />
              </button>

              <Link href="/" className="unsetLink">
                <Typography color={linkOpacity("/")}>
                  Recent Articles
                </Typography>
              </Link>

              <Link href="/about" className="unsetLink">
                <Typography color={linkOpacity("/about")}>About</Typography>
              </Link>
            </Stack>

            <Stack alignItems="center" flexDirection="row">
              <Link href="/create-article" className="unsetLink">
                <Typography color="primary">Create Article</Typography>
              </Link>

              <Link href="/signin" passHref legacyBehavior>
                <Button
                  endIcon={<ArrowForward />}
                  sx={{ textTransform: "initial" }}
                >
                  Log in
                </Button>
              </Link>

              {user && (
                <>
                  <Link href={`/profile/${user.uid}`} passHref legacyBehavior>
                    <Tooltip title="Profile" disableInteractive>
                      <IconButton
                        size="small"
                        color="inherit"
                        aria-label="Profile"
                      >
                        <AccountBox />
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
                </>
              )}
            </Stack>
          </Stack>
        </Stack>
      </AppBar>

      <UserSettingsPanel
        settingsView={settingsView}
        toggleDrawer={toggleDrawer}
      />
    </>
  );
}
