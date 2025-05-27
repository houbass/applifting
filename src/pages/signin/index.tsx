import React, { useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/firebase";
import useDashboardRedirect from "@/hooks/redirects/useDashboardRedirect";
import {
  PAGE_PADDING_TOP,
  PAGE_PADDING_X,
  MAX_WIDTH,
} from "@/constants/globalConstants";
import { useTranslations } from "next-intl";

// Components
import BasicHead from "@/components/containers/BasicHead";
import SignInUp from "@/components/auth/SignInUp";
import GoogleSignUp from "@/components/auth/GoogleSingnUp";

export default function Signin() {
  // Redirect when log in
  const { user, userCheck } = useDashboardRedirect();

  // Hooks
  const t = useTranslations("signInUp");

  // States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSignIn = async () => {
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setSuccess(t("Successfully signed in"));
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
        //alert('Error signing in. Please try again.');
      } else {
        console.error("Unexpected error", err);
      }
    }
  };

  return (
    <>
      <BasicHead title={t("Sign In")} />

      {!user && userCheck && (
        <main>
          <Stack alignItems="center" px={PAGE_PADDING_X} py={PAGE_PADDING_TOP}>
            <Stack gap={1} maxWidth={MAX_WIDTH} width="100%">
              <Box>
                <Typography>{t("LETS SIGN IN")}</Typography>
              </Box>

              <SignInUp
                setEmail={setEmail}
                setPassword={setPassword}
                handler={handleSignIn}
                success={success}
                error={error}
                text={t("Sign In")}
              />

              <GoogleSignUp />
            </Stack>
          </Stack>
        </main>
      )}
    </>
  );
}

export async function getStaticProps({ locale }: { locale: string }) {
  const signInUp = (await import(`../../../messages/${locale}/signInUp.json`))
    .default;

  return {
    props: {
      messages: {
        signInUp,
      },
    },
  };
}
