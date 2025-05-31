import React, { useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/firebase";
import useHomeRedirect from "@/hooks/redirects/useHomeRedirect";

import { PAGE_PADDING_X } from "@/constants/globalConstants";

// Components
import PageLayout from "@/components/containers/PageLayout";
import BasicHead from "@/components/containers/BasicHead";
import SignInForm from "@/components/forms/SignInForm";

export default function Signin() {
  // Redirect when log in
  // TODO redirect
  const { user, userCheck } = useHomeRedirect();

  return (
    <PageLayout>
      <BasicHead title="Log In" />

      <main>
        <Stack
          sx={{
            px: PAGE_PADDING_X,
            py: 2,
            alignItems: "center",
          }}
        >
          <SignInForm />
        </Stack>
      </main>
    </PageLayout>
  );
}
