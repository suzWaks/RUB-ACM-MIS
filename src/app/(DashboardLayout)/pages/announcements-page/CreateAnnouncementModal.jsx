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
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Loading from "@/app/loading";

const CreateAnnouncementModal = ({ open, onClose, onAddAnnouncement }) => {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [description, setDescription] = useState("");
  const [createdBy, setCreatedBy] = useState("admin");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (title) {
      setLoading(true);
      if (loading) {
        return <Loading />
      }

      const newAnnouncement = {
        announcement_title: title,
        description,
        tags: tags.split(",").map((tag) => tag.trim()),
        created_by: "admin",
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
        <FormControl fullWidth>
          <InputLabel
          >
            Tags
          </InputLabel>
          <Select
            fullWidth
            label="Add Tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            variant="outlined"
            margin="normal"
            sx={{ borderRadius: "8px" }}
          >
            <MenuItem value="" disabled>Select a tag...</MenuItem>
            <MenuItem value="Event">Event</MenuItem>
            <MenuItem value="Meeting">Meeting</MenuItem>
          </Select>
        </FormControl>
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
        {/* <TextField
          fullWidth
          label="Created By"
          variant="outlined"
          margin="normal"
          value={createdBy}
          onChange={(e) => setCreatedBy(e.target.value)}
          sx={{ borderRadius: "8px" }}
        /> */}
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