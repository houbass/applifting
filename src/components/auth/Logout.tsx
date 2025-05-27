import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/config/firebase";
import { Button, Box } from "@mui/material";

// Hooks
import { useTranslations } from "next-intl";

interface Props {
  toggleDrawer?: () => void;
}

const Logout = ({ toggleDrawer }: Props) => {
  // Hooks
  const t = useTranslations("navbar");

  // Utils
  const handleLogout = async () => {
    try {
      await signOut(auth);
      if (toggleDrawer) {
        toggleDrawer();
      }
    } catch (err) {
      if (err instanceof Error) {
        console.error("Error logging out:", err.message);
      } else {
        console.error("Unexpected error", err);
      }
    }
  };

  return (
    <Box>
      <Button onClick={handleLogout} variant="contained" size="small">
        {t("Log Out")}
      </Button>
    </Box>
  );
};

export default Logout;
