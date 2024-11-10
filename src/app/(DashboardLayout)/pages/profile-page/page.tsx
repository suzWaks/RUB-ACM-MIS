"use client";
import React, { useState, useEffect } from "react";
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
import EditIcon from "@mui/icons-material/Edit";
import { useSession } from "next-auth/react";
import Loading from "../../loading";

const ProfilePage: React.FC = () => {
  const theme = useTheme();
  const [isEditing, setIsEditing] = React.useState(false);
  const [userProfile, setUserProfile] = useState({
    name: "",
    studentNumber: "",
    email: "",
    department: "",
    programme: "",
    year: "",
    contactNumber: "",
    gender: "",
    designation: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { data: session, status } = useSession(); // Fetch session data

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

  //------------------------------------------------------------
  // Integration Code //
  interface Member {
    name: string;
    std_id: string;
    programme: string;
    contact_number: number;
    year: number;
    email: string;
    department: string;
    gender: string;
    designation: string;
  }

  const fetchUserDetails = async () => {
    try {
      if (session?.user?.id) {
        setLoading(true);
        const response = await fetch(`/api/members/${session.user.id}`);
        if (!response.ok) {
          throw new Error("Fetch error");
        }
        const result = await response.json();

        // Update userProfile with fetched data
        setUserProfile({
          name: result.name,
          studentNumber: result.std_id,
          email: result.email,
          department: result.department,
          programme: result.programme,
          year: result.year.toString(),
          contactNumber: result.contact_number.toString(),
          gender: result.gender,
          designation: result.designation,
        });
      } else {
        setError("User not logged in");
      }
    } catch (error) {
      setError("Some Error Occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session?.user?.id) {
      fetchUserDetails();
    }
  }, [session?.user?.id]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Typography>{error}</Typography>;
  }
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
          src="https://thumbs.dreamstime.com/b/generic-person-gray-photo-placeholder-man-silhouette-white-background-144511705.jpg"
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

                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      value={userProfile.email}
                      onChange={handleChange}
                      sx={{
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
                            backgroundColor: isEditing
                              ? "#ffffff"
                              : "transparent",
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
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Contact Number"
                      name="contactNumber"
                      value={userProfile.contactNumber}
                      onChange={handleChange}
                      sx={{
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
                            backgroundColor: isEditing
                              ? "#ffffff"
                              : "transparent",
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
                  </Grid>
                </Grid>
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

                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Department"
                      name="department"
                      value={userProfile.department}
                      onChange={handleChange}
                      sx={{
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
                            backgroundColor: isEditing
                              ? "#ffffff"
                              : "transparent",
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
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Year"
                      name="year"
                      value={userProfile.year}
                      onChange={handleChange}
                      sx={{
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
                            backgroundColor: isEditing
                              ? "#ffffff"
                              : "transparent",
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
                  </Grid>
                </Grid>
                <TextField
                  fullWidth
                  label="Programme"
                  name="Programme"
                  value={userProfile.programme}
                  onChange={handleChange}
                  sx={{
                    marginTop: "14px",
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
                  Details
                </Typography>

                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Gender"
                      name="Gender"
                      value={userProfile.gender}
                      onChange={handleChange}
                      sx={{
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
                            backgroundColor: isEditing
                              ? "#ffffff"
                              : "transparent",
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
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Designation"
                      name="Designation"
                      value={userProfile.designation}
                      onChange={handleChange}
                      sx={{
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
                            backgroundColor: isEditing
                              ? "#ffffff"
                              : "transparent",
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
                  </Grid>
                </Grid>
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
