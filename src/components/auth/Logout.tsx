import React, { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/config/firebase";
import { Button, Box, CircularProgress } from "@mui/material";
import { useDispatch } from "react-redux";
import { setSucces, setAlert } from "@/redux/slices/userSlice";

interface Props {
  toggleDrawer?: () => void;
}

export default function Logout({ toggleDrawer }: Props) {
  const dispatch = useDispatch();

  // States
  const [isLoading, setIsLoading] = useState(false);

  // Utils
  const handleLogout = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      await signOut(auth);
      if (toggleDrawer) {
        toggleDrawer();
      }
      setIsLoading(false);
      dispatch(setSucces("Successfully logged out"));
    } catch (err) {
      if (err instanceof Error) {
        console.error("Error logging out:", err.message);
      } else {
        console.error("Unexpected error", err);
      }
      dispatch(setAlert("Unexpected error, please try again later"));
      setIsLoading(false);
    }
  };

  return (
    <Box>
      <Button
        onClick={handleLogout}
        variant="contained"
        size="small"
        startIcon={isLoading && <CircularProgress size={20} color="inherit" />}
        aria-label="logout"
      >
        Log Out
      </Button>
    </Box>
  );
}
