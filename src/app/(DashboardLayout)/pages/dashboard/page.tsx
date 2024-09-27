"use client";
import React from "react";
import { Typography, Grid, Box, Paper } from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import StudentGraph from "@/app/(DashboardLayout)/pages/dashboard/GraphProp";
import theme from "@/utils/theme";
import RecentActivity from "./RecentActivityProp";
import FinancialOverview from "@/app/(DashboardLayout)/pages/dashboard/OverviewProp";
import EventCalendar from "./Eventsprop";

const Dashboard = () => {
  const activities = [
    { date: "2024-09-26", title: "Joined the ACM chapter" },
    { date: "2024-09-25", title: "Attended the Workshop" },
    { date: "2024-09-24", title: "Completed a Project" },
  ];

  const events = [
    { name: "Event 1", date: new Date(2024, 9, 1) }, // October 1, 2024
    { name: "Event 2", date: new Date(2024, 9, 5) }, // October 5, 2024
    { name: "Event 3", date: new Date(2024, 9, 10) }, // October 10, 2024
  ];

  return (
    <PageContainer description="Home of RUB ACM MIS">
      <DashboardCard>
        <Box>
          {/* Announcements Section */}
          <Box mb={2}>
            <Paper elevation={2} sx={{ padding: 2 }}>
              <Typography variant="h5" sx={{ color: theme.palette.primary.main }}>
                Announcements
              </Typography>
              {/* Add actual content later */}
            </Paper>
          </Box>

          {/* Member Statistics Section */}
          <Box mb={2}>
            <Paper elevation={2} sx={{ padding: 2 }}>
              <Typography variant="h5" sx={{ color: theme.palette.primary.main }}>
                Member Statistics
              </Typography>
              <Grid container spacing={2} mt={2}>
                {/* Individual member statistics */}
                {[
                  { label: 'Male Count', data: [20, 30, 40, 50, 40] },
                  { label: 'Female Count', data: [40, 50, 55, 60, 20] },
                  { label: 'Others', data: [3, 4, 5, 6, 33] },
                  { label: 'Total Members', data: [50, 70, 80, 90, 105] },
                ].map((stat, index) => (
                  <Grid item xs={6} md={3} key={index}>
                    <Paper elevation={2} sx={{ padding: 0 }}>
                      <Typography variant="h6" padding={1}>
                        {stat.label}: {stat.data.reduce((acc, curr) => acc + curr, 0)}
                      </Typography>
                      <StudentGraph data={stat.data} />
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Box>

          <Grid container spacing={2} alignItems="stretch">
            {/* Recent Activity */}
            <Grid item xs={12} md={3}>
              <RecentActivity activities={activities} />
            </Grid>

            {/* Event Calendar */}
            <Grid item xs={12} md={6}>
              <EventCalendar events={events} />
            </Grid>

            {/* Financial Overview */}
            <Grid item xs={12} md={3}>
              <FinancialOverview budgetUsed={15000} budgetRemaining={35000} />
            </Grid>
          </Grid>
        </Box>
      </DashboardCard>
    </PageContainer>
  );
};

export default Dashboard;
