import React, { useState, useRef } from "react";
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

interface Member {
  name: string;
  studentNo: string;
  department: string;
  email: string;
  year: string;
  gender?: "Male" | "Female" | "Others";
}

interface BulkuploadProps {
  onUploadComplete: (newMembers: Member[]) => void; // Callback to pass data to MembersPage
}

const Bulkupload: React.FC<BulkuploadProps> = ({ onUploadComplete }) => {
  const theme = useTheme();
  const [uploadedFiles, setUploadedFiles] = useState<File | null>(null); // Single uploaded file
  const [uploadingFiles, setUploadingFiles] = useState<File[]>([]); // Files being uploaded
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
  const [completedUploads, setCompletedUploads] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length > 0 && files[0].type === "text/csv") {
      setUploadingFiles([files[0]]);
      simulateUploadProgress([files[0]]);
    }
  };

  const handleFileDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    if (files.length > 0 && files[0].type === "text/csv") {
      setUploadingFiles([files[0]]);
      simulateUploadProgress([files[0]]);
    }
  };

  const handleRemoveFile = () => {
    setUploadingFiles([]);
    setUploadedFiles(null);
    setCompletedUploads([]);
  };

  const simulateUploadProgress = (files: File[]) => {
    files.forEach((file) => {
      setUploadProgress((prevProgress) => ({ ...prevProgress, [file.name]: 0 }));
      const interval = setInterval(() => {
        setUploadProgress((prevProgress) => {
          const progress = Math.min((prevProgress[file.name] || 0) + 20, 100);
          if (progress === 100) {
            clearInterval(interval);
            setUploadingFiles([]);
            setUploadedFiles(file); // Set the single uploaded file
          }
          return { ...prevProgress, [file.name]: progress };
        });
      }, 500);
    });
  };

  const handleUploadFiles = async () => {
    if (uploadingFiles.length === 0) return;

    const formData = new FormData();
    formData.append("file", uploadingFiles[0]); // Append single file

    try {
      const response = await fetch("YOUR_SERVER_ENDPOINT", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("File uploaded successfully:", data);

      setUploadedFiles(uploadingFiles[0]);
      setUploadingFiles([]);
      setCompletedUploads([uploadingFiles[0].name]);
      setUploadProgress({});
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleDone = async () => {
    if (uploadedFiles) {
      // Here you need to parse the CSV file and map it to the Member format
      const newMembers = await parseCSV(uploadedFiles); // Wait for CSV parsing to finish
      onUploadComplete(newMembers); // Pass the data to MembersPage
    }
  };

  const parseCSV = (file: File): Promise<Member[]> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      const members: Member[] = [];

      reader.onload = () => {
        const text = reader.result as string;
        const lines = text.split("\n");

        // Skip header row (optional)
        for (let i = 1; i < lines.length; i++) {
          const [name, studentNo, department, email, year, gender] = lines[i].split(",");
          members.push({
            name,
            studentNo,
            department,
            email,
            year,
            gender: gender as "Male" | "Female" | "Others",
          });
        }

        resolve(members); // Resolve the Promise with the parsed members
      };

      reader.onerror = (error) => {
        reject(error); // Reject the Promise if there is an error
      };

      reader.readAsText(file); // Start reading the file
    });
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" p={4} sx={{ backgroundColor: "#f2f4ff", minHeight: "100vh" }}>
      <Typography variant="h5" mb={2} fontWeight="bold" color="primary" sx={{ color: "#7a5df1" }}>
        Upload
      </Typography>

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
          <input type="file" hidden onChange={handleFileUpload} accept=".csv" ref={fileInputRef} />
        </IconButton>
        <Typography variant="body1" color="textPrimary" mt={1}>
          Drag & drop a CSV file or{" "}
          <span style={{ color: "#7a5df1", cursor: "pointer" }} onClick={handleButtonClick}>
            Browse
          </span>
        </Typography>
        <Typography variant="caption" color="textSecondary">
          Supported format: .csv
        </Typography>
      </Paper>

      {uploadingFiles.length > 0 && (
        <Box mt={3} sx={{ width: "100%", maxWidth: 600 }}>
          <Typography variant="subtitle1" color="textSecondary" mb={1} sx={{ color: "#7a5df1" }}>
            Uploading - 1 file
          </Typography>
          {uploadingFiles.map((file) => (
            <Box key={file.name} mb={2} display="flex" alignItems="center">
              <Typography sx={{ flex: 1 }}>{file.name}</Typography>
              <LinearProgress variant="determinate" value={uploadProgress[file.name] || 0} sx={{ flex: 1, color: "#7a5df1" }} />
              <IconButton onClick={handleRemoveFile} sx={{ color: "#ff6b6b", ml: 1 }}>
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
        </Box>
      )}

      {uploadedFiles && (
        <Box mt={3} sx={{ width: "100%", maxWidth: 600 }}>
          <Typography variant="subtitle1" color="textSecondary" mb={1} sx={{ color: "#7a5df1" }}>
            Uploaded
          </Typography>
          <List>
            <ListItem
              key={uploadedFiles.name}
              sx={{
                border: "2px solid #4caf50",
                borderRadius: "4px",
                mb: 1,
                backgroundColor: "#f6fff5",
              }}
            >
              <ListItemText
                primary={uploadedFiles.name}
                sx={{ color: completedUploads.includes(uploadedFiles.name) ? "#4caf50" : "textPrimary" }}
              />
              <IconButton onClick={handleRemoveFile} sx={{ color: "#ff6b6b" }}>
                <DeleteIcon />
              </IconButton>
            </ListItem>
          </List>
        </Box>
      )}

      <Button
        variant="contained"
        onClick={handleButtonClick}
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
        UPLOAD FILE
      </Button>

      {uploadedFiles && (
        <Button
          variant="contained"
          color="secondary"
          onClick={handleDone}
          sx={{
            mt: 2,
            width: "100%",
            maxWidth: 600,
            paddingY: 1.5,
            borderRadius: 4,
            fontWeight: "bold",
            backgroundColor: "#4caf50",
            "&:hover": {
              backgroundColor: "#45a049",
            },
          }}
        >
          DONE
        </Button>
      )}
    </Box>
  );
};

export default Bulkupload;
