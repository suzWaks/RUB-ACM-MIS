"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { SaveAlt as SaveAltIcon } from "@mui/icons-material";

// Define a type for attendance data
type AttendanceEntry = {
  id: number;
  name: string;
  department: string;
  studentId: string;
  semester: string;
  event: string;
  status: string;
};

const Attendance = () => {
  // States for dropdown values
  const [department, setDepartment] = useState("");
  const [event, setEvent] = useState("");
  const [date, setDate] = useState("");
  const [filteredData, setFilteredData] = useState<AttendanceEntry[]>([]); // Define the type of filteredData
  const [openViewDialog, setOpenViewDialog] = useState(false); // State for opening the View dialog

  // Dummy data for departments and events
  const subjects = ["Information Technology", "Electrical", "Civil", "Mechanical"];
  const sections = ["ICPC", "Guest Lecture", "Seminar", "Programming classes"];

  // Dummy data for attendance table
  const attendanceData: AttendanceEntry[] = [
    { id: 1, name: "Jigme Phuentsho", department: "Information Technology", studentId: "#2123123", semester: "6th", event: "ICPC", status: "Present" },
    { id: 2, name: "Suzal Wakhley", department: "Electrical", studentId: "#2123124", semester: "6th", event: "Guest Lecture", status: "Present" },
    { id: 3, name: "Tashi K Phuntsho", department: "Civil", studentId: "#2123125", semester: "6th", event: "Seminar", status: "Present" },
    { id: 4, name: "Pema Lhamo", department: "Mechanical", studentId: "#2123126", semester: "6th", event: "Programming classes", status: "Present" },
    { id: 5, name: "Depashna Pradhan", department: "Information Technology", studentId: "#2123127", semester: "6th", event: "ICPC", status: "Present" },
  ];

  const handleGenerateSheet = () => {
    // Filter data based on selected department and event
    const filtered = attendanceData.filter(
      (row) =>
        (department === "" || row.department === department) &&
        (event === "" || row.event === event)
    );

    // Only set filtered data if there is a selection
    if (department || event) {
      setFilteredData(filtered);
    } else {
      setFilteredData([]); // Clear data if no selection is made
    }
  };

  const handleViewSheet = () => {
    setOpenViewDialog(true); // Open the View dialog
  };

  
  // Function to handle the download of the attendance sheet
  const handleDownload = () => {
    // Convert filtered data to CSV format
    const csvContent = [
      ["#","Student Name", "Department", "Student ID", "Semester", "Event", "Status"],
      ...filteredData.map(row => [
        row.id,
        row.name,
        row.department,
        row.studentId,
        row.semester,
        row.event,
        row.status
      ])
    ]
      .map(row => row.join(","))
      .join("\n");

    // Create a Blob from the CSV data
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

    // Create a link element
    const link = document.createElement("a");

    // Set download attribute with a filename
    link.download = "attendance_sheet.csv";

    // Create a URL for the Blob and set it as the href
    link.href = URL.createObjectURL(blob);

    // Append the link to the document body
    document.body.appendChild(link);

    // Trigger a click event on the link to download the file
    link.click();

    // Clean up the link element
    document.body.removeChild(link);
  };
  
  const handleOpenViewDialog = () => setOpenViewDialog(true);
  const handleCloseViewDialog = () => {
    setOpenViewDialog(false); // Close the View dialog
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={5} gap={2}>
      {/* Form Fields */}
      <Box display="flex" alignItems="center" justifyContent="center" gap={2}>
        {/* Department Dropdown */}
        <Box>
          <Typography variant="caption">Department</Typography>
          <Select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            displayEmpty
            variant="outlined"
            fullWidth
            sx={{ mt: 1 }}
          >
            <MenuItem value="">
              <em>Select Department</em>
            </MenuItem>
            {subjects.map((subj) => (
              <MenuItem key={subj} value={subj}>
                {subj}
              </MenuItem>
            ))}
          </Select>
        </Box>

        {/* Event Dropdown */}
        <Box>
          <Typography variant="caption">Event</Typography>
          <Select
            value={event}
            onChange={(e) => setEvent(e.target.value)}
            displayEmpty
            variant="outlined"
            fullWidth
            sx={{ mt: 1 }}
          >
            <MenuItem value="">
              <em>Select Event</em>
            </MenuItem>
            {sections.map((sec) => (
              <MenuItem key={sec} value={sec}>
                {sec}
              </MenuItem>
            ))}
          </Select>
        </Box>

        {/* Date Field */}
        <Box>
          <Typography variant="caption">Date</Typography>
          <TextField
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            variant="outlined"
            fullWidth
            sx={{ mt: 1 }}
            InputLabelProps={{ shrink: true }}
          />
        </Box>

        {/* Generate Sheet Button */}
        <Button
          variant="contained"
          color="primary"
          sx={{ height: "fit-content", mt: 3 }}
          onClick={handleGenerateSheet}
        >
          Generate Sheet
        </Button>
      </Box>

      {/* Attendance Table */}
      {filteredData.length > 0 && (
        <Box>
          {/* View Sheet Button */}
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
            onClick={handleViewSheet}
          >
            View Sheet
          </Button>

          <TableContainer component={Paper} sx={{ mt: 3, maxWidth: 800 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Student Name</TableCell>
                  <TableCell>Department</TableCell>
                  <TableCell>Student ID</TableCell>
                  <TableCell>Semester</TableCell>
                  <TableCell>Event</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData.map((row, index) => (
                  <TableRow key={row.id}>
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.department}</TableCell>
                    <TableCell>{row.studentId}</TableCell>
                    <TableCell>{row.semester}</TableCell>
                    <TableCell>{row.event}</TableCell>
                    <TableCell>{row.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}

      {/* View Dialog */}
      <Dialog open={openViewDialog}  onClose={handleCloseViewDialog}  maxWidth="lg" fullWidth color="primary">
        <DialogTitle sx={{ color: "secondary.main" }}>Generated Attendance Sheet</DialogTitle>
        <DialogContent>
        <Box display="flex" justifyContent="flex-end">
        <Button
            variant="contained"
            color="primary"
            startIcon={<SaveAltIcon />}
            onClick={handleDownload}
          >
            Download Attendance Sheet
          </Button>
          </Box>
          {/* Display the filtered data in a larger view */}
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Student Name</TableCell>
                  <TableCell>Department</TableCell>
                  <TableCell>Student ID</TableCell>
                  <TableCell>Semester</TableCell>
                  <TableCell>Event</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.department}</TableCell>
                    <TableCell>{row.studentId}</TableCell>
                    <TableCell>{row.semester}</TableCell>
                    <TableCell>{row.event}</TableCell>
                    <TableCell>{row.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseViewDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Attendance;
