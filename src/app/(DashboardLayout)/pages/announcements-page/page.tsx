"use client";

import React, { useState } from "react";
import {
  Typography,
  Button,
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  InputAdornment,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  TablePagination,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ReplayIcon from "@mui/icons-material/Replay";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import CreateAnnouncementModal from "./CreateAnnouncementModal";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import theme from "@/utils/theme";

const initialAnnouncements = [
  {
    title: "The ACM club coordinator wants to meet all the first years at",
    createdBy: "Admin",
    createdOn: "10/10/2024",
    time: "8pm on 26th November",
    tags: ["Meeting"],
  },
  {
    title: "Club meeting next week",
    createdBy: "Admin",
    createdOn: "12/10/2024",
    time: "10am on 1st December",
    tags: ["Meeting"],
  },
  {
    title: "Guest speaker event on Friday",
    createdBy: "Admin",
    createdOn: "15/10/2024",
    time: "5pm on 30th November",
    tags: ["Event"],
  },
  {
    title: "Programming Classes",
    createdBy: "Admin",
    createdOn: "12/11/2024",
    time: "10am on 1st December",
    tags: ["Event"],
  },
  {
    title: "Seminar",
    createdBy: "Admin",
    createdOn: "15/11/2024",
    time: "5pm on 30th November",
    tags: ["Event"],
  },
];

const AnnouncementsPage: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [filterOption, setFilterOption] = useState<string>("Filter By");
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
      <PageContainer title="Announcements" description="Manage your announcements effectively.">
        <Box display="flex" flexDirection="column" mb={2}>
          <Typography variant="h4" sx={{ color: theme.palette.primary.main }} mb={2}>
            Announcements
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
            </Box>
          </Card>

          <Box display="flex" alignItems="center" mb={2} sx={{ gap: 1 }}>
            <Box display="flex" alignItems="center" sx={{ border: "1px solid #ccc", borderRadius: "4px", padding: "4px 8px" }}>
              <InputAdornment position="start">
                <FilterListIcon />
              </InputAdornment>
              <Button onClick={handleClick} sx={{ textTransform: 'none', padding: 1 }}>
                <Typography variant="subtitle1" sx={{ marginRight: 1, color: theme.palette.text.secondary }}>
                  {filterOption}
                </Typography>
                <ArrowDropDownIcon sx={{ color: theme.palette.text.secondary }} />
              </Button>
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => handleClose(filterOption)}>
                <MenuItem onClick={() => handleClose("Events")}>Events</MenuItem>
                <MenuItem onClick={() => handleClose("Meeting")}>Meeting</MenuItem>
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
              sx={{ color: 'red', borderColor: '#ccc', borderRadius: '4px', padding: '14px 18px' }}
              startIcon={<ReplayIcon sx={{ color: 'red' }} />}
              onClick={handleResetFilter}
            >
              Reset Filter
            </Button>

            <Box sx={{ marginLeft: "auto" }}>
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
