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
import AddIcon from "@mui/icons-material/Add";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";
import GroupIcon from "@mui/icons-material/Group";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import RefreshIcon from "@mui/icons-material/Refresh";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import StudentGraph from "@/app/(DashboardLayout)/pages/dashboard/GraphProp";
import theme from "@/utils/theme";
import AddMemberForm from "./AddMemberForm";
import Bulkupload from "./Bulkupload"; // Import the Attendance component
import Loading from "../../loading";

interface MemberStat {
  label: string;
  data: number[];
}

// Define the Member interface here
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

const MembersPage = () => {
  const graphColors = [
    theme.palette.primary.main,
    theme.palette.primary_blue.main,
    theme.palette.secondary_blue.main,
    theme.palette.secondary_teal.main,
  ];

  //For fetching data
  const [memberStats, setMemberStats] = useState<MemberStat[] | null>(null);

  // State to manage members data
  const [members, setMembers] = useState<Member[]>([]);
  const [errorType, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [editMember, setEditMember] = useState<Member | undefined>(undefined);

  const [refreshTable, setRefreshTable] = useState(false);
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
  const filteredMembers = members.filter(
    (member) =>
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

  // Handle pagination change
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  //Methods for fecthing data
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
      console.log(error);
    }
  };

  const fetchAllMember = async () => {
    try {
      const response = await fetch("/api/members/fetchall");

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      setMembers(result);
    } catch (error) {
      setError("Some Error Occured");
      console.log(error);
    }
  };

  // Function to add a new member
  const handleAddMember = (newMember: Member) => {
    setMembers((prevMembers) => [...prevMembers, newMember]);
    setOpen(false);
  };

  const handleCloseDialog = () => {
    setEditMember(undefined); // Reset the member state when closing
    setOpen(false); // Close the dialog
  };

  //For handling Edit and Delete
  const handleEditMember = (member: Member) => {
    // Logic to handle editing the member (e.g., open a dialog or navigate to the edit page)
    //console.log("Editing member:", member);
    setEditMember(member); // Set the selected member to edit
    setOpen(true); // Open the edit dialog
  };

  // Triggered when the form submission is complete
  const handleRefresh = () => {
    setRefreshTable((prev) => !prev); // Toggle state to trigger useEffect
  };

  const handleDeleteMember = async (member: Member) => {
    // Logic to handle deleting the member (e.g., make an API call to delete)
    console.log("Deleting member with Student Number:", member);
    const id = member._id;
    const url = `/api/members/${id}`;
    try {
      const response = await fetch(url, { method: "DELETE" });

      if (!response.ok) {
        throw new Error("Failed to Delete Member");
      } else {
      }
      const result = await response.json();
      console.log(result);
      handleRefresh();
    } catch (error) {
      setError("Some Error Occured");
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchMemberStats();
      await fetchAllMember();
      setLoading(false);
    };
    fetchData();
  }, [refreshTable]);

  if (loading) {
    return (
      <>
        <Loading />
      </>
    );
  }
  return (
    <PageContainer
      title="Members Page"
      description="Members statistics and list overview"
    >
      {!showAttendance ? (
        <>
          {/* Member Statistics Section */}
          {/**
           *
           */}
          <Box mb={4}>
            <Paper elevation={2} sx={{ padding: 2 }}>
              <Typography
                variant="h5"
                sx={{ color: theme.palette.primary.main, mb: 2 }}
              >
                Member Statistics
              </Typography>

              {/**Member Stats Graph */}
              <Grid container spacing={1} mt={2}>
                {/* Dynamically rendering Male, Female, Others, Total counts from memberStats */}
                {memberStats?.map((stat, index) => {
                  // Icons are mapped based on the label
                  let icon;
                  switch (stat.label) {
                    case "Male Count":
                      icon = <MaleIcon />;
                      break;
                    case "Female Count":
                      icon = <FemaleIcon />;
                      break;
                    case "Others":
                      icon = <TransgenderIcon />;
                      break;
                    case "Total Members":
                      icon = <GroupIcon />;
                      break;
                    default:
                      icon = <GroupIcon />;
                  }

                  return (
                    <Grid item xs={6} md={3} key={index}>
                      <Paper elevation={2} sx={{ padding: 0 }}>
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          alignItems="center"
                          padding={1}
                        >
                          <Typography variant="h6">{stat.label}</Typography>
                          {icon}
                        </Box>
                        <StudentGraph
                          data={stat.data}
                          color={graphColors[index]}
                        />
                      </Paper>
                    </Grid>
                  );
                })}
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
            <Box
              display="flex"
              justifyContent="space-between"
              mb={2}
              alignItems="center"
            >
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
                      <FilterListIcon />
                    </InputAdornment>
                  }
                >
                  <MenuItem value="">
                    <em>Year</em>
                  </MenuItem>
                  {["1", "2", "3", "4"].map((year) => (
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
                      <FilterListIcon />
                    </InputAdornment>
                  }
                >
                  <MenuItem value="">
                    <em>Department</em>
                  </MenuItem>
                  {[
                    "Information Technology",
                    "Geology",
                    "Civil",
                    "Electrical",
                    "Electronic and Communication",
                    "Water",
                    "Mechanical",
                    "Instrumentation and Control",
                    "Architecture",
                    "Software",
                  ].map((dept) => (
                    <MenuItem key={dept} value={dept}>
                      {dept}
                    </MenuItem>
                  ))}
                </Select>

                <TextField
                  label="Search by Name"
                  variant="outlined"
                  size="small"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
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
                  variant="contained"
                  color="primary"
                  startIcon={<RefreshIcon />}
                  onClick={handleResetFilters}
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

            {/* Table displaying the list of members */}
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Student ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Gender</TableCell>
                    <TableCell>Desgination</TableCell>
                    <TableCell>Department</TableCell>
                    <TableCell>Year</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Contact Number</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredMembers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((member) => (
                      <TableRow key={member._id}>
                        <TableCell>{member.std_id}</TableCell>
                        <TableCell>{member.name}</TableCell>
                        <TableCell>{member.gender}</TableCell>
                        <TableCell>{member.designation}</TableCell>
                        <TableCell>{member.department}</TableCell>
                        <TableCell>{member.year}</TableCell>
                        <TableCell>{member.email}</TableCell>
                        <TableCell>{member.contact_number}</TableCell>
                        <TableCell>
                          {/* Action buttons */}
                          <IconButton
                            color="primary"
                            onClick={() => handleEditMember(member)} // Handle edit action
                            sx={{ mr: 1 }}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            color="error"
                            onClick={() => handleDeleteMember(member)} // Handle delete action
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Pagination */}
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

          {/* Add Member Form Dialog */}
          <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>Add New Member</DialogTitle>
            <DialogContent>
              <AddMemberForm
                onAddMember={handleAddMember}
                onClose={handleCloseDialog}
                member={editMember}
                onEditMember={handleRefresh}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpen(false)} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>

          {/* Bulk Upload Dialog */}
          <Dialog
            open={openBulkUpload}
            onClose={() => setOpenBulkUpload(false)}
          >
            <DialogTitle>Bulk Upload Members</DialogTitle>
            <DialogContent>
              <Bulkupload
                onClose={() => setOpenBulkUpload(false)}
                handleRefresh={handleRefresh}
                onUploadComplete={handleRefresh}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenBulkUpload(false)} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </>
      ) : (
        //<Attendance />
        <></>
      )}
    </PageContainer>
  );
};

export default MembersPage;
