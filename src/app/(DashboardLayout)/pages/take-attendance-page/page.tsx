"use client";
import React, { useEffect, useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Box,
  InputAdornment,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TablePagination,
  IconButton,
} from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import Attendance from "./Attendance";
import Loading from "../../loading";

interface MemberStat {
  label: string;
  data: number[];
}

// Define the Member interface
interface Member {
  _id?: string;
  name: string;
  designation: string;
  std_id: string;
  department: string;
  email: string;
  year: string;
  contact_number: string;
  gender?: "Male" | "Female" | "Others";
}

const TakeAttendancePage = () => {
  return (
    <PageContainer
      title="Take attendance Page"
      description="allows the admin to take attendance"
    >
      <Attendance />
    </PageContainer>
  );
};

export default TakeAttendancePage;
