import React from "react";
import Link from "next/link";
import { Box, Button, Stack, Typography } from "@mui/material";
import useDashboardRedirect from "@/hooks/redirects/useDashboardRedirect";

// Hooks
import { useTranslations } from "next-intl";

// Components
import BasicHead from "@/components/containers/BasicHead";
import PageLayout from "@/components/containers/PageLayout";

export default function Home() {
  // Redirect when log in
  const { user, userCheck } = useDashboardRedirect();

  // Hooks
  const t = useTranslations("signInUp");

  return (
    <>
      <BasicHead title="Collabro" />

      {!user && userCheck && (
        <PageLayout>
          <Stack>
            <Box pb={6}>
              <Typography
                variant="h4"
                textTransform="uppercase"
                textAlign="center"
              >
                wanna collab bro?
              </Typography>
            </Box>

            <Stack gap={1}>
              <Link href="/signin" passHref legacyBehavior>
                <Button variant="contained">{t("Sign In")}</Button>
              </Link>

              <Link href="/signup" passHref legacyBehavior>
                <Button variant="contained">{t("Sign Up")}</Button>
              </Link>
            </Stack>
          </Stack>
        </PageLayout>
      )}
    </>
  );
}

export async function getStaticProps({ locale }: { locale: string }) {
  const signInUp = (await import(`../../messages/${locale}/signInUp.json`))
    .default;

  const navbar = (await import(`../../messages/${locale}/navbar.json`)).default;

  return {
    props: {
      messages: {
        signInUp,
        navbar,
      },
    },
  };
}
