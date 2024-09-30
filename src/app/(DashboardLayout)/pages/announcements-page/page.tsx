"use client";
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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ReplayIcon from "@mui/icons-material/Replay"; // Import the Reset Icon
import MoreVertIcon from "@mui/icons-material/MoreVert"; // Kebab menu icon
import AccountCircle from "@mui/icons-material/AccountCircle"; // Profile icon
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";

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

const AnnouncementsPage = () => {
  return (
    <PageContainer
      title="Announcements"
      description="Manage your announcements effectively."
    >
      <Box display="flex" flexDirection="column" mb={2}>
        <Typography variant="h4" sx={{ color: "#6F42C1" }} mb={2}>
          Announcements
        </Typography>

        {/* Main Announcement Card */}
        <Card variant="outlined" sx={{ mb: 2 }}>
          <Box display="flex" alignItems="center" justifyContent="space-between" p={2}>
            <Box display="flex" alignItems="center">
              <AccountCircle sx={{ color: "#6F42C1", marginRight: 1, fontSize: "100" }} />
              <Box>
                <Typography variant="subtitle1" fontWeight="bold">
                  The ACM club coordinator wants to meet all the first years at
                </Typography>
                <Typography variant="subtitle2">
                  8pm on 26th November
                </Typography>
              </Box>
            </Box>
            <Box display="flex" alignItems="center">
              <Typography variant="subtitle2" sx={{ marginRight: 2 }}>
                Admin | Posted on 26th Sept
              </Typography>
              <IconButton>
                <MoreVertIcon />
              </IconButton>
            </Box>
          </Box>
        </Card>

        {/* Filter Section */}
        <Box display="flex" alignItems="center" mb={2} sx={{ gap: 2 }}>
          <Box display="flex" alignItems="center" sx={{ border: '1px solid #ccc', borderRadius: '4px', padding: '4px 8px' }}>
            <InputAdornment position="start">
              <FilterListIcon />
            </InputAdornment>
            <Typography variant="subtitle1" sx={{ marginRight: 1 }}>
              Filter By
            </Typography>
            <ArrowDropDownIcon sx={{ marginRight: 1 }} />
          </Box>
          <Box display="flex" alignItems="center" sx={{ border: '1px solid #ccc', borderRadius: '4px', padding: '4px 8px' }}>
            <Typography variant="subtitle1" sx={{ marginRight: 1 }}>
              Date Created
            </Typography>
            <ArrowDropDownIcon sx={{ marginRight: 1 }} />
          </Box>
          <Button variant="outlined" color="secondary" sx={{ color: 'red', borderColor: '1px solid #ccc', borderRadius: '4px', padding: '4px 8px' }} startIcon={<ReplayIcon sx={{ color: 'red' }} />}>
            Reset Filter
          </Button>
        </Box>

        {/* Announcements Table */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Title</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Created By</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Tags</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Created On</TableCell> {/* New "Created On" column */}
                <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {initialAnnouncements.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item.createdBy}</TableCell>
                  <TableCell>
                    {item.tags.map((tag, tagIndex) => (
                      <Chip key={tagIndex} label={tag} variant="outlined" color="primary" sx={{ marginRight: 1 }} />
                    ))}
                  </TableCell>
                  <TableCell>{item.createdOn}</TableCell> {/* Display "Created On" data */}
                  <TableCell>
                    <Box display="flex" alignItems="center">
                      <EditIcon sx={{ cursor: "pointer", color: "primary.main", marginRight: 1 }} />
                      <DeleteIcon sx={{ cursor: "pointer", color: "error.main" }} />
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </PageContainer>
  );
};

export default AnnouncementsPage;