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
  InputAdornment,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";
import GroupIcon from "@mui/icons-material/Group"; // For total members icon
import SearchIcon from "@mui/icons-material/Search"; // Import Search icon
import FilterListIcon from "@mui/icons-material/FilterList"; // Import Filter icon
import RefreshIcon from "@mui/icons-material/Refresh"; // Use Refresh icon instead of Clear
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import StudentGraph from "@/app/(DashboardLayout)/pages/dashboard/GraphProp"; // Import for Graph component
import theme from "@/utils/theme"; 
import AddMemberForm from "./AddMemberForm"; 

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
    {
      name: "Jigme Phuntsho",
      studentNo: "02210200",
      department: "Information Technology",
      email: "jigme@gmail.com",
      year: "2022",
      gender: "Male",
    },
    {
      name: "Suzal Wakhley",
      studentNo: "02210233",
      department: "Geology",
      email: "suzal@gmail.com",
      year: "2022",
      gender: "Female",
    },
    {
      name: "Tashi Kuenga",
      studentNo: "02210228",
      department: "Civil",
      email: "tashi@gmail.com",
      year: "2022",
      gender: "Male",
    },
    {
      name: "Pema Lhamo",
      studentNo: "02210221",
      department: "Civil",
      email: "pema@gmail.com",
      year: "2022",
      gender: "Female",
    },
    {
      name: "Depashna",
      studentNo: "02210196",
      department: "Electrical",
      email: "depashna@gmail.com",
      year: "2022",
      gender: "Female",
    },
    { name: "Jigme Phuntsho", studentNo: "02210200", department: "Information Technology", email: "jigme@gmail.com", year: "4", gender: "Male" },
    { name: "Suzal Wakhley", studentNo: "02210233", department: "Geology", email: "suzal@gmail.com", year: "4", gender: "Female" },
    { name: "Tashi Kuenga", studentNo: "02210228", department: "Civil", email: "tashi@gmail.com", year: "4", gender: "Male" },
    { name: "Pema Lhamo", studentNo: "02210221", department: "Civil", email: "pema@gmail.com", year: "4", gender: "Female" },
    { name: "Depashna", studentNo: "02210196", department: "Electrical", email: "depashna@gmail.com", year: "4", gender: "Female" },
  ]);

  // State for the search input and filters
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState<string | "">("");
  const [selectedDepartment, setSelectedDepartment] = useState<string | "">("");
  
  // State for managing the Add Member form dialog
  const [open, setOpen] = useState(false);

  // Filtered members based on search term, year, and department
  const filteredMembers = members.filter(member => 
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedYear ? member.year === selectedYear : true) &&
    (selectedDepartment ? member.department === selectedDepartment : true)
  );

  // Available years and departments (customize as needed)
  const years = ["1", "2", "3", "4"];
  const departments = ["Information Technology", "Geology", "Civil", "Electrical"];

  // Calculations for member statistics
  const totalMembers = members.length;
  const maleMembers = members.filter(
    (member) => member.gender === "Male"
  ).length;
  const femaleMembers = members.filter(
    (member) => member.gender === "Female"
  ).length;
  const othersMembers = members.filter(
    (member) => member.gender === "Others"
  ).length;

  // Data for graphs (you can modify the data structure as needed)
  const statistics = [
    { label: "Male Members", data: [10, 15, 20, maleMembers] }, // Example data
    { label: "Female Members", data: [12, 13, 14, femaleMembers] }, // Example data
    { label: "Others", data: [5, 7, 3, othersMembers] }, // Example data
    { label: "Total Members", data: [totalMembers, 100, 110, 120] }, // Example data
  ];

  const graphColors = [
    theme.palette.primary.main,
    theme.palette.primary_blue.main,
    theme.palette.secondary_blue.main,
    theme.palette.secondary_teal.main,
  ];

  // Reset filters function
  const handleResetFilters = () => {
    setSelectedYear("");
    setSelectedDepartment("");
    setSearchTerm("");
  };

  // Function to add a new member
  const handleAddMember = (newMember: Member) => {
    setMembers((prevMembers) => [...prevMembers, newMember]);
    setOpen(false); // Close the dialog after adding the member
  };

  return (
    <PageContainer
      title="Members Page"
      description="Members statistics and list overview"
    >
      {/* Member Statistics Section */}

      <Box mb={2}>
      <Box mb={4}>
        <Paper elevation={2} sx={{ padding: 2 }}>
          <Typography
            variant="h5"
            sx={{ color: theme.palette.primary.main, mb: 2 }}
          >
            Member Statistics
          </Typography>
          <Grid container spacing={1} mt={2}>
            {[
              {
                label: "Male Count",
                data: [20, 30, 40, 50, 40],
                icon: <MaleIcon />,
              },
              {
                label: "Female Count",
                data: [40, 50, 55, 60, 20],
                icon: <FemaleIcon />,
              },
              {
                label: "Others",
                data: [3, 4, 5, 6, 33],
                icon: <TransgenderIcon />,
              },
              {
                label: "Total Members",
                data: [50, 70, 80, 90, 105],
                icon: <GroupIcon />,
              },
            {[ 
              { label: "Male Count", data: [20, 30, 40, 50, 40], icon: <MaleIcon /> },
              { label: "Female Count", data: [40, 50, 55, 60, 20], icon: <FemaleIcon /> },
              { label: "Others", data: [3, 4, 5, 6, 33], icon: <TransgenderIcon /> },
              { label: "Total Members", data: [50, 70, 80, 90, 105], icon: <GroupIcon /> },
            ].map((stat, index) => (
              <Grid item xs={6} md={3} key={index}>
                <Paper elevation={2} sx={{ padding: 0 }}>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    padding={1}
                  >
                    <Typography variant="h6">
                      {stat.label}:{" "}
                      {stat.data.reduce((acc, curr) => acc + curr, 0)}
                    </Typography>
                    {stat.icon}
                  </Box>
                  <StudentGraph data={stat.data} color={""} />
                  <StudentGraph data={stat.data} color={graphColors[index]} />
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Box>

      {/* Members List Section */}
      <Box mb={2}>
        <Typography
          variant="h5"
          sx={{ color: theme.palette.primary.main, mb: 2 }}
        >
          Members
        </Typography>

        {/* Search bar and filters for year and department */}
        <Box display="flex" justifyContent="space-between" mb={2} alignItems="center">
          {/* Filters Section */}
          <Box display="flex" alignItems="center">
            <Select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              displayEmpty
              variant="outlined"
              size="small"
              sx={{ mr: 2 }}
              startAdornment={
                <InputAdornment position="start">
                  <FilterListIcon /> {/* Add filter icon here */}
                </InputAdornment>
              }
            >
              <MenuItem value="">
                <em>Year</em>
              </MenuItem>
              {years.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
            <Select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              displayEmpty
              variant="outlined"
              size="small"
              sx={{ mr: 2 }}
              startAdornment={
                <InputAdornment position="start">
                  <FilterListIcon /> {/* Add filter icon here */}
                </InputAdornment>
              }
            >
              <MenuItem value="">
                <em>Department</em>
              </MenuItem>
              {departments.map((department) => (
                <MenuItem key={department} value={department}>
                  {department}
                </MenuItem>
              ))}
            </Select>
            <Button
              variant="outlined" 
              sx={{ color: "red", borderColor: "red"}} // Set the text color to red
              startIcon={<RefreshIcon />}
              onClick={handleResetFilters}
            >
              Reset Filter
            </Button>
          </Box>

          {/* Search Bar */}
          <TextField
            variant="outlined"
            placeholder="Search Members"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          
          {/* Add Member Button */}
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => setOpen(true)} // Open the Add Member form dialog
          >
            Add New Member
          </Button>
        </Box>

        {/* Members Table */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Student No</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Year</TableCell>
                <TableCell>Gender</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredMembers.map((member, index) => (
                <TableRow key={index}>
                  <TableCell>{member.name}</TableCell>
                  <TableCell>{member.studentNo}</TableCell>
                  <TableCell>{member.department}</TableCell>
                  <TableCell>{member.email}</TableCell>
                  <TableCell>{member.year}</TableCell>
                  <TableCell>{member.gender}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Dialog for adding new member */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add New Member</DialogTitle>
        <DialogContent>
          <AddMemberForm onAddMember={handleAddMember} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </PageContainer>
  );
};

export default MembersPage;
