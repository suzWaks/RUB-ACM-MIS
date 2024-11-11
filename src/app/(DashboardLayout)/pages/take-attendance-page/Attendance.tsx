// Attendance.tsx
"use client";
import React, { useEffect, useState } from "react";
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
} from "@mui/material";
import theme from "@/utils/theme";

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

type Student = {
  id: number;
  name: string;
  studentId: string;
  department: string;
  year: string;
  status: boolean;
};

const Attendance = () => {
  // States for dropdown values
  const [department, setDepartment] = useState("");
  const [event, setEvent] = useState("");
  const [date, setDate] = useState("");
  const [year, setYear] = useState("");
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);

  const [eventData, setEventData] = useState<string[]>([]);

  //Functions to fetchdata
  const fetchEventData = async () => {
    try {
      const response = await fetch(
        "/api/attendance/generateAttendance/fetchEvent"
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      console.log("Result: ", result);
      setEventData(result);
    } catch (error) {
      console.error("Error fetching event data:", error);
    }
  };

  //Fetching datas
  useEffect(() => {
    const fetchData = async () => {
      await fetchEventData();
    };
    fetchData();
  }, []);

  useEffect(() => {
    console.log(filteredStudents);
  }, [filteredStudents]);

  // Dummy datas
  const departments = [
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
  ];

  const years = ["1", "2", "3", "4"];

  //Function to generate attendance record
  const createAttendanceRecord = async () => {
    setFilteredStudents([]);
    console.log("Filtered Student is: ", filteredStudents);
    console.log("dEPARTMENT IS: ", department);
    try {
      // Call API to generate new attendance record (adjust the API endpoint as per your requirement)
      const response = await fetch(
        "/api/attendance/generateAttendance/attendanceRecord",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            department,
            year,
            event,
            date, // Use the date in the API request body
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to generate attendance sheet");
      }

      // Assuming the response contains a list of students to display (adjust as needed)
      const result = await response.json();
      console.log("Attendance sheet generated: ", result);
      setFilteredStudents(result);
    } catch (error) {
      console.error("Error generating attendance sheet:", error);
    }
  };
  const handleGenerateSheet = () => {
    //First call api to create new attendance record using the filters provided.

    if (!department || !year || !date) {
      alert("Please Provide all Required Information");
      return; // Do not proceed if any of these values are missing
    }

    //This method creates a new attendance record in the database
    createAttendanceRecord();
  };

  const handleAttendanceUpdate = async () => {
    console.log(filteredStudents);
    if (filteredStudents.length === 0) {
      alert("No attendance data to update.");
      return;
    }

    // Prepare the data to send (you may want to modify this structure as needed)
    const updatedAttendanceData = filteredStudents.map((student) => ({
      memberId: student.id, // Assuming each student has a studentId
      status: student.status, // Assuming you are sending "Present" or "Absent"
      date: date,
    }));

    try {
      const response = await fetch("/api/attendance/updateAttendance", {
        method: "PATCH", // Using PATCH to update data
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ attendanceData: updatedAttendanceData }),
      });
      if (!response.ok) {
        throw new Error("Failed to update attendance data");
      }

      // Assuming the API response contains a success message or the updated data
      const result = await response.json();
      console.log("Attendance updated successfully: ", result);

      // Reset states after updating
      setFilteredStudents([]); // Clear filtered students
      setDepartment(""); // Reset department
      setYear(""); // Reset year
      setEvent(""); // Reset event
      setDate(""); // Reset date

      alert("Attendance has been recorded");
    } catch (error) {
      console.error("Error updating attendance:", error);
      alert("An error occurred while updating attendance. Please try again.");
    }
  };

  const toggleStatus = (id: number) => {
    setFilteredStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === id ? { ...student, status: !student.status } : student
      )
    );
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      mt={5}
      gap={2}
    >
      <Typography
        variant="h5"
        sx={{ color: theme.palette.primary.main, mb: 2 }}
      >
        Take Attendance
      </Typography>
      {/* Form Fields */}
      <Box display="flex" alignItems="center" justifyContent="center" gap={2}>
        {/* Department Dropdown */}
        <Box sx={{ width: 250 }}>
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
            {departments.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </Box>

        {/* Year Dropdown */}
        <Box>
          <Typography variant="caption">Year</Typography>
          <Select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            displayEmpty
            variant="outlined"
            fullWidth
            sx={{ mt: 1 }}
          >
            <MenuItem value="">
              <em>Select Year</em>
            </MenuItem>
            {years.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </Box>

        {/* Event Dropdown */}
        <Box sx={{ width: 250 }}>
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
              <em>Select Event (optional)</em>
            </MenuItem>
            {eventData.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
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
          sx={{ height: 53, mt: 3 }}
          onClick={handleGenerateSheet}
          disabled={!department || !year || !date} // Disable if department or year is not selected
        >
          Generate Sheet
        </Button>
      </Box>

      {/* Attendance Table */}
      {filteredStudents.length > 0 && (
        <TableContainer component={Paper} sx={{ mt: 3, maxWidth: 1000 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Student ID</TableCell>
                <TableCell>Student Name</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Year</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredStudents.map((student, index) => (
                <TableRow key={student.id}>
                  <TableCell>{student.studentId}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.department}</TableCell>
                  <TableCell>{student.year}</TableCell>
                  <TableCell>
                    <Checkbox
                      checked={student.status}
                      onChange={() => toggleStatus(student.id)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/**Button */}
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 3 }}
        onClick={handleAttendanceUpdate}
        disabled={!department || !year || !date} // Disable if department or year is not selected
      >
        Confirm
      </Button>
    </Box>
  );
};

export default Attendance;
