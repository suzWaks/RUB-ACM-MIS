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
import NotificationCard from "./AnnouncementProp";

const Dashboard = () => {
  const activities = [
    { date: "2024-09-26", title: "Joined the ACM chapter" },
    { date: "2024-09-25", title: "Attended the Workshop" },
    { date: "2024-09-24", title: "Completed a Project" },
    { date: "2024-10-24", title: "Programming contest" },
  ];

  const events = [
    { name: "Event 1", date: new Date(2024, 9, 1) },
    { name: "Event 2", date: new Date(2024, 9, 5) },
    { name: "Event 3", date: new Date(2024, 9, 10) },
  ];

  const graphColors = [
    theme.palette.primary.main,
    theme.palette.primary_blue.main,
    theme.palette.secondary_blue.main,
    theme.palette.secondary_teal.main,
  ];

  return (
    <PageContainer description="Home of RUB ACM MIS">
      <DashboardCard>
        <Box>
          <Box mb={2}>
            <Paper sx={{ padding: 2 }} elevation={0}>
              <Typography
                variant="h5"
                sx={{ color: theme.palette.primary.main, mb: 2 }}
              >
                Announcements
              </Typography>
              <NotificationCard
                message="The ACM club coordinator wants to meet all the first years"
                time="8pm"
                date="26th Sept"
                postedBy="Admin"
              />
            </Paper>
          </Box>

          <Box mb={2}>
            <Paper sx={{ padding: 2 }} elevation={0}>
              <Typography
                variant="h5"
                sx={{ color: theme.palette.primary.main, mb: 2 }}
              >
                Member Statistics
              </Typography>
              <Grid container spacing={1} mt={2}>
                {[
                  { label: "Male Count", data: [20, 30, 40, 50, 40] },
                  { label: "Female Count", data: [40, 50, 55, 60, 20] },
                  { label: "Others", data: [3, 4, 5, 6, 33] },
                  { label: "Total Members", data: [50, 70, 80, 90, 105] },
                ].map((stat, index) => (
                  <Grid item xs={6} md={3} key={index}>
                    <Paper sx={{ padding: 0 }} elevation={2}>
                      <Typography variant="h6" padding={1}>
                        {stat.label}:{" "}
                        {stat.data.reduce((acc, curr) => acc + curr, 0)}
                      </Typography>

                      <StudentGraph
                        data={stat.data}
                        color={graphColors[index]} 
                      />
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Box>

          <Grid container spacing={2} alignItems="stretch">
            <Grid item xs={12} md={3}>
              <Box>
                <RecentActivity activities={activities} />
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <EventCalendar events={events} />
            </Grid>

            <Grid item xs={12} md={3}>
              <Box >
                <FinancialOverview budgetUsed={15000} budgetRemaining={35000} />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </DashboardCard>
    </PageContainer>
  );
};

export default Dashboard;
