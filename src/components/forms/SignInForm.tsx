import React from "react";
import {
  Button,
  Stack,
  TextField,
  Card,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { setAlert, selectUser } from "@/redux/slices/userSlice";
import { auth } from "@/config/firebase";

interface LoginData {
  email: string;
  password: string;
}

// TODO progress on loging
export default function SignInForm() {
  // Redux
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  // Form hook
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>();

  async function handleSignIn(data: LoginData) {
    const { email, password } = data;
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      if (err instanceof Error) {
        dispatch(setAlert(err.message));
      } else {
        console.error("Unexpected error", err);
      }
    }
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
            type="email"
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
