"use client";
import React, { useState } from "react";
import theme from "@/utils/theme";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

interface EditFormProps {
  onClose: () => void;
  onSubmit: (attendanceRecord: any) => void;
  initialData?: {
    id: number;
    stdID: string;
    name: string;
    status: string;
    date: string;
    event_name: string;
  } | null;
}
const EditForm: React.FC<EditFormProps> = ({
  onClose,
  onSubmit,
  initialData,
}) => {
  const [date, setDate] = useState(initialData?.date);
  const [event, setEvent] = useState(initialData?.event_name);
  const [status, setStaus] = useState(initialData?.status);

  const handleSubmit = async (e: React.FormEvent) => {
    if (!date || !status) {
      alert("Please fill out all required fields.");
      return;
    }
    const id = initialData?.id;
    const dataToEdit = {
      date: date,
      status: status,
    };

    try {
      const response = await fetch(`/api/attendance/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToEdit),
      });
      if (!response.ok) {
        throw new Error("Failed to submit transaction data");
      }

      const responseData = await response.json();
      console.log("Attendance edited successfully:", responseData);
      onSubmit(responseData);
      onClose();
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to edit data. Please try again.");
    }
  };
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        backdropFilter: "blur(10px)",
        zIndex: 9999,
      }}
    >
      <Card
        sx={{
          width: "60%",
          maxHeight: "70%",
          position: "relative",
          boxShadow: "0px 0px 12px rgba(0, 0, 0, 0.2)",
          borderRadius: "15px",
          backgroundColor: "white",
          overflow: "hidden",
        }}
      >
        <CardContent>
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{ position: "absolute", top: 10, right: 10 }}
          >
            <CloseIcon />
          </IconButton>
          <Typography
            variant="h5"
            fontWeight="bold"
            gutterBottom
            sx={{ color: theme.palette.primary.main }}
          >
            Edit Attendance
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="outlined"
                label="Date"
                type="date"
                value={date}
                onChange={(e) => {}}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      {/* <AttachMoneyIcon /> */}
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Select
                fullWidth
                value={status}
                label="Status"
                onChange={(e) => {
                  setStaus(e.target.value);
                }}
                displayEmpty
                required
                startAdornment={
                  <InputAdornment position="start">
                    {/* <ShopIcon /> */}
                  </InputAdornment>
                }
              >
                <MenuItem value="" disabled>
                  Select Status
                </MenuItem>
                <MenuItem value="Present">Present</MenuItem>
                <MenuItem value="Absent">Absent</MenuItem>
              </Select>
            </Grid>
          </Grid>

          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              sx={{
                backgroundColor: theme.palette.primary.main,
                "&:hover": { backgroundColor: theme.palette.primary.dark },
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
                borderRadius: "15px",
                padding: "10px 20px",
                fontSize: "1rem",
              }}
            >
              Edit Attendance
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default EditForm;
