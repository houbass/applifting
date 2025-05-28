import React, { useEffect } from "react";
import { Box, CircularProgress } from "@mui/material";
import {
  selectUser,
  selectUserCheck,
  setUserData,
} from "@/redux/slices/userSlice";

// Hooks
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@mui/material";
import useAuthListener from "@/hooks/auth/useAuthListener";
import useGetUserData from "@/hooks/firebase/useGetUserData";

// Components
import UserTopNavBar from "../navigation/UserTopNavBar";
import Snackbar from "../alerts/Snackbar";

const GlobalComponents = () => {
  // Hooks
  // Check if user is logged in
  useAuthListener();
  const dispatch = useDispatch();
  const theme = useTheme();

  // States
  const user = useSelector(selectUser);
  const userCheck = useSelector(selectUserCheck);

  const { data: userData } = useGetUserData(user?.uid);

  useEffect(() => {
    if (userData) {
      dispatch(setUserData(userData));
    }

    // reset on logout
    if (!userData) {
      dispatch(setUserData(null));
    }
  }, [userData, dispatch]);

  return (
    <>
      <UserTopNavBar />
      <Snackbar />
    </>
  );
};

export default GlobalComponents;
