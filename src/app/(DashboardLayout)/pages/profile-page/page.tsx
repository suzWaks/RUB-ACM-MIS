"use client";
import { Avatar, Box, Button, Typography, Paper, Container } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import * as React from 'react';

const ProfilePage = () => {
  const theme = useTheme();
  const userProfile = {
    name: "Tashi Kuenga Phuntsho",
    studentNumber: "CST2020153",
    email: "tashi.phuntsho@cst.edu.bt",
    department: "Information Technology",
    year: "4th Year",
  };

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 6 }}>
      <Paper
        elevation={6}
        sx={{
          p: 4,
          width: '100%',
          maxWidth: 600,
          borderRadius: 16,
          background: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          boxShadow: theme.shadows[8],
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Typography 
          variant="h4" 
          sx={{ 
            fontWeight: '600', 
            color: theme.palette.secondary.main, 
            fontSize: '1.75rem',
            mb: 2, 
            letterSpacing: '0.01rem'
          }}
        >
          Profile
        </Typography>
        <Avatar
          alt={userProfile.name}
          src="https://via.placeholder.com/130"
          sx={{ 
            width: 130, 
            height: 130, 
            mb: 3, 
            boxShadow: theme.shadows[4], 
            border: `4px solid ${theme.palette.primary.main}`, 
            borderRadius: '50%', 
          }}
        />
        <Typography 
          variant="h5" 
          sx={{ 
            fontWeight: '600', 
            color: theme.palette.primary.main,
            fontSize: '1.5rem',
            mb: 1,
          }}
        >
          {userProfile.name}
        </Typography>
        <Typography 
          variant="subtitle1" 
          sx={{ 
            color: theme.palette.secondary.main, 
            mb: 2,
            fontSize: '1.2rem',
            fontStyle: 'italic',
          }}
        >
          {userProfile.studentNumber}
        </Typography>

        <Box sx={{ mb: 3, textAlign: 'center' }}>
          <Typography variant="body1" sx={{ color: theme.palette.text.primary, mb: 1 }}>
            <strong>Email:</strong> {userProfile.email}
          </Typography>
          <Typography variant="body1" sx={{ color: theme.palette.text.primary, mb: 1 }}>
            <strong>Department:</strong> {userProfile.department}
          </Typography>
          <Typography variant="body1" sx={{ color: theme.palette.text.primary }}>
            <strong>Year:</strong> {userProfile.year}
          </Typography>
        </Box>
        <Button
          variant="contained"
          sx={{
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.primary.contrastText,
            borderRadius: 30,
            px: 5,
            py: 1.5,
            textTransform: 'none',
            fontWeight: 'bold',
            transition: 'background-color 0.3s, transform 0.2s',
            '&:hover': {
              backgroundColor: theme.palette.secondary.dark,
              transform: 'scale(1.05)',
            },
          }}
        >
          Edit Profile
        </Button>
      </Paper>
    </Container>
  );
};

export default ProfilePage;
