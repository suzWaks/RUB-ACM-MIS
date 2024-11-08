"use client";
import React, { useEffect, useState } from "react";
import { Typography, Grid, Box, Paper } from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import StudentGraph from "@/app/(DashboardLayout)/pages/dashboard/GraphProp";
import theme from "@/utils/theme";
import RecentActivity from "./RecentActivityProp";
import FinancialOverview from "@/app/(DashboardLayout)/pages/dashboard/OverviewProp";
import EventCalendar from "./Eventsprop";
import NotificationCard from "./AnnouncementProp";
import { useSession } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";
import Loading from "../../loading";

interface MemberStat {
  label: string;
  data: number[];
}

interface AnnouncementDataFormat {
  description: string;
  time: string;
  date: string;
  postedBy: string;
}

interface Activity {
  date: string;
  title: string;
}

interface UpcomingEvents {
  name: string;
  date: Date;
}

interface budgetStats {
  balanceUsed: number;
  balanceRemaining: number;
}

const Dashboard = () => {
  const graphColors = [
    theme.palette.primary.main,
    theme.palette.primary_blue.main,
    theme.palette.secondary_blue.main,
    theme.palette.secondary_teal.main,
  ];

  //For Session Data
  const { data: session } = useSession();

  //For fetching data
  const [memberStats, setMemberStats] = useState<MemberStat[] | null>(null);
  const [latestAnnouncement, setLatestAnnouncement] =
    useState<AnnouncementDataFormat | null>(null);
  const [recentActivity, setRecentActivity] = useState<Activity[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<UpcomingEvents[]>([]);
  const [budgetInfo, setBudgetInfo] = useState<budgetStats | null>(null);
  const [errorType, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchMemberStats = async () => {
    try {
      const response = await fetch("/api/members/fetchMemberStats");

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      setMemberStats(result);
    } catch (error) {
      setError("Some Error Occured");
    }
  };

  const fetchAnnouncement = async () => {
    try {
      const response = await fetch("/api/announcements/lastestAnnouncement");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      setLatestAnnouncement(result);
    } catch (error) {
      setError("Some Error Occured");
    }
  };

  const fetchRecentActivity = async () => {
    try {
      const response = await fetch("../api/events/fetchRecentActivities");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      setRecentActivity(result);
    } catch (error) {
      setError("Some Error Occured");
    }
  };

  const fetchUpcomingEvents = async () => {
    try {
      const response = await fetch("../api/events/fetchUpcomingEvents");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      const formattedEvents = result.map(
        (event: { name: any; date: string | number | Date }) => ({
          name: event.name,
          date: new Date(event.date), // Ensure this is a Date object
        })
      );
      setUpcomingEvents(formattedEvents);
    } catch (error) {
      setError("Some Error Occured");
    }
  };

  const fetchBudgetStats = async () => {
    try {
      const response = await fetch("../api/financials/dashboardStats");
      if (!response.ok) {
        throw new Error("Network reponse was not ok");
      }
      const result = await response.json();
      console.log("Budget Info: ", result);
      setBudgetInfo(result);
    } catch (error) {
      setError("Some error occured");
    }
  };
  //Calling Use Effect to fetch data
  useEffect(() => {
    const fetchData = async () => {
      await fetchMemberStats();
      await fetchAnnouncement();
      await fetchRecentActivity();
      await fetchUpcomingEvents();
      await fetchBudgetStats();
      setLoading(false);
    };
    fetchData();
  }, []);

  //Test Code
  // if (session) {
  //   console.log("Session data is: ", session);
  // } else {
  //   console.log("Not Signed In");
  // }

  if (loading) return <Loading />;

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
                message={latestAnnouncement?.description ?? ""}
                time={latestAnnouncement?.time ?? ""}
                date={latestAnnouncement?.date ?? ""}
                postedBy={latestAnnouncement?.postedBy ?? ""}
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
                {memberStats?.map((stat, index) => (
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
                <RecentActivity activities={recentActivity} />
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <EventCalendar events={upcomingEvents} />
            </Grid>

            <Grid item xs={12} md={3}>
              <Box>
                <FinancialOverview
                  budgetUsed={budgetInfo?.balanceUsed ?? 0}
                  budgetRemaining={budgetInfo?.balanceRemaining ?? 0}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </DashboardCard>
    </PageContainer>
  );
};

export default Dashboard;
