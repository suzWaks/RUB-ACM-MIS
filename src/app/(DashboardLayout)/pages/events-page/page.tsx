"use client";

import React from "react";
import { Typography, Box } from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import theme from "@/utils/theme";
import Calendar from './calendar'; // For named export
// Import the Calendar component

const EventsPage: React.FC = () => {
  return (
    <PageContainer title="Event Page" description="Members page">
      <Box>
        {/* Custom Title with Purple Color */}
        <Typography variant="h3" style={{ color: theme.palette.primary.main, marginBottom: theme.spacing(2) }}>
          Events
        </Typography>

        {/* Include the Calendar component here */}
        <Calendar />
      </Box>
    </PageContainer>
  );
};

export default EventsPage;
