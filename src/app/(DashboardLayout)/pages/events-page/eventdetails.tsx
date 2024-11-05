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
    Chip,
    FormControl,
    InputLabel,
} from "@mui/material";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import CloseIcon from "@mui/icons-material/Close";
import EventIcon from "@mui/icons-material/Event";
import PeopleIcon from "@mui/icons-material/People";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DescriptionIcon from "@mui/icons-material/Description";
import dayjs, { Dayjs } from "dayjs";
import { SelectChangeEvent } from "@mui/material/Select";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

interface EventDetailFormProps {
    eventData: {
        name: string;
        attendees: string[];
        venue: string;
        startDate: string;
        startTime: string;
        description: string;
        status: string;
    };
    onClose: () => void;
    onSubmit: (eventData: any) => void;
}

const attendeesList = [
    "First Year",
    "Second Year",
    "Third Year",
    "Fourth Year",
];

const EventDetailForm: React.FC<EventDetailFormProps> = ({ eventData, onClose, onSubmit }) => {
    const [eventName, setEventName] = useState(eventData.name);
    const [attendees, setAttendees] = useState(eventData.attendees);
    const [venue, setVenue] = useState(eventData.venue);
    const [startDate, setStartDate] = useState<Dayjs | null>(dayjs(eventData.startDate));
    const [startTime, setStartTime] = useState<Dayjs | null>(dayjs(`1970-01-01 ${eventData.startTime}`));
    const [description, setDescription] = useState(eventData.description);

    const handleAttendeeChange = (event: SelectChangeEvent<string[]>) => {
        const {
            target: { value },
        } = event;
        setAttendees(typeof value === 'string' ? value.split(',') : value);
    };

    const handleSubmit = () => {
        const updatedEventData = {
            name: eventName,
            attendees,
            venue,
            startDate: startDate ? startDate.format("MM/DD/YYYY") : "",
            startTime: startTime ? startTime.format("HH:mm") : "",
            description,
            status: "Scheduled",
        };

        console.log("Submitting updated event data:", updatedEventData);
        onSubmit(updatedEventData);
        onClose();
    };

    return (
        <Box
            sx={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "95%",
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
                        Event Details
                    </Typography>

                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Event Name"
                                value={eventName}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <EventIcon />
                                        </InputAdornment>
                                    ),
                                }}
                                onChange={(e) => setEventName(e.target.value)}
                            />
                        </Grid>

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
                                    {attendeesList.map((name) => (
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
                                label="Venue"
                                value={venue}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LocationOnIcon />
                                        </InputAdornment>
                                    ),
                                }}
                                onChange={(e) => setVenue(e.target.value)}
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
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Start Time"
                                value={startTime ? startTime.format("HH:mm") : ""}
                                onChange={(e) => setStartTime(dayjs(`1970-01-01 ${e.target.value}`))}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Description"
                                value={description}
                                multiline
                                rows={4}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <DescriptionIcon />
                                        </InputAdornment>
                                    ),
                                }}
                                onChange={(e) => setDescription(e.target.value)}
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
                                minWidth: "130px",
                            }}
                        >
                            Save Changes
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default EventDetailForm;