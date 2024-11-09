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
} from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import theme from "@/utils/theme";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ReplayIcon from "@mui/icons-material/Replay";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
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

            {/* Date Picker for "Date Created" */}
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
                Create Announcement
              </Button>
            </Box>
          </Box>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "600" }}>Title</TableCell>
                  <TableCell sx={{ fontWeight: "600" }}>Created By</TableCell>
                  <TableCell sx={{ fontWeight: "600" }}>Tags</TableCell>
                  <TableCell sx={{ fontWeight: "600" }}>Created On</TableCell>
                  <TableCell sx={{ fontWeight: "600" }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredAnnouncements.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.announcement_title}</TableCell>
                    <TableCell>{item.created_by?.role || "N/A"}</TableCell>
                    <TableCell>
                      {item.tags.map((tag: string, tagIndex: number) => (
                        <Chip
                          key={tagIndex}
                          label={tag}
                          variant="outlined"
                          color="primary"
                          sx={{ marginRight: 1 }}
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
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

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
      </PageContainer>
    </LocalizationProvider>
  );
};

export default AnnouncementsPage;
