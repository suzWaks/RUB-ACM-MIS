"use client";

import React, { useState } from "react";
import {
    Box,
    Card,
    CardContent,
    Typography,
    TextField,
    Button,
    IconButton,
    Grid,
    InputAdornment,
} from "@mui/material";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CloseIcon from "@mui/icons-material/Close";
import ImageIcon from "@mui/icons-material/Image";
import EventIcon from "@mui/icons-material/Event";
import PeopleIcon from "@mui/icons-material/People";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DescriptionIcon from "@mui/icons-material/Description";
import dayjs, { Dayjs } from "dayjs";


interface EventFormProps {
    onClose: () => void;
}

const EventForm: React.FC<EventFormProps> = ({ onClose }) => {
    const [startDate, setStartDate] = useState<Dayjs | null>(null);
    const [startTime, setStartTime] = useState<Dayjs | null>(null);
    const [endDate, setEndDate] = useState<Dayjs | null>(null);
    const [endTime, setEndTime] = useState<Dayjs | null>(null);

    return (
        <Box
            sx={{
                position: "fixed", // Makes it a pop-up
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black background
                backdropFilter: "blur(10px)", // Adds a blur effect to the background
                zIndex: 9999, // Ensures the pop-up is on top
            }}
        >
            <Card
                sx={{
                    width: "70%",
                    height: "80%", // Set a height to enable scrolling
                    position: "relative",
                    boxShadow: "0px 0px 12px rgba(0, 0, 0, 0.2)",
                    borderRadius: "10px",
                    backgroundColor: "white", // Ensures the form has a clean white background
                    marginLeft: '15%', // Adjust this value to shift towards the right
                    overflow: "hidden", // Prevent overflow of the Card itself
                }}
            >
                <CardContent
                    sx={{
                        overflowY: "auto", // Enables vertical scrolling
                        maxHeight: "100%", // Makes sure it doesn’t exceed the Card height
                    }}
                >
                    <IconButton
                        aria-label="close"
                        onClick={onClose}
                        sx={{ position: "absolute", top: 10, right: 10 }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h4" color="purple" fontWeight="bold" gutterBottom>
                        Schedule Events
                    </Typography>

                    <Grid container spacing={2}>
                        {/* Event Name Input */}
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Add Name"
                                sx={{ mt: 2 }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <EventIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>

                        {/* Required Attendees Input */}
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Add Required Attendees"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <PeopleIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>

                        {/* Location Input */}
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Add Location"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LocationOnIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>

                        {/* Date and Time Pickers */}
                        <Grid item xs={6}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="Start Date"
                                    value={startDate}
                                    onChange={(newValue) => setStartDate(newValue)}
                                    slotProps={{
                                        textField: {
                                            fullWidth: true,
                                        },
                                    }}
                                />
                            </LocalizationProvider>
                        </Grid>

                        <Grid item xs={6}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <TimePicker
                                    label="Start Time"
                                    value={startTime}
                                    onChange={(newValue) => setStartTime(newValue)}
                                    slotProps={{
                                        textField: {
                                            fullWidth: true,
                                            variant: "outlined",
                                        },
                                    }}
                                />
                            </LocalizationProvider>
                        </Grid>

                        <Grid item xs={6}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="End Date"
                                    value={endDate}
                                    onChange={(newValue) => setEndDate(newValue)}
                                    slotProps={{
                                        textField: {
                                            fullWidth: true,
                                        },
                                    }}
                                />
                            </LocalizationProvider>
                        </Grid>

                        <Grid item xs={6}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <TimePicker
                                    label="End Time"
                                    value={endTime}
                                    onChange={(newValue) => setEndTime(newValue)}
                                    slotProps={{
                                        textField: {
                                            fullWidth: true,
                                        },
                                    }}
                                />
                            </LocalizationProvider>
                        </Grid>

                        {/* Description Input */}
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Add Description"
                                multiline
                                rows={4}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <DescriptionIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>

                        {/* Add Image Section */}
                        <Grid item xs={6}>
                            <Box
                                sx={{
                                    border: "1px dashed grey",
                                    height: 120,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <ImageIcon />
                                <Typography>Add Image</Typography>
                            </Box>
                        </Grid>

                        {/* People to Invite Input */}
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Add People to Invite"
                                multiline
                                rows={4}
                            />
                        </Grid>
                    </Grid>

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end", // Aligns the button to the right
                            width: "100%", // Make sure the container takes full width
                            mt: 2,
                        }}
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{
                                backgroundColor: "#16A1B8",
                                "&:hover": { backgroundColor: "#138f9b" },
                                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
                                borderRadius: "15px",
                                padding: "12px 24px", // Increase padding for a bigger button
                                fontSize: "1rem", // Increase font size
                                minWidth: "150px", // Increase minimum width
                            }}
                        >
                            Schedule Event
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default EventForm;