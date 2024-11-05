import React from "react";
import { Box, Typography, Button, TextField } from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import { Stack } from "@mui/system";
import { useRouter } from "next/navigation";
import { Snackbar, Alert } from "@mui/material";

interface registerType {
  title?: string;
  subtitle?: JSX.Element | JSX.Element[];
  subtext?: JSX.Element | JSX.Element[];
}

const AuthRegister = ({ title, subtitle, subtext }: registerType) => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State for error messages
  const [open, setOpen] = useState(false); // State for alert visibility
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const response = await fetch(" http://localhost:3000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message); // Capture error message from the response
      }

      setSuccess(true); // Set success state to true
      setOpen(false); // Close any previous error alert
      setTimeout(() => {
        router.push("/authentication/login"); // Redirect to login page after a successful registration
      }, 2000); // Delay to allow the success message to show
    } catch (error: any) {
      console.log(error);
      setError(error.message); // Set error message
      setOpen(true); // Show alert for the error
    }
  };

  const handleClose = () => {
    setOpen(false); // Close alert
  };

  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}

      <Box>
        <Stack mb={3}>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="email"
            mb="5px"
            mt="25px"
          >
            Email Address
          </Typography>
          <TextField
            id="email"
            variant="outlined"
            fullWidth
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="password"
            mb="5px"
            mt="25px"
          >
            Password
          </Typography>
          <TextField
            id="password"
            variant="outlined"
            fullWidth
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Stack>
        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          component={Link}
          href="#"
          onClick={handleSubmit}
        >
          Sign Up
        </Button>
      </Box>
      {/* Snackbar for error messages */}

      <Snackbar
        open={open}
        onClose={handleClose}
        message={error}
        autoHideDuration={6000}
      />

      {subtitle}
    </>
  );
};

export default AuthRegister;
