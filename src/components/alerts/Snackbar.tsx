import React, { useEffect, useRef, useState } from "react";
import { Snackbar as Snack, Alert } from "@mui/material";
import { useSelector } from "react-redux";
import { selectAlert } from "@/redux/slices/userSlice";

export default function Snackbar() {
  // States
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const { text, type } = useSelector(selectAlert);
  const [open, setOpen] = useState(false);
  const [firstRun, setFirstRun] = useState(true);

  // Timer to close the alert after 3 seconds
  useEffect(() => {
    setFirstRun(false);
    if (text && text.length > 0 && !firstRun) {
      setOpen(true);

      // Clear any existing timer before starting a new one
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        setOpen(false);
      }, 3000);

      // Cleanup function to clear the timer when component unmounts
      return () => {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }
      };
    }
  }, [firstRun, text]);

  return (
    <>
      {text && type && (
        <Snack
          open={open}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          sx={{ zIndex: 9999 }}
        >
          <Alert severity={type} variant="filled" sx={{ width: "100%" }}>
            {text}
          </Alert>
        </Snack>
      )}
    </>
  );
}
