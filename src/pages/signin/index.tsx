import React, { useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/firebase";
import useHomeRedirect from "@/hooks/redirects/useHomeRedirect";

import {
  PAGE_PADDING_TOP,
  PAGE_PADDING_X,
  MAX_WIDTH,
} from "@/constants/globalConstants";

// Components
import BasicHead from "@/components/containers/BasicHead";
import SignInUp from "@/components/auth/SignInUp";

export default function Signin() {
  // Redirect when log in
  const { user, userCheck } = useHomeRedirect();

  // States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSignIn = async () => {
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setSuccess("Successfully signed in");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        console.error("Unexpected error", err);
      }
    }
  };

  return (
    <>
      <BasicHead title="Sign In" />

      {!user && userCheck && (
        <main>
          <Stack alignItems="center" px={PAGE_PADDING_X} py={PAGE_PADDING_TOP}>
            <Stack gap={1} maxWidth={MAX_WIDTH} width="100%">
              <Box>
                <Typography>LETS SIGN IN</Typography>
              </Box>

              <SignInUp
                setEmail={setEmail}
                setPassword={setPassword}
                handler={handleSignIn}
                success={success}
                error={error}
                text="Sign In"
              />
            </Stack>
          </Stack>
        </main>
      )}
    </>
  );
}
