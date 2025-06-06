import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  AppBar,
  Avatar,
  Box,
  Stack,
  Tooltip,
  Typography,
  Button,
  IconButton,
  Drawer,
  useMediaQuery,
} from "@mui/material";
import {
  ArrowForward,
  ArrowDropDown,
  Menu as MenuIcon,
  Close,
} from "@mui/icons-material";
import {
  selectUser,
  setUserAvatarUrl,
  selectUserAvatarUrl,
} from "@/redux/slices/userSlice";
import Link from "next/link";
import logo from "../../../public/logo.png";

// Firebase
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "@/config/firebase";

// Constants
import {
  MAX_WIDTH,
  PAGE_PADDING_X,
  NAV_LINKS_GAP,
} from "@/constants/globalConstants";

// Hooks
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useTheme } from "@mui/material/styles";

// Components
import UserSettingsPanel from "./UserSettingsPanel";
import Logout from "../auth/Logout";

export default function UserTopNavBar() {
  // Hooks
  const dispatch = useDispatch();
  const router = useRouter();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const path = router.asPath;

  // States
  const user = useSelector(selectUser);
  const userAvatarUrl = useSelector(selectUserAvatarUrl);
  const [settingsView, setSettingsView] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Utils
  function toggleSettingsDrawer() {
    setSettingsView(!settingsView);
  }

  function handleRedirect() {
    router.push({ pathname: "/" });
  }

  function linkOpacity(target: string) {
    return path === target ? "initial" : "secondary";
  }
  function handleDrawerToggle() {
    setDrawerOpen(!drawerOpen);
  }

  function closeDrawer() {
    setDrawerOpen(false);
  }

  useEffect(() => {
    const fetchImage = async () => {
      try {
        if (!user) {
          dispatch(setUserAvatarUrl(null));
          return;
        }
        const imageRef = ref(storage, "profile/avatar.jpg");
        const downloadUrl = await getDownloadURL(imageRef);
        dispatch(setUserAvatarUrl(downloadUrl));
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchImage();
  }, [user, dispatch]);

  const linksBlock = (
    <>
      <Link
        href="/"
        className="unsetLink"
        onClick={closeDrawer}
        data-testid="recent-articles-link"
      >
        <Typography color={linkOpacity("/")}>Recent Articles</Typography>
      </Link>
      <Link
        href="/about"
        className="unsetLink"
        onClick={closeDrawer}
        data-testid="about-link"
      >
        <Typography color={linkOpacity("/about")}>About</Typography>
      </Link>
    </>
  );

  const userLinksBlock = (
    <>
      <Link
        href="/my-articles"
        className="unsetLink"
        onClick={closeDrawer}
        data-testid="my-articles-link"
      >
        <Typography color="primary">My Articles</Typography>
      </Link>

      <Link href="/create-article" className="unsetLink" onClick={closeDrawer}>
        <Typography color="primary">Create Article</Typography>
      </Link>
    </>
  );

  const logIn = (
    <Link href="/login">
      <Button
        aria-label="login"
        endIcon={<ArrowForward />}
        onClick={closeDrawer}
      >
        Log in
      </Button>
    </Link>
  );

  const mobileLinks = (
    <Stack sx={{ height: "100%" }}>
      <Stack sx={{ flexDirection: "row", justifyContent: "flex-end", p: 2 }}>
        <IconButton aria-label="close" onClick={closeDrawer} color="inherit">
          <Close />
        </IconButton>
      </Stack>
      <Stack
        sx={{
          px: 3,
          py: 3,
          gap: 3,
          height: "100%",
          justifyContent: "space-between",
        }}
      >
        <Stack sx={{ gap: 3 }}>
          {linksBlock}

          {user && userLinksBlock}
        </Stack>

        {!user && <Box>{logIn}</Box>}
        {user && <Logout toggleDrawer={closeDrawer} />}
      </Stack>
    </Stack>
  );

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "var(--navBarColor)",
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
              sx={{
                flexDirection: "row",
                alignItems: "center",
                gap: NAV_LINKS_GAP,
              }}
            >
              <button
                aria-label="go home"
                className="unsetLink"
                onClick={handleRedirect}
              >
                <Image
                  alt="logo"
                  src={logo}
                  style={{ width: "50px", height: "auto" }}
                />
              </button>

              {!isMobile && linksBlock}
            </Stack>

            <Stack
              sx={{
                alignItems: "center",
                flexDirection: "row",
                gap: NAV_LINKS_GAP,
              }}
            >
              {!isMobile && !user && logIn}

              {!isMobile && user && (
                <>
                  {userLinksBlock}

                  {userAvatarUrl && (
                    <Tooltip title="Settings" disableInteractive>
                      <Stack
                        sx={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <Button
                          size="small"
                          onClick={toggleSettingsDrawer}
                          color="inherit"
                          aria-label="Settings"
                        >
                          <ArrowDropDown />
                          <Avatar alt="avatar" src={userAvatarUrl} />
                        </Button>
                      </Stack>
                    </Tooltip>
                  )}
                </>
              )}

              {isMobile && (
                <IconButton
                  aria-label="open menu"
                  edge="end"
                  color="inherit"
                  onClick={handleDrawerToggle}
                >
                  <MenuIcon />
                </IconButton>
              )}
            </Stack>
          </Stack>
        </Stack>
      </AppBar>

      <Drawer anchor="right" open={drawerOpen} onClose={closeDrawer}>
        <Stack sx={{ width: 250, height: "100%" }}>{mobileLinks}</Stack>
      </Drawer>

      <UserSettingsPanel
        settingsView={settingsView}
        toggleDrawer={toggleSettingsDrawer}
      />
    </>
  );
}
