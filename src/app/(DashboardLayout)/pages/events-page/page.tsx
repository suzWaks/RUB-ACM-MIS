"use client";

import React from "react";
import { Grid } from "@mui/material";
import Calendar from "./calendar";
import EventSidebar from "./eventsidebar";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";

const EventsPage: React.FC = () => {
  return (
    <PageContainer title="Event Page" description="Members page">
      <DashboardCard title="Event">
        <Grid container spacing={3}>
          {/* Sidebar Section (Left) */}
          <Grid item xs={3}>
            <EventSidebar />
          </Grid>

          {/* Calendar Section (Right) */}
          <Grid item xs={9}>
            <Calendar />
          </Grid>
        </Grid>
      </DashboardCard>
    </PageContainer>
  );
};

export default EventsPage;
