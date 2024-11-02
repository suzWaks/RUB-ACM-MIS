{/*import React, { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    IconButton,
    Typography,
    TextField,
    MenuItem,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FilterListIcon from "@mui/icons-material/FilterList";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";

// Sample event data
const eventData = [
    {
        name: "Coding Competition",
        venue: "Team Work Hall",
        startDate: "10/12/2024",
        endDate: "12/12/2024",
        status: "Recent",
    },
    {
        name: "Coding Competition",
        venue: "Team Work Hall",
        startDate: "10/12/2024",
        endDate: "12/12/2024",
        status: "Upcoming",
    },
];

// Available statuses for filtering
const statusOptions = ["All", "Recent", "Upcoming", "Scheduled"];

interface EventTableProps {
    onClose: () => void;
}

const EventTable: React.FC<EventTableProps> = ({ onClose }) => {
    const [startDate, setStartDate] = useState<Dayjs | null>(null);
    const [endDate, setEndDate] = useState<Dayjs | null>(null);
    const [status, setStatus] = useState<string>("All");

    // Function to get the style for different statuses
    const getStatusStyle = (status: string) => {
        switch (status) {
            case "Recent":
                return { backgroundColor: "#D9F2E5", color: "#16A085", padding: "5px 10px", borderRadius: "15px" };
            case "Upcoming":
                return { backgroundColor: "#F2E5FF", color: "#9B59B6", padding: "5px 10px", borderRadius: "15px" };
            case "Scheduled":
                return { backgroundColor: "#FDEDEC", color: "#E74C3C", padding: "5px 10px", borderRadius: "15px" };
            default:
                return {};
        }
    };

    // Function to reset filters
    const resetFilters = () => {
        setStartDate(null);
        setEndDate(null);
        setStatus("All");
    };

    return (
        <div style={{ padding: "2px" }}>

            <div style={{ display: "flex", flexDirection: "row", alignItems: "flex-start", marginBottom: "20px", gap: "20px" }}>
                {/* Back to Calendar button */} {/*
                <IconButton onClick={onClose} style={{ marginBottom: "20px" }}>
                    <ArrowBackIcon /> {/* Back arrow icon without any background */}
{/*  </IconButton>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <FilterListIcon style={{ marginRight: "10px", marginTop: "12px" }} />
                    <Typography variant="body1" fontWeight="bold" marginTop="12px">Filter By</Typography>
                </div>

            
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                        label="Start Date"
                        value={startDate}
                        onChange={(newValue) => setStartDate(newValue)}
                        slotProps={{
                            textField: {
                                fullWidth: true,
                                style: { maxWidth: "150px", minHeight: "5px" },
                            },
                        }}
                    />

                
                    <DesktopDatePicker
                        label="End Date"
                        value={endDate}
                        onChange={(newValue) => setEndDate(newValue)}
                        slotProps={{
                            textField: {
                                fullWidth: true,
                                style: { maxWidth: "150px" },
                            },
                        }}
                    />
                </LocalizationProvider>

        
                <TextField
                    select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    style={{ marginRight: "10px" }}
                >
                    {statusOptions.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>

    
                <Button variant="text" color="secondary" onClick={resetFilters} style={{ color: "#E74C3C" }}>
                    Reset Filter
                </Button>
            </div>

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><Typography fontWeight="bold">Name</Typography></TableCell>
                            <TableCell><Typography fontWeight="bold">Venue</Typography></TableCell>
                            <TableCell><Typography fontWeight="bold">Start Date</Typography></TableCell>
                            <TableCell><Typography fontWeight="bold">End Date</Typography></TableCell>
                            <TableCell><Typography fontWeight="bold">Status</Typography></TableCell>
                            <TableCell><Typography fontWeight="bold">Action</Typography></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {eventData
                            .filter((event) => status === "All" || event.status === status)
                            .filter((event) => !startDate || dayjs(event.startDate).isAfter(startDate))
                            .filter((event) => !endDate || dayjs(event.endDate).isBefore(endDate))
                            .map((event, index) => (
                                <TableRow key={index}>
                                    <TableCell>{event.name}</TableCell>
                                    <TableCell>{event.venue}</TableCell>
                                    <TableCell>{event.startDate}</TableCell>
                                    <TableCell>{event.endDate}</TableCell>
                                    <TableCell>
                                        <span style={getStatusStyle(event.status)}>{event.status}</span>
                                    </TableCell>
                                    <TableCell>
                                        <IconButton color="primary"><EditIcon /></IconButton>
                                        <IconButton color="secondary"><DeleteIcon /></IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default EventTable*/}

import React, { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    IconButton,
    Typography,
    TextField,
    MenuItem,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FilterListIcon from "@mui/icons-material/FilterList";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import EventForm from "./eventform";
import EventDetail from "./eventdetails";

const statusOptions = ["All", "Recent", "Upcoming", "Scheduled"];

interface Event {
    id: string;
    title: string;
    start: string;
    end?: string;
    allDay?: boolean;
    venue?: string;
    attendees?: string; // Added for EventDetail
    startTime?: string; // Added for EventDetail
    endTime?: string; // Added for EventDetail
    description?: string; // Added for EventDetail
    status?: string; // Added for EventDetail
}

interface EventTableProps {
    events: Event[];
    onClose: () => void;
    onEdit: (event: Event) => void;
    onDelete: (eventId: string) => void;
}

const EventTable: React.FC<EventTableProps> = ({ events, onClose, onEdit, onDelete }) => {
    const [startDate, setStartDate] = useState<Dayjs | null>(null);
    const [endDate, setEndDate] = useState<Dayjs | null>(null);
    const [status, setStatus] = useState<string>("All");
    const [showForm, setShowForm] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const [showDetails, setShowDetails] = useState(false);

    const handleCloseForm = () => {
        setShowForm(false);
    };

    const handleEditClick = (event: Event) => {
        setSelectedEvent(event);
        setShowDetails(true);
    };

    const handleCloseDetails = () => {
        setShowDetails(false);
        setSelectedEvent(null);
    };

    return (
        <div style={{ padding: "20px", backgroundColor: "#f8f9fa", borderRadius: "8px" }}>
            <Typography variant="h5" style={{ fontWeight: "bold", color: "#6c63ff", marginBottom: "20px" }}>
                All Events
            </Typography>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <IconButton onClick={onClose} style={{ color: "#6c63ff" }}>
                    <ArrowBackIcon />
                </IconButton>

                <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <FilterListIcon style={{ marginRight: "10px", color: "#6c63ff" }} />
                        <Typography variant="body1" fontWeight="bold"></Typography>
                    </div>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DesktopDatePicker
                            label="Start Date"
                            value={startDate}
                            onChange={(newValue) => setStartDate(newValue)}
                            slotProps={{
                                textField: {
                                    fullWidth: true,
                                    style: { maxWidth: "150px" },
                                },
                            }}
                        />
                        <DesktopDatePicker
                            label="End Date"
                            value={endDate}
                            onChange={(newValue) => setEndDate(newValue)}
                            slotProps={{
                                textField: {
                                    fullWidth: true,
                                    style: { maxWidth: "150px" },
                                },
                            }}
                        />
                    </LocalizationProvider>

                    <TextField
                        select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        style={{ maxWidth: "150px" }}
                    >
                        {statusOptions.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>

                    <Button
                        variant="text"
                        color="secondary"
                        onClick={() => { setStartDate(null); setEndDate(null); setStatus("All"); }}
                        style={{ color: "#e74c3c" }}
                    >
                        Reset Filter
                    </Button>
                </div>
            </div>

            <TableContainer style={{ borderRadius: "8px", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}>
                <Table>
                    <TableHead style={{ backgroundColor: "#f1f1f1" }}>
                        <TableRow>
                            <TableCell style={{ fontWeight: "bold" }}>Name</TableCell>
                            <TableCell style={{ fontWeight: "bold" }}>Venue</TableCell>
                            <TableCell style={{ fontWeight: "bold" }}>Start Date</TableCell>
                            <TableCell style={{ fontWeight: "bold" }}>End Date</TableCell>
                            <TableCell style={{ fontWeight: "bold" }}>Status</TableCell>
                            <TableCell style={{ fontWeight: "bold", textAlign: "center" }}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {events.map((event) => (
                            <TableRow key={event.id}>
                                <TableCell>{event.title}</TableCell>
                                <TableCell>{event.venue}</TableCell>
                                <TableCell>{new Date(event.start).toLocaleDateString()}</TableCell>
                                <TableCell>{event.end ? new Date(event.end).toLocaleDateString() : "-"}</TableCell>
                                <TableCell>
                                    <span
                                        style={{
                                            padding: "4px 8px",
                                            borderRadius: "12px",
                                            color: "white",
                                            backgroundColor:
                                                event.allDay ? "#6c63ff" :
                                                    event.title === "Scheduled" ? "#FF6347" :
                                                        event.title === "Upcoming" ? "#9370DB" : "#2ECC71",
                                        }}
                                    >
                                        {event.allDay ? "Scheduled" : "Scheduled"}
                                    </span>
                                </TableCell>
                                <TableCell style={{ textAlign: "center" }}>
                                    <IconButton onClick={() => handleEditClick(event)} style={{ color: "#6c63ff" }}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => onDelete(event.id)} style={{ color: "#e74c3c" }}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {showForm && <EventForm onClose={handleCloseForm} onSubmit={(eventData) => {/* handle event creation here */ }} />}

            {showDetails && selectedEvent && (
                <EventDetail
                    eventData={{
                        name: selectedEvent.title,
                        attendees: selectedEvent.attendees || "",
                        venue: selectedEvent.venue || "",
                        startDate: new Date(selectedEvent.start).toLocaleDateString(),
                        endDate: selectedEvent.end ? new Date(selectedEvent.end).toLocaleDateString() : "-",
                        startTime: selectedEvent.startTime || "",
                        endTime: selectedEvent.endTime || "",
                        description: selectedEvent.description || "",
                        status: selectedEvent.status || "Scheduled"
                    }}
                    onClose={handleCloseDetails}
                />
            )}
        </div>
    );
};

export default EventTable;
