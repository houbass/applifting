import { Stack } from "@mui/material";
import useHomeRedirectOnLogIn from "@/hooks/redirects/useHomeRedirectOnLogIn";
import { PAGE_PADDING_X } from "@/constants/globalConstants";

// Components
import PageLayout from "@/components/containers/PageLayout";
import BasicHead from "@/components/containers/BasicHead";
import LoginForm from "@/components/forms/LoginForm";

export default function Signin() {
  // Redirect when log in
  useHomeRedirectOnLogIn();

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
          <LoginForm />
        </Stack>
      </main>
    </PageLayout>
  );
}
