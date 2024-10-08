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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ReplayIcon from "@mui/icons-material/Replay";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker"; // Import DesktopDatePicker
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"; // Import LocalizationProvider
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"; // Import AdapterDayjs
import dayjs, { Dayjs } from "dayjs"; // Import Day.js for date handling
import CreateAnnouncementModal from "./CreateAnnouncementModal"; // Relative path
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
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null); // State for date picker

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (option: string): void => {
    setFilterOption(option);
    setAnchorEl(null);
  };

  // Handle resetting the filter
  const handleResetFilter = () => {
    setFilterOption("Filter By");
    setAnnouncements(initialAnnouncements); // Reset announcements
    setSelectedDate(null); // Reset selected date
  };

  // Handle filtering announcements based on the selected option
  const filteredAnnouncements = announcements.filter((announcement) => {
    if (filterOption === "Events") return announcement.tags.includes("Event");
    if (filterOption === "Meeting") return announcement.tags.includes("Meeting");
    if (selectedDate) return dayjs(announcement.createdOn).isSame(selectedDate, "day");
    return true; // If "Filter By" or "All", return all
  });

  const handleAddAnnouncement = (newAnnouncement: { title: string; createdBy: string; createdOn: string; time: string; tags: string[] }) => {
    setAnnouncements((prevAnnouncements) => [...prevAnnouncements, newAnnouncement]);
    handleCloseModal();
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
                    The ACM club coordinator wants to meet all the first years at
                  </Typography>
                  <Typography variant="subtitle2" fontWeight="400" fontSize="0.75rem">8pm on 26th November</Typography>
                </Box>
              </Box>
              <Box display="flex" alignItems="center">
                <Typography variant="subtitle2" fontWeight="400" fontSize="0.75rem" sx={{ marginRight: 2 }}>
                  Admin | Posted on 26th Sept
                </Typography>
                <IconButton>
                  <MoreVertIcon />
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

            {/* Date Picker for "Date Created" */}
            <DesktopDatePicker
              label="Date Created"
              value={selectedDate}
              onChange={(newDate) => setSelectedDate(newDate)} // Set selected date
            />

            <Button
              variant="outlined"
              color="secondary"
              sx={{ color: 'red', borderColor: '#ccc', borderRadius: '4px', padding: '14px 18px' }}
              startIcon={<ReplayIcon sx={{ color: 'red' }} />}
              onClick={handleResetFilter} // Reset Filter functionality
            >
              Reset Filter
            </Button>

            <Box sx={{ marginLeft: "auto" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleOpenModal}
                sx={{ color: "#fff", fontSize: "rem" }}
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
                    <TableCell>{item.title}</TableCell>
                    <TableCell>{item.createdBy}</TableCell>
                    <TableCell>
                      {item.tags.map((tag, tagIndex) => (
                        <Chip
                          key={tagIndex}
                          label={tag}
                          variant="outlined"
                          color="primary"
                          sx={{ marginRight: 1 }}
                        />
                      ))}
                    </TableCell>
                    <TableCell>{item.createdOn}</TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <EditIcon sx={{ marginRight: 1, cursor: "pointer", color: theme.palette.primary.main }} />
                        <DeleteIcon sx={{ cursor: "pointer", color: 'red' }} />
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
          onClose={handleCloseModal}
          onAddAnnouncement={handleAddAnnouncement}
        />
      </PageContainer>
    </LocalizationProvider>
  );
};

export default AnnouncementsPage;
