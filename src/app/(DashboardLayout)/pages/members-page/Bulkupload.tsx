import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  IconButton,
  List,
  ListItem,
  ListItemText,
  LinearProgress,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTheme } from "@mui/material/styles";

interface BulkuploadProps {
  onClose: () => void; // The type of onClose should be a function that takes no arguments and returns void
  handleRefresh: () => void;
}

const Bulkupload: React.FC<BulkuploadProps> = ({ onClose, handleRefresh }) => {
  const theme = useTheme();
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [uploadingFiles, setUploadingFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState<{
    [key: string]: number;
  }>({});
  const [completedUploads, setCompletedUploads] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null); // Create a reference for the file input
  const [statusMessage, setStatusMessage] = useState("");

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploadingFiles((prevFiles) => [...prevFiles, ...files]);
    simulateUploadProgress(files);
  };

  const handleFileDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    setUploadingFiles((prevFiles) => [...prevFiles, ...files]);
    simulateUploadProgress(files);
  };

  const handleRemoveFile = (fileToRemove: File) => {
    setUploadingFiles((prevFiles) =>
      prevFiles.filter((file) => file !== fileToRemove)
    );
    setUploadedFiles((prevFiles) =>
      prevFiles.filter((file) => file !== fileToRemove)
    );
    setCompletedUploads((prev) =>
      prev.filter((name) => name !== fileToRemove.name)
    );
  };

  const uploadFile = async () => {
    if (uploadedFiles.length === 0) {
      console.log(uploadedFiles.length);
      return;
    }

    const formData = new FormData();
    formData.append("files", uploadedFiles[0]);

    try {
      const response = await fetch("/api/members/bulkupload/new/", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      if (response.ok) {
        setStatusMessage(result.message || "File uploaded successfully.");
        console.log("Uploaded Successfully");
        handleRefresh();
        alert("Uploaded Successfully");
        onClose();
      } else {
        setStatusMessage(result.message || "File upload failed.");
        alert("File upload failed.");
        console.log("File Upload Failed");
      }
    } catch (error) {
      setStatusMessage("An error occurred while uploading the file.");
      console.log("An error occurred while uploading the file.");
      alert("File upload failed.");
    }
  };

  // For Debugging Purposes
  useEffect(() => {
    console.log("Uploaded files: ", uploadedFiles);
    console.log("Uploading files: ", uploadingFiles);
    console.log("Completed Uploads ", completedUploads);
  }, [uploadedFiles]); // This will trigger when uploadedFiles changes

  const simulateUploadProgress = (files: File[]) => {
    files.forEach((file) => {
      setUploadProgress((prevProgress) => ({
        ...prevProgress,
        [file.name]: 0,
      }));
      const interval = setInterval(() => {
        setUploadProgress((prevProgress) => {
          const progress = Math.min((prevProgress[file.name] || 0) + 20, 100);
          if (progress === 100) {
            clearInterval(interval);
            setUploadingFiles((prevFiles) =>
              prevFiles.filter((f) => f !== file)
            );
            // Move the file to the uploadedFiles array only when upload is completed
            setUploadedFiles((prevFiles) => [...prevFiles, file]);
            setCompletedUploads((prev) => [...prev, file.name]);
          }
          return { ...prevProgress, [file.name]: progress };
        });
      }, 500);
    });
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Trigger the file input click
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      p={4}
      sx={{ backgroundColor: "#f2f4ff", minHeight: "100" }}
    >
      <Typography
        variant="h5"
        mb={2}
        fontWeight="bold"
        color="primary"
        sx={{ color: "#7a5df1" }}
      >
        Upload
      </Typography>

      {/* Drag-and-Drop Upload Area */}
      <Paper
        elevation={3}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleFileDrop}
        sx={{
          padding: 4,
          width: "100%",
          maxWidth: 600,
          textAlign: "center",
          borderRadius: 3,
          border: "2px dashed #d0d0e1",
          backgroundColor: "#fafbff",
        }}
      >
        <IconButton component="label" sx={{ color: "#7a5df1", fontSize: 60 }}>
          <CloudUploadIcon fontSize="large" />
          <input
            type="file"
            hidden
            multiple
            onChange={handleFileUpload}
            accept=".csv"
            ref={fileInputRef} // Attach the ref to the file input
          />
        </IconButton>
        <Typography variant="body1" color="textPrimary" mt={1}>
          Drag & drop files or{" "}
          <span
            style={{ color: "#7a5df1", cursor: "pointer" }}
            onClick={handleButtonClick}
          >
            Browse
          </span>
        </Typography>
        <Typography variant="caption" color="textSecondary">
          Supported format: .csv
        </Typography>
      </Paper>

      {/* Uploading Section My Code*/}
      {uploadingFiles.length > 0 && (
        <Box mt={3} sx={{ width: "100%", maxWidth: 600 }}>
          <Typography
            variant="subtitle1"
            color="textSecondary"
            mb={1}
            sx={{ color: "#7a5df1" }}
          >
            Bulk Uploading - {uploadingFiles.length}/
            {uploadedFiles.length + uploadingFiles.length} files
          </Typography>
          {uploadingFiles.map((file) => (
            <Box key={file.name} mb={2} display="flex" alignItems="center">
              <Typography sx={{ flex: 1 }}>{file.name}</Typography>
              <LinearProgress
                variant="determinate"
                value={uploadProgress[file.name] || 0}
                sx={{ flex: 1, color: "#7a5df1" }}
              />
              <IconButton
                onClick={() => handleRemoveFile(file)}
                sx={{ color: "#ff6b6b", ml: 1 }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
        </Box>
      )}

      {/* Uploaded Section */}

      {uploadedFiles.length > 0 && (
        <Box mt={3} sx={{ width: "100%", maxWidth: 600 }}>
          <Typography
            variant="subtitle1"
            color="textSecondary"
            mb={1}
            sx={{ color: "#7a5df1" }}
          >
            Uploaded
          </Typography>
          <List>
            {/* Render only the first file */}
            <ListItem
              key={`${uploadedFiles[0].name}-0`}
              sx={{
                border: "2px solid #4caf50",
                borderRadius: "4px",
                mb: 1,
                backgroundColor: "#f6fff5",
              }}
            >
              <ListItemText
                primary={uploadedFiles[0].name}
                sx={{
                  color: completedUploads.includes(uploadedFiles[0].name)
                    ? "#4caf50"
                    : "textPrimary",
                }}
              />
              <IconButton
                onClick={() => handleRemoveFile(uploadedFiles[0])}
                sx={{ color: "#ff6b6b" }}
              >
                <DeleteIcon />
              </IconButton>
            </ListItem>
          </List>
        </Box>
      )}

      {/* Upload files button */}
      <Button
        variant="contained"
        onClick={uploadFile} // Call the button click handler
        sx={{
          mt: 4,
          backgroundColor: "#7a5df1",
          color: "#fff",
          width: "100%",
          maxWidth: 600,
          paddingY: 1.5,
          borderRadius: 4,
          fontWeight: "bold",
          "&:hover": {
            backgroundColor: "#6a4ddf",
          },
        }}
      >
        UPLOAD FILES
      </Button>
    </Box>
  );
};

export default Bulkupload;
