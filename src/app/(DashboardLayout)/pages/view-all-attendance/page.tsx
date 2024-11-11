"use client";

import React from "react";
import { Typography, Box, Card, Grid, Button } from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import theme from "@/utils/theme";
import Link from "next/link";
import AttendanceTable from "./recordTable";

const AllAttendance = () => {
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
          All Attendance Records
        </Typography>
        <Box>
          <AttendanceTable />
        </Box>
      </Box>
    </PageContainer>
  );
};

export default AllAttendance;
