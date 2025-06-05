import { useState } from "react";
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
import { useDispatch } from "react-redux";
import { setAlert, setSucces } from "@/redux/slices/userSlice";
import { auth } from "@/config/firebase";

interface LoginData {
  email: string;
  password: string;
}

export default function LoginForm() {
  const dispatch = useDispatch();

  // States
  const [isLoading, setIsLoading] = useState(false);

  // Form hook
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<LoginData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function handleSignIn(data: LoginData) {
    const { email, password } = data;
    if (isLoading) return;
    setIsLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);

      setIsLoading(false);
      dispatch(setSucces("Successfully logged in"));
    } catch (err) {
      if (err instanceof Error) {
        dispatch(setAlert("invalid-credentials"));
        setValue("password", "");
        setIsLoading(false);
      } else {
        console.error("Unexpected error", err);
        dispatch(setAlert("Unexpected error please try again later"));
        setIsLoading(false);
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
      <Stack
        component="form"
        onSubmit={handleSubmit(handleSignIn)}
        sx={{ gap: 3, p: 4 }}
      >
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
          <Button
            aria-label="login"
            variant="contained"
            type="submit"
            startIcon={
              isLoading && <CircularProgress size={20} color="inherit" />
            }
          >
            Log In
          </Button>
        </Stack>
      </Stack>
    </Card>
  );
}
