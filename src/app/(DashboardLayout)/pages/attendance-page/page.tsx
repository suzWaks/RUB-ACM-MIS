"use client";

import React from "react";
import { Typography, Box, Card, Grid, Button } from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import theme from "@/utils/theme";
import Bar from "./barChart";
import Pie from "./pieChart";
import GaugeChart from "./GaugeChart";
import ActiveYear from "./activeYear";
import LineGraph from "./LineChart";
import Link from "next/link";

const AttendancePage: React.FC = () => {
  return (
    <PageContainer
      title="Attendance Page"
      description="Page to display attendance records"
    >
      <Box>
        <Typography
          variant="h3"
          style={{
            color: theme.palette.primary.main,
            marginBottom: theme.spacing(2),
          }}
        >
          Attendance Records
        </Typography>

        <Box>
          <Card>
            <LineGraph />
          </Card>
        </Box>
        {/* Box containing Bar and Pie charts side by side */}
        <Box sx={{ marginTop: 4 }}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Card
                sx={{
                  p: 2,
                  borderRadius: "25px", // Match card style
                  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)", // Match shadow
                  backgroundColor: "#ffffff",
                }}
              >
                <Box
                  display="flex"
                  gap={theme.spacing(1)}
                  justifyContent="space-between"
                  flexWrap="wrap"
                >
                  <Box flex={1} maxWidth="50%">
                    <Bar />
                  </Box>
                  <Box flex={1} maxWidth="50%">
                    <Box>
                      <GaugeChart />
                    </Box>
                    <Box mt={2}>
                      <Pie />
                    </Box>
                  </Box>
                </Box>
              </Card>
            </Grid>
            <Grid item xs={4}>
              <Card
                sx={{
                  p: 2,
                  borderRadius: "25px", // Match card style
                  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)", // Match shadow
                  backgroundColor: "#ffffff",
                }}
              >
                <ActiveYear />
              </Card>
              <Box
                sx={{
                  padding: 2, // Adjust the padding value
                  marginTop: 2, // Adjust the margin-top value
                  display: "flex", // To place buttons side by side
                  justifyContent: "space-between", // Equal space between buttons
                  gap: 2, // Optional, to add some gap between the buttons
                }}
              >
                <Link href="/pages/take-attendance-page">
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: theme.palette.primary.main, // Button background color
                      borderRadius: "50px", // Border radius for rounded corners
                      padding: "10px 20px", // Adjust padding for better button appearance
                      color: "#fff", // Text color
                      "&:hover": {
                        backgroundColor: "#005BB5", // Darker background on hover
                      },
                    }}
                  >
                    Take attendance
                  </Button>
                </Link>

                <Link href="/pages/view-all-attendance">
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: theme.palette.primary_blue.main, // Button background color
                      borderRadius: "50px", // Border radius for rounded corners
                      padding: "10px 20px", // Adjust padding for better button appearance
                      color: "#fff", // Text color
                      "&:hover": {
                        backgroundColor: "#005BB5", // Darker background on hover
                      },
                    }}
                  >
                    View All Attendance
                  </Button>
                </Link>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </PageContainer>
  );
};

export default AttendancePage;
