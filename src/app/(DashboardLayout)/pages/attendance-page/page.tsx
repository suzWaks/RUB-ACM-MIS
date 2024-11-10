"use client";

import React from "react";
import { Typography, Box } from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import theme from "@/utils/theme";
// Import the Calendar component

const EventsPage: React.FC = () => {
  return (
    <PageContainer
      title="Attendance Page"
      description="Page to display attendance records"
    >
      <Box>
        {/* Custom Title with Purple Color */}
        <Typography
          variant="h3"
          style={{
            color: theme.palette.primary.main,
            marginBottom: theme.spacing(2),
          }}
        >
          Attendance Records
        </Typography>
      </Box>
    </PageContainer>
  );
};

export default EventsPage;
