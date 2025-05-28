import React, { useEffect } from "react";
import { Box, CircularProgress } from "@mui/material";
import {
  selectUser,
  selectUserCheck,
  selectUserData,
  setUserData,
} from "@/redux/slices/userSlice";
import { selectFilterData } from "@/redux/slices/dashboardSlice";

// Hooks
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@mui/material";
import useAuthListener from "@/hooks/auth/useAuthListener";
import useGetTimelineData from "@/hooks/firebase/useGetTimelineData";
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
  const { fetchTimeline } = useGetTimelineData();

  // States
  const user = useSelector(selectUser);
  const userCheck = useSelector(selectUserCheck);
  const userDataRedux = useSelector(selectUserData);
  const { data: userData } = useGetUserData(user?.uid);
  const filterData = useSelector(selectFilterData);

  useEffect(() => {
    if (userData) {
      dispatch(setUserData(userData));
    }

    // reset on logout
    if (!userData && userDataRedux) {
      dispatch(setUserData(null));
    }
  }, [userData]);

  // Fetch timeline data
  useEffect(() => {
    if (userDataRedux) {
      fetchTimeline();
    }
  }, [userDataRedux, filterData]);

  return (
    <>
      {!userCheck && (
        <Box
          sx={{
            top: 0,
            position: "absolute",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: theme.palette.background.default,
            zIndex: 2,
          }}
        >
          <CircularProgress color="inherit" />
        </Box>
      )}

      <UserTopNavBar />
      <Snackbar />
    </>
  );
};

export default GlobalComponents;
