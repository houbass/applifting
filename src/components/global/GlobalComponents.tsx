import React from "react";

// Hooks
import useAuthListener from "@/hooks/auth/useAuthListener";

// Components
import UserTopNavBar from "../navigation/UserTopNavBar";
import Snackbar from "../alerts/Snackbar";

export default function GlobalComponents() {
  // Hooks
  // Check if user is logged in
  useAuthListener();

  return (
    <>
      <UserTopNavBar />
      <Snackbar />
    </>
  );
}
