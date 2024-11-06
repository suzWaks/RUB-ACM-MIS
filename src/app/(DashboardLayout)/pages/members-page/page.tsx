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
  TablePagination,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";
import GroupIcon from "@mui/icons-material/Group";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import RefreshIcon from "@mui/icons-material/Refresh";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import StudentGraph from "@/app/(DashboardLayout)/pages/dashboard/GraphProp";
import theme from "@/utils/theme"; 
import AddMemberForm from "./AddMemberForm"; 
import Bulkupload from "./Bulkupload";
import Attendance from "./Attendance"; // Import the Attendance component

// Define the Member interface
interface Member {
  name: string;
  studentNo: string;
  department: string;
  email: string;
  year: string;
  gender?: "Male" | "Female" | "Others";
}

const MembersPage = () => {
  // State to manage members data
  const [members, setMembers] = useState<Member[]>([
    { name: "Jigme Phuntsho", studentNo: "02210200", department: "Information Technology", email: "jigme@gmail.com", year: "4", gender: "Male" },
    { name: "Suzal Wakhley", studentNo: "02210233", department: "Geology", email: "suzal@gmail.com", year: "4", gender: "Female" },
    { name: "Tashi Kuenga", studentNo: "02210228", department: "Civil", email: "tashi@gmail.com", year: "4", gender: "Male" },
    { name: "Pema Lhamo", studentNo: "02210221", department: "Civil", email: "pema@gmail.com", year: "4", gender: "Female" },
    { name: "Depashna", studentNo: "02210196", department: "Electrical", email: "depashna@gmail.com", year: "4", gender: "Female" },
    { name: "John Doe", studentNo: "02210234", department: "Mechanical", email: "john@gmail.com", year: "3", gender: "Male" },
    { name: "Jane Smith", studentNo: "02210235", department: "Geology", email: "jane@gmail.com", year: "2", gender: "Female" },
    { name: "Bob Lee", studentNo: "02210236", department: "Electrical", email: "bob@gmail.com", year: "1", gender: "Others" },
    { name: "Alice Brown", studentNo: "02210237", department: "Civil", email: "alice@gmail.com", year: "1", gender: "Female" },
    { name: "Charlie Johnson", studentNo: "02210238", department: "Civil", email: "charlie@gmail.com", year: "2", gender: "Male" },
  ]);

  // State for the search input and filters
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState<string | "">("");
  const [selectedDepartment, setSelectedDepartment] = useState<string | "">("");

  // State for managing the Add Member form dialog
  const [open, setOpen] = useState(false);

  // State for managing the Bulk Upload dialog
  const [openBulkUpload, setOpenBulkUpload] = useState(false);

  // State for pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // State to toggle between members list and attendance page
  const [showAttendance, setShowAttendance] = useState(false);

  // Filtered members based on search term, year, and department
  const filteredMembers = members.filter(member => 
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedYear ? member.year === selectedYear : true) &&
    (selectedDepartment ? member.department === selectedDepartment : true)
  );

  // Reset filters function
  const handleResetFilters = () => {
    setSelectedYear("");
    setSelectedDepartment("");
    setSearchTerm("");
  };

  // Function to add a new member
  const handleAddMember = (newMember: Member) => {
    setMembers((prevMembers) => [...prevMembers, newMember]);
    setOpen(false);
  };

  // Handle pagination change
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  return (
    <PageContainer title="Members Page" description="Members statistics and list overview">
      {!showAttendance ? (
        <>
          {/* Member Statistics Section */}
          <Box mb={4}>
            <Paper elevation={2} sx={{ padding: 2 }}>
              <Typography
                variant="h5"
                sx={{ color: theme.palette.primary.main, mb: 2 }}
              >
                Member Statistics
              </Typography>
              {/* Statistic cards with graphs */}
              <Grid container spacing={1} mt={2}>
                {/* Male, Female, Others, Total counts */}
                {[ 
                  { label: "Male Count", data: [20, 30, 40, 50], icon: <MaleIcon /> },
                  { label: "Female Count", data: [40, 50, 55, 60], icon: <FemaleIcon /> },
                  { label: "Others", data: [3, 4, 5, 6], icon: <TransgenderIcon /> },
                  { label: "Total Members", data: [50, 70, 80, 90], icon: <GroupIcon /> },
                ].map((stat, index) => (
                  <Grid item xs={6} md={3} key={index}>
                    <Paper elevation={2} sx={{ padding: 0 }}>
                      <Box display="flex" justifyContent="space-between" alignItems="center" padding={1}>
                        <Typography variant="h6">
                          {stat.label}
                        </Typography>
                        {stat.icon}
                      </Box>
                      <StudentGraph data={stat.data} color={theme.palette.primary.main} />
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
                  startAdornment={<InputAdornment position="start"><FilterListIcon /></InputAdornment>}
                >
                  <MenuItem value=""><em>Year</em></MenuItem>
                  {["1", "2", "3", "4"].map((year) => (
                    <MenuItem key={year} value={year}>{year}</MenuItem>
                  ))}
                </Select>

                <Select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  displayEmpty
                  variant="outlined"
                  size="small"
                  sx={{ mr: 2 }}
                  startAdornment={<InputAdornment position="start"><FilterListIcon /></InputAdornment>}
                >
                  <MenuItem value=""><em>Department</em></MenuItem>
                  {["Information Technology", "Geology", "Civil", "Electrical", "Mechanical"].map((dept) => (
                    <MenuItem key={dept} value={dept}>{dept}</MenuItem>
                  ))}
                </Select>

                <TextField
                  placeholder="Search by name"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  variant="outlined"
                  size="small"
                  sx={{ mr: 2 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleResetFilters}
                  startIcon={<RefreshIcon />}
                >
                  Reset Filters
                </Button>
              </Box>

              {/* Action buttons for adding member and bulk upload */}
              <Box>
                <Button
                   variant="contained"
                   color="primary"
                   sx={{ mr: 1 }}
                   onClick={() => setOpenBulkUpload(true)}
                 >
                   Bulk Upload
                </Button>
                <Button
                 variant="contained"
                 color="primary"
                 sx={{ mr: 1 }}
                 startIcon={<AddIcon />}
                 onClick={() => setOpen(true)}
               >
                 Add Member
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setShowAttendance(true)} // Switch to Attendance page
                >
                  Attendance
                </Button>
              </Box>
            </Box>

            {/* Members Table */}
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Student Number</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Department</TableCell>
                    <TableCell>Year</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Gender</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredMembers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((member) => (
                    <TableRow key={member.studentNo}>
                      <TableCell>{member.studentNo}</TableCell>
                      <TableCell>{member.name}</TableCell>
                      <TableCell>{member.department}</TableCell>
                      <TableCell>{member.year}</TableCell>
                      <TableCell>{member.email}</TableCell>
                      <TableCell>{member.gender}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              rowsPerPageOptions={[]}
              component="div"
              count={filteredMembers.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              sx={{ justifyContent: "flex-end" }} // Align pagination to the right
          
            />
          </Box>

          {/* Add Member Dialog */}
          <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>Add Member</DialogTitle>
            <DialogContent>
              <AddMemberForm onAddMember={handleAddMember} onClose={() => setOpen(false)} />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpen(false)} color="primary">Close</Button>
            </DialogActions>
          </Dialog>

          {/* Bulk Upload Dialog */}
          <Dialog open={openBulkUpload} onClose={() => setOpenBulkUpload(false)}>
            <DialogTitle>Bulk Upload Members</DialogTitle>
            <DialogContent>
              <Bulkupload />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenBulkUpload(false)} color="primary">Close</Button>
            </DialogActions>
          </Dialog>
        </>
      ) : (
        // Render the Attendance component if showAttendance is true
        <Attendance />
      )}
    </PageContainer>
  );
};

export default MembersPage;
