import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const CreateAnnouncementModal = ({ open, onClose, onAddAnnouncement }) => {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [description, setDescription] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (title && createdBy) {
      setLoading(true);

      const newAnnouncement = {
        announcement_title: title,
        description,
        tags: tags.split(",").map((tag) => tag.trim()),
        created_by: createdBy,
      };

      try {
        const response = await fetch(`/api/announcements`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newAnnouncement),
        });

        if (response.ok) {
          const data = await response.json();
          onAddAnnouncement(data);
          onClose();
          setTitle("");
          setTags("");
          setDescription("");
          setCreatedBy("");
        } else {
          console.error("Failed to add announcement:", response.statusText);
        }
      } catch (error) {
        console.error("Error adding announcement:", error);
      } finally {
        setLoading(false);
      }
  const [time, setTime] = useState(""); // New state for time input

  // Handle submission of the form
  const handleSubmit = () => {
    if (title) {
      const newAnnouncement = {
        title,
        tags: tags.split(",").map(tag => tag.trim()), // Split tags by comma
        description,
        time, // Include the time field in the announcement
      };
      onAddAnnouncement(newAnnouncement); // Call the prop function to add the announcement
      onClose(); // Close the modal
      // Clear inputs
      setTitle("");
      setTags("");
      setDescription("");
      setTime(""); // Clear time input
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" sx={{ color: "primary.main", fontWeight: "600", fontSize: "1.125rem" }}>
            Create an Announcement
          </Typography>
          <IconButton onClick={onClose} sx={{ color: "error.main" }}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Enter Title"
          variant="outlined"
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ borderRadius: "8px" }}
        />
        <TextField
          fullWidth
          label="Add Tags"
          variant="outlined"
          margin="normal"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          sx={{ borderRadius: "8px" }}
        />
        <TextField
          fullWidth
          label="Enter Description"
          variant="outlined"
          margin="normal"
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          sx={{ borderRadius: "8px" }}
        />
        <TextField
          fullWidth
          label="Enter Time" // New field for time
          variant="outlined"
          margin="normal"

          value={createdBy}
          onChange={(e) => setCreatedBy(e.target.value)}

          value={time}
          onChange={(e) => setTime(e.target.value)} // Update state on change

          sx={{ borderRadius: "8px" }}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={loading}
          sx={{
            backgroundColor: "secondary_teal.main",
            color: "#fff",
            fontSize: "0.875rem",
            textTransform: "none",
          }}
        >
          {loading ? "Adding..." : "Add Announcement"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateAnnouncementModal;
