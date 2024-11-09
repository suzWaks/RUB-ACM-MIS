import React, { useState, useEffect } from "react";
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
import EventIcon from "@mui/icons-material/Event";
import PeopleIcon from "@mui/icons-material/People";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import dayjs, { Dayjs } from "dayjs";
import { SelectChangeEvent } from "@mui/material";
import { useSession } from "next-auth/react"; // Assuming you're using next-auth for session management
import Loading from "@/app/loading";

interface EventFormProps {
  onClose: () => void;
  onSubmit: (eventData: any) => void;
}

const attendeesOptions = [
  "First Year",
  "Second Year",
  "Third Year",
  "Fourth Year",
];

const AddEventForm = ({ onSubmit, onClose }: EventFormProps) => {
  const [eventName, setEventName] = useState("");
  const [attendees, setAttendees] = useState<string[]>([]);
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [startTime, setStartTime] = useState<Dayjs | null>(null);
  const [description, setDescription] = useState("");
  const { data: session, status } = useSession(); // Fetch session data
  const [loading, setLoading] = useState(false); // Set initial loading state to false

  // Accessing session data directly
  if (session?.user?.id) {
    console.log("User ID:", session.user.id);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (status === "loading") {
      // Handle loading state if session is still loading
      console.log("Loading session...");
      return;
    }
    if (!session?.user?.id) {
      console.error("User ID is not available.");
      return;
    }
    // Ensure session exists
    if (!session || !session.user) {
      console.error("No session found. User not authenticated.");
      return;
    }

    const eventData = {
      event_name: eventName,
      registeredMember: attendees,
      venue: location,
      event_date: startDate ? dayjs(startDate).format("YYYY-MM-DD") : "",
      time: startTime ? dayjs(startTime).format("HH:mm") : "",
      description,
      status: "loading",
      createdBy: session.user.id, // Use session user ID as createdBy
    };

    console.log("Submitting event data:", eventData);

    setLoading(true); // Set loading to true when starting the request

    try {
      const response = await fetch("/api/events/addEvents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Failed to add event. Server response:", errorText);
        throw new Error(errorText);
      }

      const result = await response.json();
      console.log("Event added successfully:", result);
      onSubmit(result);
      setLoading(false); // Set loading to false when done
      onClose();
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error adding event:", error.message);
      } else {
        console.error("Unexpected error:", error);
      }
      setLoading(false); // Set loading to false on error as well
    }
  };

  const handleAttendeeChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    setAttendees(typeof value === "string" ? value.split(",") : value);
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
      {loading ? (
        // If loading is true, display the Loading component
        <Card
          sx={{
            width: "70%",
            height: "80%",
            position: "relative",
            boxShadow: "0px 0px 12px rgba(0, 0, 0, 0.2)",
            borderRadius: "10px",
            backgroundColor: "white",
            marginLeft: "15%",
            overflow: "hidden",
          }}
        >
          <CardContent sx={{ overflowY: "auto", maxHeight: "100%" }}>
            <Loading />
          </CardContent>
        </Card>
      ) : (
        <Card
          sx={{
            width: "70%",
            height: "80%",
            position: "relative",
            boxShadow: "0px 0px 12px rgba(0, 0, 0, 0.2)",
            borderRadius: "10px",
            backgroundColor: "white",
            marginLeft: "15%",
            overflow: "hidden",
          }}
        >
          <CardContent sx={{ overflowY: "auto", maxHeight: "100%" }}>
            <IconButton
              aria-label="close"
              onClick={onClose}
              sx={{ position: "absolute", top: 10, right: 10 }}
            >
              <CloseIcon />
            </IconButton>
            <Typography
              variant="h4"
              color="purple"
              fontWeight="bold"
              gutterBottom
            >
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

              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="attendees-label">Attendees</InputLabel>
                  <Select
                    labelId="attendees-label"
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
                    input={
                      <OutlinedInput
                        startAdornment={
                          <InputAdornment position="start">
                            <PeopleIcon />
                          </InputAdornment>
                        }
                      />
                    }
                  >
                    {attendeesOptions.map((name) => (
                      <MenuItem key={name} value={name}>
                        <Checkbox checked={attendees.indexOf(name) > -1} />
                        <ListItemText primary={name} />
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
                      textField: { fullWidth: true },
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
                      textField: { fullWidth: true, variant: "outlined" },
                    }}
                  />
                </LocalizationProvider>
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
      )}
    </Box>
  );
};

export default AddEventForm;
