import React from "react";
import { Button, Stack, TextField, Typography } from "@mui/material";

// Hooks
import { useTranslations } from "next-intl";

interface Props {
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
  handler: () => void;
  success: string;
  error: string;
  text: string;
  setDisplayName?: (value: string) => void;
}

const SignInUp = ({
  setEmail,
  setPassword,
  handler,
  success,
  error,
  text,
  setDisplayName,
}: Props) => {
  // Hooks
  const t = useTranslations("signInUp");

  return (
    <Stack gap={1}>
      {setDisplayName && (
        <TextField
          id="outlined-basic"
          label={t("Display Name")}
          variant="outlined"
          onChange={(e) => setDisplayName(e.target.value)}
        />
      )}

      <TextField
        id="outlined-basic"
        label={t("Email")}
        variant="outlined"
        onChange={(e) => setEmail(e.target.value)}
      />

      <TextField
        id="outlined-basic"
        label={t("Password")}
        variant="outlined"
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button variant="contained" onClick={handler}>
        {text}
      </Button>

      <Typography color="success">{success}</Typography>

      <Typography color="error">{error}</Typography>
    </Stack>
  );
};

export default SignInUp;
