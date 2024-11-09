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
  Paper,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import * as React from "react";
import EditIcon from "@mui/icons-material/Edit";

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
        padding: "0",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "3rem",
          marginTop: "2rem",
          borderRadius: "20px",
          background: "white",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
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
            transition: "transform 0.3s",
            "&:hover": {
              transform: "scale(1.05)",
            },
          }}
        />
        <Typography
          variant="h3"
          sx={{
            fontWeight: "700",
            color: theme.palette.primary.main,
            mb: 0.5,
            textAlign: "center",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          {userProfile.name}
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: theme.palette.secondary.main,
            mb: 2,
            textAlign: "center",
            fontSize: "1.5rem",
            fontStyle: "italic",
          }}
        >
          {userProfile.studentNumber}
        </Typography>

        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Box
                sx={{
                  padding: "2rem",
                  borderRadius: "15px",
                  backgroundColor: "#f9f9f9",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                  transition: "0.3s",
                  "&:hover": {
                    boxShadow: "0 8px 40px rgba(0, 0, 0, 0.15)",
                  },
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: "600",
                    color: theme.palette.primary.main,
                    mb: 3,
                    textAlign: "left",
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
                    "& .MuiOutlinedInput-root": {
                      height: "56px",
                      paddingTop: "12px",
                      paddingBottom: "12px",
                    },
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
                        backgroundColor: isEditing ? "#ffffff" : "transparent",
                        transition: "background-color 0.3s ease-in-out",
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
                    "& .MuiOutlinedInput-root": {
                      height: "56px",
                      paddingTop: "12px",
                      paddingBottom: "12px",
                    },
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
                        backgroundColor: isEditing ? "#ffffff" : "transparent",
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
                  padding: "2rem",
                  borderRadius: "15px",
                  backgroundColor: "#f9f9f9",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                  transition: "0.3s",
                  "&:hover": {
                    boxShadow: "0 8px 40px rgba(0, 0, 0, 0.15)",
                  },
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: "600",
                    color: theme.palette.primary.main,
                    mb: 3,
                    textAlign: "left",
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
                    "& .MuiOutlinedInput-root": {
                      height: "56px",
                      paddingTop: "12px",
                      paddingBottom: "12px",
                    },
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
                        backgroundColor: isEditing ? "#ffffff" : "transparent",
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
                    "& .MuiOutlinedInput-root": {
                      height: "56px",
                      paddingTop: "12px",
                      paddingBottom: "12px",
                    },
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
                        backgroundColor: isEditing ? "#ffffff" : "transparent",
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

                <TextField
                  fullWidth
                  label="Gender"
                  name="gender"
                  value={userProfile.gender}
                  onChange={handleChange}
                  sx={{
                    mb: 3,
                    "& .MuiOutlinedInput-root": {
                      height: "56px",
                      paddingTop: "12px",
                      paddingBottom: "12px",
                    },
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
                        backgroundColor: isEditing ? "#ffffff" : "transparent",
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
                    shrink: isEditing || userProfile.gender !== "",
                  }}
                />

                <TextField
                  fullWidth
                  label="Designation"
                  name="designation"
                  value={userProfile.designation}
                  onChange={handleChange}
                  sx={{
                    mb: 3,
                    "& .MuiOutlinedInput-root": {
                      height: "56px",
                      paddingTop: "12px",
                      paddingBottom: "12px",
                    },
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
                        backgroundColor: isEditing ? "#ffffff" : "transparent",
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
                    shrink: isEditing || userProfile.designation !== "",
                  }}
                />
              </Box>
            </Grid>
          </Grid>

          <Button
            variant="contained"
            onClick={handleEditToggle}
            sx={{
              marginTop: "2rem",
              backgroundColor: theme.palette.secondary.main,
              color: theme.palette.primary.contrastText,
              borderRadius: "30px",
              px: 5,
              py: 1.5,
              textTransform: "none",
              fontWeight: "bold",
              fontSize: "1rem",
              transition:
                "background-color 0.3s, transform 0.2s, box-shadow 0.2s",
              "&:hover": {
                backgroundColor: theme.palette.secondary.dark,
                transform: "scale(1.05)",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
              },
              "&:active": {
                transform: "scale(0.98)",
              },
            }}
          >
            {isEditing ? "Save Changes" : "Edit Profile"}
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default ProfilePage;
