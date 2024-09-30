// EventForm.tsx

"use client";
import React from "react";
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

const EventForm: React.FC = () => {
    const [startDate, setStartDate] = React.useState<Dayjs | null>(null);
    const [startTime, setStartTime] = React.useState<Dayjs | null>(null);
    const [endDate, setEndDate] = React.useState<Dayjs | null>(null);
    const [endTime, setEndTime] = React.useState<Dayjs | null>(null);

    return (
        <Card sx={{ width: "80%", margin: "0 auto", mt: 5, position: "relative" }}>
            <CardContent>
                {/* Close Button */}
                <IconButton
                    aria-label="close"
                    sx={{ position: "absolute", top: 10, right: 10 }}
                >
                    <CloseIcon />
                </IconButton>

                <Typography variant="h5" color="purple" fontWeight="bold" gutterBottom>
                    Schedule Events
                </Typography>

                <Grid container spacing={2}>
                    {/* Event Name Input */}
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Add Name"
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

                {/* Schedule Event Button */}
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{
                        mt: 2,
                        backgroundColor: "#16A1B8",
                        "&:hover": { backgroundColor: "#138f9b" },
                    }}
                >
                    Schedule Event
                </Button>
            </CardContent>
        </Card>
    );
};

export default EventForm;
