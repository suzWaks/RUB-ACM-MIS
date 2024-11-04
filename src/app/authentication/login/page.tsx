"use client";
import Link from "next/link";
import {
  Grid,
  Box,
  Stack,
  Typography,
  Button,
  TextField,
  useTheme,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import Logo from "@/app/(DashboardLayout)/layout/shared/logo/Logo";
import Image from "next/image";
import { signIn, useSession, getSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Snackbar, Alert } from "@mui/material";

const Login2 = () => {
  const theme = useTheme();
  const { data: session, status } = useSession();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State for error messages
  const [open, setOpen] = useState(false); // State for alert visibility

  /*
   *Not needed Just for debugging purposes.
   */
  useEffect(() => {
    // Print session data to the console when session changes
    if (session) {
      console.log("Session Data:", session);
    } else if (status === "unauthenticated") {
      console.log("No active session found.");
    }
  }, [session, status]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  const handleSignIn = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        console.log("Sign-in failed:", result.error);
        setError("Incorrect Username or Password"); // Set the error message
        setOpen(true); // Open the alert
      } else {
        const session = await getSession(); // Fetch the session details
        console.log("Session details:", session);

        router.push("http://localhost:3000/pages/dashboard");
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
      setError("An unexpected error occurred."); // Set a generic error message
      setOpen(true); // Open the alert
    }
  };

  const handleClose = () => {
    setOpen(false); // Close the alert
    setError(""); // Clear the error message
  };

  return (
    <Box
      sx={{
        position: "relative",
        backgroundColor: "white",
        height: "100vh",
      }}
    >
      {/* Snackbar for displaying alerts */}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>

      <Grid container sx={{ height: "100%" }}>
        <Grid
          item
          xs={12}
          lg={6}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box sx={{ width: "100%", maxWidth: "500px", textAlign: "center" }}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              mb={2}
            >
              <Logo />
            </Box>
            <Typography
              variant="h4"
              fontWeight="bold"
              mb={1}
              color="primary.main"
            >
              Sign in to ACM-MS
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" mb={3}>
              Please enter your details below
            </Typography>
            <Box component="form" noValidate>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="E-mail"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Stack direction="row" justifyContent="space-between" mt={2}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <input type="checkbox" id="rememberMe" />
                  <label htmlFor="rememberMe">
                    <Typography color="textSecondary" variant="body2">
                      Remember me
                    </Typography>
                  </label>
                </Stack>
                <Link href="/authentication/forgot-password" passHref>
                  <Typography
                    color="primary.main"
                    variant="body2"
                    sx={{ cursor: "pointer", textDecoration: "none" }}
                  >
                    Forgot password?
                  </Typography>
                </Link>
              </Stack>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleSignIn}
              >
                Log in
              </Button>
              <Typography variant="body2" color="textSecondary" mb={2}>
                or
              </Typography>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<GoogleIcon />}
                sx={{ mb: 3, color: "inherit" }}
              >
                Sign in with Google
              </Button>
            </Box>
            <Typography variant="body2" color="textSecondary">
              Don&apos;t have an account?{" "}
              <Link href="/authentication/register" passHref>
                <Typography
                  component="span"
                  color={theme.palette.secondary.main}
                  fontWeight="500"
                  sx={{ cursor: "pointer", textDecoration: "none" }}
                >
                  Sign up for free
                </Typography>
              </Link>
            </Typography>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          lg={6}
          sx={{
            display: { xs: "none", lg: "block" },
            position: "relative",
            backgroundImage: "url('/images/backgrounds/CSTHostel.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              bottom: 40,
              left: 20,
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              p: 2,
              top: "70%",
            }}
          >
            <Box
              display="flex"
              flexDirection="column"
              alignItems="flex-start"
              mb={1}
            >
              <Box sx={{ width: 80, height: 80, position: "relative", mb: 1 }}>
                <Image
                  src="/images/logos/cstlogo.png"
                  alt="CST Logo"
                  layout="fill"
                  objectFit="contain"
                />
              </Box>
              <Box display="flex" alignItems="center">
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  color={theme.palette.secondary_blue.main}
                  sx={{ display: "inline" }}
                >
                  ACM CHAPTER
                </Typography>
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  color="white"
                  sx={{ display: "inline", ml: 1 }}
                >
                  MANAGEMENT SYSTEM
                </Typography>
              </Box>
            </Box>
            <Typography variant="h2" fontWeight="bold" color="white">
              College of Science and Technology
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Login2;
