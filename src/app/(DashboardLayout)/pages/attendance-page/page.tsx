"use client";

import React from "react";
import { Typography, Box } from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import theme from "@/utils/theme";
import Bar from "./barChart";
import Pie from "./pieChart";

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

        {/* Box containing Bar and Pie charts side by side */}
        <Box
          display="flex"
          gap={theme.spacing(2)}
          justifyContent="space-between"
          flexWrap="wrap"
        >
          <Box flex={1} maxWidth="50%">
            <Bar />
          </Box>
          <Box flex={1} maxWidth="50%">
            <Pie />
          </Box>
        </Box>
      </Box>
    </PageContainer>
  );
};

export default AttendancePage;
