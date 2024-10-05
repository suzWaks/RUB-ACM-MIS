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
                {/* Back to Calendar button */}
                <IconButton onClick={onClose} style={{ marginBottom: "20px" }}>
                    <ArrowBackIcon /> {/* Back arrow icon without any background */}
                </IconButton>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <FilterListIcon style={{ marginRight: "10px", marginTop: "12px" }} />
                    <Typography variant="body1" fontWeight="bold" marginTop="12px">Filter By</Typography>
                </div>

                {/* Start Date Picker */}
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

                    {/* End Date Picker */}
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

                {/* Status Dropdown */}
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

                {/* Reset Filter Button */}
                <Button variant="text" color="secondary" onClick={resetFilters} style={{ color: "#E74C3C" }}>
                    Reset Filter
                </Button>
            </div>

            {/* Table Section */}
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

export default EventTable;
