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
  TablePagination,
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
import { useEffect } from "react";
import Loading from "../../loading";

const statusOptions = ["All", "Recent", "Upcoming", "Scheduled"];

interface Event {
  id: string;
  title: string;
  start: string;
  end?: string;
  allDay?: boolean;
  venue?: string;
  attendees?: string;
  startTime?: string;
  endTime?: string;
  description?: string;
  status?: string;
}

interface EventTableProps {
  events: Event[];
  onClose: () => void;
  onEdit: (event: Event) => void;
  onDelete: (eventId: string) => void;
}

const EventTable: React.FC<EventTableProps> = ({
  events,
  onClose,
  onEdit,
  onDelete,
}) => {
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [status, setStatus] = useState<string>("All");
  const [showForm, setShowForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  // Pagination state
  const [page, setPage] = useState(0);
  const rowsPerPage = 10; // Fixed number of rows per page

  const handlePageChange = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

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

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Completed":
        return {
          backgroundColor: "#D9F2E5",
          color: "#16A085",
          padding: "5px 10px",
          borderRadius: "15px",
        };
      case "Upcoming":
        return {
          backgroundColor: "#F2E5FF",
          color: "#9B59B6",
          padding: "5px 10px",
          borderRadius: "15px",
        };
      case "Today":
        return {
          backgroundColor: "#FDEDEC",
          color: "#E74C3C",
          padding: "5px 10px",
          borderRadius: "15px",
        };
      default:
        return {};
    }
  };

  const filteredEvents = events.filter((event) => {
    const eventStartDate = dayjs(event.start);
    const eventEndDate = event.end ? dayjs(event.end) : null;
  });

  //------------------------------------------------------------
  //Integration Code//

  interface Event {
    event_id: string;
    event_name: string;
    event_date: string;
    venue: string;
    time: string;
    year: string[];
  }

  const [allEvent, setAllEvent] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchAllEvents = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/events/fetchall");
      if (!response.ok) {
        throw new Error("Fetch error");
      }
      const result = await response.json();
      setAllEvent(result);
    } catch (error) {
      setError("Some Error Occured");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchAllEvents();
    };
    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#f8f9fa",
        borderRadius: "8px",
      }}
    >
      <Typography
        variant="h5"
        style={{ fontWeight: "bold", color: "#6c63ff", marginBottom: "20px" }}
      >
        All Events
      </Typography>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <IconButton onClick={onClose} style={{ color: "#6c63ff" }}>
          <ArrowBackIcon />
        </IconButton>

        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <FilterListIcon style={{ marginRight: "10px", color: "#6c63ff" }} />
            <Typography variant="body1" fontWeight="bold">
              Filter By
            </Typography>
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
          {showForm && (
            <EventForm
              onClose={handleCloseForm}
              onSubmit={(eventData) => {
                /* handle event creation here */
              }}
            />
          )}

          {showDetails && selectedEvent && (
            <EventDetail
              eventData={{
                event_name: selectedEvent.event_name,
                year: selectedEvent.year,
                venue: selectedEvent.venue || "",
                start_date: new Date(
                  selectedEvent.event_date
                ).toLocaleDateString(),
                time: selectedEvent.time || "",
                // description: selectedEvent.description || "",
                // status: selectedEvent.status || "Scheduled",
              }}
              onClose={handleCloseDetails}
              onSubmit={(eventData) => {
                console.log("Submitted event data:", eventData);
                handleCloseDetails();
              }}
            />
          )}
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
            onClick={() => {
              setStartDate(null);
              setEndDate(null);
              setStatus("All");
            }}
            style={{ color: "#e74c3c" }}
          >
            Reset Filter
          </Button>
        </div>
      </div>

      <TableContainer
        style={{
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Table>
          <TableHead style={{ backgroundColor: "#f1f1f1" }}>
            <TableRow>
              <TableCell style={{ fontWeight: "bold" }}>Name</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Venue</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Date</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Time</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Status</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Year Invited</TableCell>
              <TableCell style={{ fontWeight: "bold", textAlign: "center" }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allEvent.map((event) => {
              const eventStartDate = dayjs(event.event_date);

              // Determine status based on start_date
              const status = dayjs().isBefore(eventStartDate, "day")
                ? "Upcoming"
                : dayjs().isAfter(eventStartDate, "day")
                ? "Completed"
                : "Today";

              return (
                <TableRow key={event.event_id}>
                  <TableCell>{event.event_name}</TableCell>
                  <TableCell>{event.venue}</TableCell>
                  <TableCell>
                    {new Date(event.event_date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{event.time}</TableCell>
                  <TableCell>
                    <span style={getStatusStyle(status)}>{status}</span>
                  </TableCell>
                  <TableCell>{" " + event.year}</TableCell>
                  <TableCell style={{ textAlign: "center" }}>
                    <IconButton
                      onClick={() => handleEditClick(event)}
                      style={{ color: "#6c63ff" }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => onDelete(event.event_id)}
                      style={{ color: "#e74c3c" }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={filteredEvents.length}
        page={page}
        onPageChange={handlePageChange}
        rowsPerPage={rowsPerPage}
        labelRowsPerPage=""
      />

      {showForm && (
        <EventForm
          onClose={handleCloseForm}
          onSubmit={(eventData) => {
            /* handle event creation here */
          }}
        />
      )}
      {/* 
      {showDetails && selectedEvent && (
        <EventDetail
          eventData={{
            name: selectedEvent.title,
            attendees: selectedEvent.attendees || "",
            venue: selectedEvent.venue || "",
            startDate: new Date(selectedEvent.start).toLocaleDateString(),
            endDate: selectedEvent.end
              ? new Date(selectedEvent.end).toLocaleDateString()
              : "-",
            startTime: selectedEvent.startTime || "",
            endTime: selectedEvent.endTime || "",
            description: selectedEvent.description || "",
            status: selectedEvent.status || "Scheduled",
          }}
          onClose={handleCloseDetails}
        />
      )} */}
    </div>
  );
};

export default EventTable;
