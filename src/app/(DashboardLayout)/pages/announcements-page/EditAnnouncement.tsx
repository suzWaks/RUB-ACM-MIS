import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Chip,
  Box,
} from "@mui/material";

interface EditAnnouncementModalProps {
  open: boolean;
  onClose: () => void;
  announcement: any | null;
  onUpdateAnnouncement: () => void;
}

const EditAnnouncementModal: React.FC<EditAnnouncementModalProps> = ({
  open,
  onClose,
  announcement,
  onUpdateAnnouncement,
}) => {
  const [formData, setFormData] = useState<any>({
    announcement_title: "",
    description: "",
    tags: [],
  });

  useEffect(() => {
    if (announcement) {
      setFormData({
        announcement_title: announcement.announcement_title,
        description: announcement.description || "",
        tags: announcement.tags || [],
      });
    }
  }, [announcement]);

  const handleTagChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTags = event.target.value.split(",").map((tag) => tag.trim());
    setFormData((prevData: any) => ({ ...prevData, tags: newTags }));
  };

  const handleSubmit = async () => {
    // Check if announcement ID is available
    if (!announcement?._id) {
      console.error("Announcement ID is missing");
      return; // Prevent submission if ID is missing
    }

    // Preserve the created_by field
    const updatedData = {
      ...formData,
      created_by: announcement.created_by, // Preserve the 'created_by' field
    };

    try {
      const response = await fetch(
        `/api/announcements?id=${announcement._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (response.ok) {
        onUpdateAnnouncement(); // Refresh the announcements list
        onClose();
      } else {
        console.error("Failed to update announcement");
      }
    } catch (error) {
      console.error("Error updating announcement:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Announcement</DialogTitle>
      <DialogContent>
        <TextField
          label="Title"
          fullWidth
          value={formData.announcement_title}
          onChange={(e) =>
            setFormData({ ...formData, announcement_title: e.target.value })
          }
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Description"
          fullWidth
          multiline
          rows={4}
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Tags"
          fullWidth
          value={formData.tags.join(", ")}
          onChange={handleTagChange}
          sx={{ marginBottom: 2 }}
        />
        <Box display="flex" flexWrap="wrap" gap={1}>
          {formData.tags.map((tag: string, index: number) => (
            <Chip key={index} label={tag} variant="outlined" color="primary" />
          ))}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditAnnouncementModal;
