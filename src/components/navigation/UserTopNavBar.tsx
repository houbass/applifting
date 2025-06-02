import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  AppBar,
  Avatar,
  Stack,
  Tooltip,
  Typography,
  Button,
} from "@mui/material";
import { ArrowForward, ArrowDropDown } from "@mui/icons-material";
import { selectUser } from "@/redux/slices/userSlice";
import Link from "next/link";
import logo from "../../../public/logo.png";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "@/config/firebase";

// Constants
import {
  MAX_WIDTH,
  PAGE_PADDING_X,
  NAV_LINKS_GAP,
} from "@/constants/globalConstants";

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
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

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

  // Get avatar image from Firebase Storage
  useEffect(() => {
    const fetchImage = async () => {
      try {
        if (!user) {
          setAvatarUrl(null);
          return;
        }
        const imageRef = ref(storage, "profile/avatar.jpg");
        const downloadUrl = await getDownloadURL(imageRef);
        setAvatarUrl(downloadUrl);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchImage();
  }, [user]);

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
              sx={{
                flexDirection: "row",
                alignItems: "center",
                gap: NAV_LINKS_GAP,
              }}
            >
              <button className="unsetLink" onClick={handleRedirect}>
                <Image
                  alt="logo"
                  src={logo}
                  style={{ width: "50px", height: "auto" }}
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

            <Stack
              sx={{
                alignItems: "center",
                flexDirection: "row",
                gap: NAV_LINKS_GAP,
              }}
            >
              {!user && (
                <Link href="/signin" passHref legacyBehavior>
                  <Button endIcon={<ArrowForward />}>Log in</Button>
                </Link>
              )}

              {user && (
                <>
                  <Link href="/my-articles" className="unsetLink">
                    <Typography color="primary">My Articles</Typography>
                  </Link>

                  <Link href="/create-article" className="unsetLink">
                    <Typography color="primary">Create Article</Typography>
                  </Link>

                  {avatarUrl && (
                    <Tooltip title="Settings" disableInteractive>
                      <Stack
                        sx={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <Button
                          size="small"
                          onClick={toggleDrawer}
                          color="inherit"
                          aria-label="Settings"
                        >
                          <ArrowDropDown />
                          <Avatar alt="avatar" src={avatarUrl} />
                        </Button>
                      </Stack>
                    </Tooltip>
                  )}
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
