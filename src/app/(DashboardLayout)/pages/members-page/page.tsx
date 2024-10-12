"use client";
import React, { useState } from "react";
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
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";
import GroupIcon from "@mui/icons-material/Group"; // For total members icon
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import StudentGraph from "@/app/(DashboardLayout)/pages/dashboard/GraphProp"; // Import for Graph component
import theme from "@/utils/theme"; // Assuming you have your theme here

// Define the Member interface
interface Member {
  name: string;
  studentNo: string;
  department: string;
  email: string;
  year: string;
  gender?: "Male" | "Female" | "Others"; // Optional field for gender
}

const MembersPage = () => {
  // State to manage members data
  const [members, setMembers] = useState<Member[]>([
    { name: "Jigme Phuntsho", studentNo: "02210200", department: "Information Technology", email: "jigme@gmail.com", year: "2022", gender: "Male" },
    { name: "Suzal Wakhley", studentNo: "02210233", department: "Geology", email: "suzal@gmail.com", year: "2022", gender: "Female" },
    { name: "Tashi Kuenga", studentNo: "02210228", department: "Civil", email: "tashi@gmail.com", year: "2022", gender: "Male" },
    { name: "Pema Lhamo", studentNo: "02210221", department: "Civil", email: "pema@gmail.com", year: "2022", gender: "Female" },
    { name: "Depashna", studentNo: "02210196", department: "Electrical", email: "depashna@gmail.com", year: "2022", gender: "Female" },
  ]);

  // Calculations for member statistics
  const totalMembers = members.length;
  const maleMembers = members.filter((member) => member.gender === "Male").length;
  const femaleMembers = members.filter((member) => member.gender === "Female").length;
  const othersMembers = members.filter((member) => member.gender === "Others").length;

  // Data for graphs (you can modify the data structure as needed)
  const statistics = [
    { label: "Male Members", data: [10, 15, 20, maleMembers] }, // Example data
    { label: "Female Members", data: [12, 13, 14, femaleMembers] }, // Example data
    { label: "Others", data: [5, 7, 3, othersMembers] }, // Example data
    { label: "Total Members", data: [totalMembers, 100, 110, 120] }, // Example data
  ];

  return (
    <PageContainer title="Members Page" description="Members statistics and list overview">
      {/* Member Statistics Section */}
    
      <Box mb={2}>
        <Paper elevation={2} sx={{ padding: 2 }}>
          <Typography
            variant="h5"
            sx={{ color: theme.palette.primary.main, mb: 2 }}
          >
            Member Statistics
          </Typography>
          <Grid container spacing={1} mt={2}>
            {[
              { label: "Male Count", data: [20, 30, 40, 50, 40], icon: <MaleIcon /> },
              { label: "Female Count", data: [40, 50, 55, 60, 20], icon: <FemaleIcon /> },
              { label: "Others", data: [3, 4, 5, 6, 33], icon: <TransgenderIcon /> },
              { label: "Total Members", data: [50, 70, 80, 90, 105], icon: <GroupIcon /> },
            ].map((stat, index) => (
              <Grid item xs={6} md={3} key={index}>
                <Paper elevation={2} sx={{ padding: 0 }}>
                  <Box display="flex" justifyContent="space-between" alignItems="center" padding={1}>
                    <Typography variant="h6">
                      {stat.label}: {stat.data.reduce((acc, curr) => acc + curr, 0)}
                    </Typography>
                    {stat.icon}
                  </Box>
                  <StudentGraph data={stat.data} />
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Box>

      {/* Members List Section */}
      <DashboardCard title="Members List">
        <Box>
          {/* Search input */}
          <TextField
            variant="outlined"
            placeholder="Search"
            sx={{ mb: 2, width: "100%" }}
          />

          {/* Button to add new members */}
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            sx={{ mb: 2 }}
          >
            Add new member
          </Button>

          {/* Table of Members */}
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Student No</TableCell>
                  <TableCell>Department</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Year</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {members.map((member, index) => (
                  <TableRow key={index}>
                    <TableCell>{member.name}</TableCell>
                    <TableCell>{member.studentNo}</TableCell>
                    <TableCell>{member.department}</TableCell>
                    <TableCell>{member.email}</TableCell>
                    <TableCell>{member.year}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </DashboardCard>
    </PageContainer>
  );
};

export default MembersPage;
