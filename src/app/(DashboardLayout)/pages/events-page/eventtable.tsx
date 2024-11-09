import React, { useState, useEffect } from "react";
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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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
  // events: Event[];
  onClose: () => void;
}

const EventTable: React.FC<EventTableProps> = ({ onClose }) => {
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [status, setStatus] = useState<string>("All");
  const [showForm, setShowForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [allEvent, setAllEvent] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [eventIdToDelete, setEventIdToDelete] = useState<string | null>(null);

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

  // const filteredEvents = events.filter((event) => {
  //   const eventStartDate = dayjs(event.start);
  //   const eventEndDate = event.end ? dayjs(event.end) : null;
  // });

  //------------------------------------------------------------
  //Integration Code//

  interface Event {
    _id: string;
    event_name: string;
    event_date: string;
    venue: string;
    time: string;
    year: string[];
  }

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

  const handleOpenDeleteDialog = (eventId: string) => {
    setEventIdToDelete(eventId);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setEventIdToDelete(null);
  };

  const handleDeleteConfirmed = () => {
    if (eventIdToDelete) {
      onDelete(eventIdToDelete);
    }
    handleCloseDeleteDialog();
  };

  const onDelete = async (eventId: string) => {
    try {
      const response = await fetch(`/api/events/${eventId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to delete event with ID ${eventId}`);
      }

      // You might want to update the UI or notify the user of success
      console.log(`Event with ID ${eventId} was successfully deleted.`);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting event:", error);
      // Optionally show error to the user
    }
  };

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
              // onSubmit={(eventData) => {
              //   /* handle event creation here */
              // }}
            />
          )}

          {showDetails && selectedEvent && (
            <EventDetail
              eventData={{
                id: selectedEvent._id,
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
              {/* <TableCell style={{ fontWeight: "bold" }}>Year Invited</TableCell> */}
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
                <TableRow key={event._id}>
                  <TableCell>{event.event_name}</TableCell>
                  <TableCell>{event.venue}</TableCell>
                  <TableCell>
                    {new Date(event.event_date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{event.time}</TableCell>
                  <TableCell>
                    <span style={getStatusStyle(status)}>{status}</span>
                  </TableCell>
                  {/* <TableCell>{" " + event.year}</TableCell> */}
                  <TableCell style={{ textAlign: "center" }}>
                    <IconButton
                      onClick={() => handleEditClick(event)}
                      style={{ color: "#6c63ff" }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleOpenDeleteDialog(event._id)}
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

      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            Are you sure you want to delete this event? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirmed} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* <TablePagination
        component="div"
        count={filteredEvents.length}
        page={page}
        onPageChange={handlePageChange}
        rowsPerPage={rowsPerPage}
        labelRowsPerPage=""
      /> */}

      {showForm && (
        <EventForm
          onClose={handleCloseForm}
          // onSubmit={(eventData) => {
          //   /* handle event creation here */
          // }}
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
