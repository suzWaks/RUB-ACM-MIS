"use client";

import {
  Avatar,
  Box,
  Button,
  Typography,
  Container,
  TextField,
  InputAdornment,
  Grid,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import * as React from "react";
import EditIcon from "@mui/icons-material/Edit"; // Importing Edit icon from Material-UI

const ProfilePage: React.FC = () => {
  const theme = useTheme();
  const [isEditing, setIsEditing] = React.useState(false);
  const [userProfile, setUserProfile] = React.useState({
    name: "Tashi Kuenga Phuntsho",
    studentNumber: "CST2020153",
    email: "tashi.phuntsho@cst.edu.bt",
    department: "Information Technology",
    year: "4th Year",
    contactNumber: "123-456-7890",
    gender: "Male",
    designation: "Student",
  });

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsEditing(false);
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: theme.palette.background.default,
        padding: "3rem",
        borderRadius: "12px",
        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Avatar
        alt={userProfile.name}
        src="https://via.placeholder.com/130" 
        sx={{
          width: 130,
          height: 130,
          mb: 3,
          border: `4px solid ${theme.palette.primary.main}`,
        }}
      />
      <Typography
        variant="h4"
        sx={{
          fontWeight: "700",
          color: theme.palette.primary.main,
          mb: 0.5,
          textAlign: "center",
          fontSize: "2rem",
        }}
      >
        {userProfile.name}
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{
          color: theme.palette.secondary.main,
          mb: 2,
          textAlign: "center",
          fontSize: "1.2rem",
        }}
      >
        {userProfile.studentNumber}
      </Typography>

      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <Grid container spacing={2}>

          <Grid item xs={12}>
            <Box
              sx={{
                padding: "1.5rem",
                borderRadius: "10px",
                backgroundColor: "#ffffff",
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "600",
                  color: theme.palette.secondary.main,
                  mb: 2,
                }}
              >
                Contact Information
              </Typography>

              <TextField
                fullWidth
                label="Email"
                name="email"
                value={userProfile.email}
                onChange={handleChange}
                sx={{
                  mb: 3,
                }}
                InputProps={{
                  readOnly: !isEditing,
                  startAdornment: isEditing ? (
                    <InputAdornment position="start">
                      <EditIcon color="primary" />
                    </InputAdornment>
                  ) : null,
                  sx: {
                    "& input": {
                      backgroundColor: isEditing ? "white" : "transparent",
                    },
                  },
                }}
                InputLabelProps={{
                  sx: {
                    color: isEditing
                      ? theme.palette.primary.main
                      : theme.palette.text.secondary,
                    fontSize: "1rem",
                    transition: "0.2s ease-in-out",
                  },
                  shrink: isEditing || userProfile.email !== "",
                }}
              />

              <TextField
                fullWidth
                label="Contact Number"
                name="contactNumber"
                value={userProfile.contactNumber}
                onChange={handleChange}
                sx={{
                  mb: 3,
                }}
                InputProps={{
                  readOnly: !isEditing,
                  startAdornment: isEditing ? (
                    <InputAdornment position="start">
                      <EditIcon color="primary" />
                    </InputAdornment>
                  ) : null,
                  sx: {
                    "& input": {
                      backgroundColor: isEditing ? "white" : "transparent",
                    },
                  },
                }}
                InputLabelProps={{
                  sx: {
                    color: isEditing
                      ? theme.palette.primary.main
                      : theme.palette.text.secondary,
                    fontSize: "1rem",
                    transition: "0.2s ease-in-out",
                  },
                  shrink: isEditing || userProfile.contactNumber !== "",
                }}
              />
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box
              sx={{
                padding: "1.5rem",
                borderRadius: "10px",
                backgroundColor: "#ffffff",
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "600",
                  color: theme.palette.secondary.main,
                  mb: 2,
                }}
              >
                Academic Details
              </Typography>

              <TextField
                fullWidth
                label="Department"
                name="department"
                value={userProfile.department}
                onChange={handleChange}
                sx={{
                  mb: 3,
                }}
                InputProps={{
                  readOnly: !isEditing,
                  startAdornment: isEditing ? (
                    <InputAdornment position="start">
                      <EditIcon color="primary" />
                    </InputAdornment>
                  ) : null,
                  sx: {
                    "& input": {
                      backgroundColor: isEditing ? "white" : "transparent",
                    },
                  },
                }}
                InputLabelProps={{
                  sx: {
                    color: isEditing
                      ? theme.palette.primary.main
                      : theme.palette.text.secondary,
                    fontSize: "1rem",
                    transition: "0.2s ease-in-out",
                  },
                  shrink: isEditing || userProfile.department !== "",
                }}
              />

              <TextField
                fullWidth
                label="Year"
                name="year"
                value={userProfile.year}
                onChange={handleChange}
                sx={{
                  mb: 3,
                }}
                InputProps={{
                  readOnly: !isEditing,
                  startAdornment: isEditing ? (
                    <InputAdornment position="start">
                      <EditIcon color="primary" />
                    </InputAdornment>
                  ) : null,
                  sx: {
                    "& input": {
                      backgroundColor: isEditing ? "white" : "transparent",
                    },
                  },
                }}
                InputLabelProps={{
                  sx: {
                    color: isEditing
                      ? theme.palette.primary.main
                      : theme.palette.text.secondary,
                    fontSize: "1rem",
                    transition: "0.2s ease-in-out",
                  },
                  shrink: isEditing || userProfile.year !== "",
                }}
              />
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              onClick={handleEditToggle}
              sx={{
                marginTop: "2rem",
                backgroundColor: theme.palette.secondary.main,
                color: theme.palette.primary.contrastText,
                borderRadius: 30,
                px: 5,
                py: 1.5,
                textTransform: "none",
                fontWeight: "600",
                fontSize: "1rem",
                transition: "background-color 0.3s, transform 0.2s",
                "&:hover": {
                  backgroundColor: theme.palette.secondary.dark,
                  transform: "scale(1.02)",
                },
                "&:active": {
                  transform: "scale(0.98)",
                },
              }}
            >
              {isEditing ? "Save Changes" : "Edit Profile"}
            </Button>
          </Grid>

        </Grid>
      </form>
    </Container>
  );
};

export default ProfilePage;
