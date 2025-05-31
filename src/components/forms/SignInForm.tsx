import React from "react";
import { Button, Stack, TextField, Card, Typography } from "@mui/material";
import { useForm } from "react-hook-form";

interface LoginData {
  email: string;
  password: string;
}

export default function SignInForm() {
  // Form hook
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>();

  async function handleSignIn(data: LoginData) {
    console.log(data);
    /*
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
      */
  }

  return (
    <Card
      variant="outlined"
      sx={{
        width: "100%",
        maxWidth: "368px",
        boxShadow: "0px 18px 48px 0px rgba(0,0,0,0.175)",
        borderRadius: 2,
      }}
    >
      <Stack sx={{ gap: 3, p: 4 }}>
        <Typography variant="h3">Log In</Typography>
        <Stack sx={{ gap: 1 }}>
          <Typography id="email-label">Email</Typography>
          <TextField
            aria-labelledby="email-label"
            fullWidth
            placeholder="me@example.com"
            {...register("email", { required: "Email is required" })}
            error={!!errors.email}
            helperText={errors.email ? String(errors.email.message) : ""}
          />
        </Stack>

        <Stack sx={{ gap: 1 }}>
          <Typography id="password-label">Password</Typography>
          <TextField
            aria-labelledby="password-label"
            fullWidth
            type="password"
            placeholder="**********"
            {...register("password", { required: "Password is required" })}
            error={!!errors.password}
            helperText={errors.password ? String(errors.password.message) : ""}
          />
        </Stack>

        <Stack sx={{ flexDirection: "row", justifyContent: "flex-end" }}>
          <Button variant="contained" onClick={handleSubmit(handleSignIn)}>
            Log In
          </Button>
        </Stack>
      </Stack>
    </Card>
  );
}
