import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/config/firebase";
import { Button, Box } from "@mui/material";

interface Props {
  toggleDrawer?: () => void;
}

export default function Logout({ toggleDrawer }: Props) {
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
        Log Out
      </Button>
    </Box>
  );
}
