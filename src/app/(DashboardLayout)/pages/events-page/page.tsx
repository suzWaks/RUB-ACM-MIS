"use client";

import React, { useState } from "react";
import { Grid, Button } from "@mui/material";
import Calendar from "./calendar";
import EventSidebar from "./eventsidebar";
import EventTable from "./table"; // Import the event table
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";

const EventsPage: React.FC = () => {
  const [view, setView] = useState<"sidebar" | "table">("sidebar"); // Manage view state

  const handleViewAllEvents = () => {
    setView("table"); // Switch to the event table view
  };

  const handleBackToCalendar = () => {
    setView("sidebar"); // Switch back to the sidebar and calendar view
  };

  return (
    <PageContainer title="Event Page" description="Members page">
      <DashboardCard title="Event">
        <Grid container spacing={3}>
          {view === "sidebar" && (
            <>
              {/* Sidebar Section (Left) */}
              <Grid item xs={3}>
                <EventSidebar onViewAllEvents={handleViewAllEvents} />
              </Grid>

              {/* Calendar Section (Right) */}
              <Grid item xs={9}>
                <Calendar />
              </Grid>
            </>
          )}

          {view === "table" && (
            <>
              {/* Event Table Section (Takes Full Width) */}
              <Grid item xs={12}>
                <EventTable onClose={handleBackToCalendar} />
              </Grid>
            </>
          )}
        </Grid>
      </DashboardCard>
    </PageContainer>
  );
};

export default EventsPage;
