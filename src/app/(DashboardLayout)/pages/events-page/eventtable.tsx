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
