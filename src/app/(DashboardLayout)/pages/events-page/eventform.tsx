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
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Chip,
    Checkbox,
    ListItemText,
    OutlinedInput,
} from "@mui/material";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CloseIcon from "@mui/icons-material/Close";
import ImageIcon from "@mui/icons-material/Image";
import EventIcon from "@mui/icons-material/Event";
import PeopleIcon from '@mui/icons-material/People';
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DescriptionIcon from "@mui/icons-material/Description";
import dayjs, { Dayjs } from "dayjs";
import { SelectChangeEvent } from "@mui/material";

interface EventFormProps {
    onClose: () => void;
    onSubmit: (eventData: any) => void;
}

const attendeesOptions = ["First Year", "Second Year", "Third Year", "Fourth Year"];

const EventForm: React.FC<EventFormProps> = ({ onClose, onSubmit }) => {
    const [eventName, setEventName] = useState("");
    const [attendees, setAttendees] = useState<string[]>([]);
    const [location, setLocation] = useState("");
    const [startDate, setStartDate] = useState<Dayjs | null>(null);
    const [startTime, setStartTime] = useState<Dayjs | null>(null);
    const [description, setDescription] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const eventData = {
            name: eventName,
            attendees,
            venue: location,
            startDate: startDate ? dayjs(startDate).format("MM/DD/YYYY") : "",
            startTime: startTime ? dayjs(startTime).format("HH:mm") : "",
            description,
            status: "Scheduled",
        };

        console.log("Submitting event data:", eventData);
        onSubmit(eventData);
        onClose();
    };

    const handleAttendeeChange = (event: SelectChangeEvent<string[]>) => {
        const {
            target: { value },
        } = event;
        setAttendees(typeof value === 'string' ? value.split(',') : value);
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
                    width: "70%",
                    height: "80%",
                    position: "relative",
                    boxShadow: "0px 0px 12px rgba(0, 0, 0, 0.2)",
                    borderRadius: "10px",
                    backgroundColor: "white",
                    marginLeft: '15%',
                    overflow: "hidden",
                }}
            >
                <CardContent
                    sx={{
                        overflowY: "auto",
                        maxHeight: "100%",
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
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Add Name"
                                value={eventName}
                                onChange={(e) => setEventName(e.target.value)}
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

                        {/* Required Attendees Input with Dropdown */}
                        <Grid item xs={12}>

                            <FormControl fullWidth variant="outlined">
                                <InputLabel id="attendees-label" shrink>Attendees</InputLabel>
                                <Select
                                    labelId="attendees-label"
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <PeopleIcon />
                                        </InputAdornment>
                                    }
                                    label="Attendees"
                                    multiple
                                    value={attendees}
                                    onChange={handleAttendeeChange}
                                    renderValue={(selected) => (
                                        <div>
                                            {selected.map((value) => (
                                                <Chip key={value} label={value} />
                                            ))}
                                        </div>
                                    )}
                                >
                                    {attendeesOptions.map((name) => (
                                        <MenuItem key={name} value={name}>
                                            {name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Add Venue"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LocationOnIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="Date"
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
                                    label="Time"
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

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Add Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
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
                    </Grid>

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            width: "100%",
                            mt: 2,
                        }}
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit}
                            sx={{
                                backgroundColor: "#16A1B8",
                                "&:hover": { backgroundColor: "#138f9b" },
                                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
                                borderRadius: "15px",
                                padding: "12px 24px",
                                fontSize: "1rem",
                                minWidth: "150px",
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
