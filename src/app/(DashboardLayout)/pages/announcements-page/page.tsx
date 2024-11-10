"use client";
import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Button,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Card,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Menu,
  MenuItem,
  TextField,
  TablePagination,
} from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import theme from "@/utils/theme";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ReplayIcon from "@mui/icons-material/Replay";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import CreateAnnouncementModal from "./CreateAnnouncementModal";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import dayjs, { Dayjs } from "dayjs";
import EditAnnouncementModal from "./EditAnnouncement";

const AnnouncementsPage: React.FC = () => {
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [filterOption, setFilterOption] = useState<string>("Filter By");
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false); // For dialog visibility
  const [announcementToDelete, setAnnouncementToDelete] = useState<
    string | null
  >(null); // Store the ID of the announcement to delete
  const [openEditModal, setOpenEditModal] = useState(false); // State for the edit modal
  const [announcementToEdit, setAnnouncementToEdit] = useState<any | null>(
    null
  ); // Announcement to edit

  // Fetch announcements from the API
  const fetchAnnouncements = async () => {
    try {
      const response = await fetch("/api/announcements");
      if (!response.ok) {
        throw new Error("Failed to fetch announcements");
      }
      const result = await response.json();
      setAnnouncements(result);
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchAnnouncements();
  }, []);
  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [editAnnouncement, setEditAnnouncement] = useState<{ title: string; createdBy: string; createdOn: string; time: string; tags: string[] } | null>(null);

  // Pagination states
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(5); // Fixed number of rows per page
  const [currentAnnouncementIndex, setCurrentAnnouncementIndex] = useState(0); // Current announcement index

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setOpenModal(false);
    setEditAnnouncement(null); // Reset edit state when closing modal
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (option: string): void => {
    setFilterOption(option);
    setAnchorEl(null);
  };

  const handleResetFilter = () => {
    setFilterOption("Filter By");
    setAnnouncements([]); // Reset announcements
    setSelectedDate(null); // Reset selected date
    fetchAnnouncements(); // Re-fetch all announcements
  };

  // Handle delete announcement
  const handleDeleteAnnouncement = async () => {
    if (!announcementToDelete) return;
    try {
      const response = await fetch(
        `/api/announcements?id=${announcementToDelete}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        // Remove the deleted announcement from the state
        setAnnouncements(
          announcements.filter(
            (announcement) => announcement._id !== announcementToDelete
          )
        );
        setOpenDeleteDialog(false); // Close the dialog after deletion
      } else {
        console.error("Failed to delete announcement");
      }
    } catch (error) {
      console.error("Error deleting announcement:", error);
    }
  };

  const handleOpenDeleteDialog = (id: string) => {
    setAnnouncementToDelete(id);
    setOpenDeleteDialog(true); // Open the delete confirmation dialog
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setAnnouncementToDelete(null);
  };

  const handleOpenEditModal = (announcement: any) => {
    setAnnouncementToEdit(announcement);
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setAnnouncementToEdit(null);
  };

  // Filter announcements based on filter option (tags and date)
  const filteredAnnouncements = announcements.filter((announcement) => {
    if (
      filterOption !== "Filter By" &&
      !announcement.tags.some(
        (tag: string) => tag.toLowerCase() === filterOption.toLowerCase()
      )
    ) {
      return false;
    }
    if (selectedDate) {
      return dayjs(announcement.createdAt).isSame(selectedDate, "day");
    }
    return true;
  });

  // Get the latest announcement (most recent by createdAt)
  const latestAnnouncement =
    announcements.length > 0
      ? announcements.sort((a, b) =>
          dayjs(b.createdAt).isBefore(dayjs(a.createdAt)) ? 1 : -1
        )[0]
      : null;
    setAnnouncements(initialAnnouncements);
    setSelectedDate(null);
  };

  const filteredAnnouncements = announcements.filter((announcement) => {
    if (filterOption === "Events") return announcement.tags.includes("Event");
    if (filterOption === "Meeting") return announcement.tags.includes("Meeting");
    if (selectedDate) return dayjs(announcement.createdOn).isSame(selectedDate, "day");
    return true;
  });

  const handleAddAnnouncement = (newAnnouncement: { title: string; createdBy: string; createdOn: string; time: string; tags: string[] }) => {
    if (editAnnouncement) {
      setAnnouncements((prevAnnouncements) =>
        prevAnnouncements.map((announcement) =>
          announcement.title === editAnnouncement.title ? newAnnouncement : announcement
        )
      );
    } else {
      setAnnouncements((prevAnnouncements) => [...prevAnnouncements, newAnnouncement]);
    }
    handleCloseModal();
  };

  const handleEditAnnouncement = (announcement: { title: string; createdBy: string; createdOn: string; time: string; tags: string[] }) => {
    setEditAnnouncement(announcement);
    handleOpenModal();
  };

  const handleDeleteAnnouncement = (title: string) => {
    setAnnouncements((prevAnnouncements) =>
      prevAnnouncements.filter((announcement) => announcement.title !== title)
    );
  };

  // Handle pagination change
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleNextAnnouncement = () => {
    if (currentAnnouncementIndex < filteredAnnouncements.length - 1) {
      setCurrentAnnouncementIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePreviousAnnouncement = () => {
    if (currentAnnouncementIndex > 0) {
      setCurrentAnnouncementIndex((prevIndex) => prevIndex - 1);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <PageContainer
        title="Announcements"
        description="Manage your announcements effectively."
      >
        <Box display="flex" flexDirection="column" mb={2}>
          <Typography
            variant="h4"
            sx={{ color: theme.palette.primary.main }}
            mb={2}
          >
            Announcements
          </Typography>

          {/* Display the latest announcement in a Card */}
          {latestAnnouncement && (
            <Card variant="outlined" sx={{ mb: 4 }}>
              <Box display="flex" flexDirection="column" p={2}>
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                  {latestAnnouncement.announcement_title}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ mb: 1 }}
                >
                  {latestAnnouncement.description || "No description available"}
                </Typography>
                <Box display="flex" alignItems="center" sx={{ gap: 1 }}>
                  {latestAnnouncement.tags.map((tag: string, index: number) => (
                    <Chip
                      key={index}
                      label={tag}
                      variant="outlined"
                      color="primary"
                    />
                  ))}
                </Box>
                <Typography
                  variant="caption"
                  color="textSecondary"
                  sx={{ mt: 2 }}
                >
                  Created on:{" "}
                  {dayjs(latestAnnouncement.createdAt).format("MMM D, YYYY")}
                </Typography>
          <Card variant="outlined" sx={{ mb: 6 }}>
            <Box display="flex" alignItems="center" justifyContent="space-between" p={2}>
              <Box display="flex" alignItems="center">
                <AccountCircle sx={{ color: theme.palette.primary.main, marginRight: 1, fontSize: "30px" }} />
                <Box>
                  <Typography variant="subtitle1" fontWeight="600" fontSize="1rem">
                    {filteredAnnouncements[currentAnnouncementIndex]?.title}
                  </Typography>
                  <Typography variant="subtitle2" fontWeight="400" fontSize="0.75rem">
                    {filteredAnnouncements[currentAnnouncementIndex]?.time}
                  </Typography>
                </Box>
              </Box>
              <Box display="flex" alignItems="center">
                <Typography variant="subtitle2" fontWeight="400" fontSize="0.75rem" sx={{ marginRight: 2 }}>
                  {filteredAnnouncements[currentAnnouncementIndex]?.createdBy} | Posted on {filteredAnnouncements[currentAnnouncementIndex]?.createdOn}
                </Typography>
                <IconButton onClick={handlePreviousAnnouncement} disabled={currentAnnouncementIndex === 0}>
                  <Typography variant="h6">&lt;</Typography>
                </IconButton>
                <IconButton onClick={handleNextAnnouncement} disabled={currentAnnouncementIndex === filteredAnnouncements.length - 1}>
                  <Typography variant="h6">&gt;</Typography>
                </IconButton>
              </Box>
            </Card>
          )}

          <Box display="flex" alignItems="center" mb={2} sx={{ gap: 1 }}>
            <Box
              display="flex"
              alignItems="center"
              sx={{
                border: "1px solid #ccc",
                borderRadius: "4px",
                padding: "4px 8px",
              }}
            >
              <Button
                onClick={handleClick}
                sx={{ textTransform: "none", padding: 1 }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{ marginRight: 1, color: theme.palette.text.secondary }}
                >
                  {filterOption}
                </Typography>
                <ArrowDropDownIcon
                  sx={{ color: theme.palette.text.secondary }}
                />
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => handleClose(filterOption)}
              >
                {["Event", "Meeting"].map((tag) => (
                  <MenuItem key={tag} onClick={() => handleClose(tag)}>
                    {tag}
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <DesktopDatePicker
              label="Date Created"
              value={selectedDate}
              onChange={(newDate) => setSelectedDate(newDate)}
            />

            <Button
              variant="outlined"
              color="secondary"
              sx={{
                color: "red",
                borderColor: "#ccc",
                borderRadius: "4px",
                padding: "14px 18px",
              }}
              startIcon={<ReplayIcon sx={{ color: "red" }} />}
              sx={{ color: 'red', borderColor: '#ccc', borderRadius: '4px', padding: '14px 18px' }}
              startIcon={<ReplayIcon sx={{ color: 'red' }} />}
              onClick={handleResetFilter}
            >
              Reset Filter
            </Button>

            <Box sx={{ marginLeft: "auto" }}>

              <Button
                variant="contained"
                color="primary"
                onClick={() => setOpenModal(true)}
                sx={{ color: "#fff" }}
              >

              <Button variant="contained" color="primary" onClick={handleOpenModal}>

                Create Announcement
              </Button>
            </Box>
          </Box>

          <CreateAnnouncementModal
            open={openModal}
            onClose={handleCloseModal}
            onAddAnnouncement={handleAddAnnouncement}
          />

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Created By</TableCell>
                  <TableCell>Created On</TableCell>
                  <TableCell>Time</TableCell>
                  <TableCell>Tags</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>

                {filteredAnnouncements.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.announcement_title}</TableCell>
                    <TableCell>{item.created_by?.role || "N/A"}</TableCell>
                    <TableCell>
                      {item.tags.map((tag: string, tagIndex: number) => (

                {filteredAnnouncements.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((announcement) => (
                  <TableRow key={announcement.title}>
                    <TableCell>{announcement.title}</TableCell>
                    <TableCell>{announcement.createdBy}</TableCell>
                    <TableCell>{announcement.createdOn}</TableCell>
                    <TableCell>{announcement.time}</TableCell>
                    <TableCell>
                      {announcement.tags.map((tag) => (

                        <Chip
                          key={tag}
                          label={tag}
                          variant="outlined"
                          color="primary"
                          size="small"
                          sx={{ marginRight: 1}} // Margin between tags
                        />
                      ))}
                    </TableCell>

                    <TableCell>
                      {dayjs(item.createdAt).format("MMM D, YYYY")}
                    </TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <IconButton onClick={() => handleOpenEditModal(item)}>
                          <MoreVertIcon />
                        </IconButton>

                        <IconButton
                          color="error"
                          onClick={() => handleOpenDeleteDialog(item._id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>

                    <TableCell>
                      <IconButton onClick={() => handleEditAnnouncement(announcement)}>
                        <EditIcon sx={{ color: theme.palette.secondary.main }} /> {/* Reverted to secondary color */}
                      </IconButton>
                      <IconButton onClick={() => handleDeleteAnnouncement(announcement.title)}>
                        <DeleteIcon sx={{ color: theme.palette.error.main }} /> {/* Reverted to error color */}
                      </IconButton>

                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>


        <CreateAnnouncementModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          onAddAnnouncement={fetchAnnouncements}
        />
        <EditAnnouncementModal
          open={openEditModal}
          onClose={handleCloseEditModal}
          announcement={announcementToEdit}
          onUpdateAnnouncement={fetchAnnouncements}
        />

        {/* Delete Confirmation Dialog */}
        <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to delete this announcement?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDeleteDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDeleteAnnouncement} color="error">
              Delete
            </Button>
          </DialogActions>
        </Dialog>

          <TablePagination
            rowsPerPageOptions={[]}
            component="div"
            count={filteredAnnouncements.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
          />
        </Box>

      </PageContainer>
    </LocalizationProvider>
  );
};

export default AnnouncementsPage;
