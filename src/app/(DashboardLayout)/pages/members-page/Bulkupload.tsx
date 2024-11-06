import React, { useState, useRef } from 'react';
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
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTheme } from "@mui/material/styles";

const Bulkupload = () => {
  const theme = useTheme();
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [uploadingFiles, setUploadingFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
  const [completedUploads, setCompletedUploads] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null); // Create a reference for the file input

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
    setUploadingFiles((prevFiles) => prevFiles.filter((file) => file !== fileToRemove));
    setUploadedFiles((prevFiles) => prevFiles.filter((file) => file !== fileToRemove));
    setCompletedUploads((prev) => prev.filter((name) => name !== fileToRemove.name));
  };

  const simulateUploadProgress = (files: File[]) => {
    files.forEach((file) => {
      setUploadProgress((prevProgress) => ({ ...prevProgress, [file.name]: 0 }));
      const interval = setInterval(() => {
        setUploadProgress((prevProgress) => {
          const progress = Math.min((prevProgress[file.name] || 0) + 20, 100);
          if (progress === 100) {
            clearInterval(interval);
            setUploadingFiles((prevFiles) => prevFiles.filter((f) => f !== file));
            setUploadedFiles((prevFiles) => [...prevFiles, file]);
          }
          return { ...prevProgress, [file.name]: progress };
        });
      }, 500);
    });
  };

  const handleUploadFiles = async () => {
    if (uploadingFiles.length === 0) return; // No files to upload

    const formData = new FormData();
    uploadingFiles.forEach((file) => {
      formData.append('files[]', file); // Append each file to the FormData object
    });

    try {
      // Replace 'YOUR_SERVER_ENDPOINT' with your actual server endpoint URL
      const response = await fetch('YOUR_SERVER_ENDPOINT', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Files uploaded successfully:', data);

      // Reset uploaded files after upload
      setUploadedFiles((prev) => [...prev, ...uploadingFiles]);
      setUploadingFiles([]);
      setCompletedUploads(uploadingFiles.map(file => file.name));
      setUploadProgress({});
    } catch (error) {
      console.error('Error uploading files:', error);
      // Optionally handle error messages in the UI
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Trigger the file input click
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" p={4} sx={{ backgroundColor: '#f2f4ff', minHeight: '100vh' }}>
      <Typography variant="h5" mb={2} fontWeight="bold" color="primary" sx={{ color: '#7a5df1' }}>
        Upload
      </Typography>

      {/* Drag-and-Drop Upload Area */}
      <Paper
        elevation={3}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleFileDrop}
        sx={{
          padding: 4,
          width: '100%',
          maxWidth: 600,
          textAlign: 'center',
          borderRadius: 3,
          border: '2px dashed #d0d0e1',
          backgroundColor: '#fafbff',
        }}
      >
        <IconButton component="label" sx={{ color: '#7a5df1', fontSize: 60 }}>
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
          Drag & drop files or <span style={{ color: '#7a5df1', cursor: 'pointer' }} onClick={handleButtonClick}>Browse</span>
        </Typography>
        <Typography variant="caption" color="textSecondary">
          Supported format: .csv
        </Typography>
      </Paper>

      {/* Uploading Section */}
      {uploadingFiles.length > 0 && (
        <Box mt={3} sx={{ width: '100%', maxWidth: 600 }}>
          <Typography variant="subtitle1" color="textSecondary" mb={1} sx={{ color: '#7a5df1' }}>
            Bulk Uploading - {uploadingFiles.length}/{uploadedFiles.length + uploadingFiles.length} files
          </Typography>
          {uploadingFiles.map((file) => (
            <Box key={file.name} mb={2} display="flex" alignItems="center">
              <Typography sx={{ flex: 1 }}>{file.name}</Typography>
              <LinearProgress variant="determinate" value={uploadProgress[file.name] || 0} sx={{ flex: 1, color: '#7a5df1' }} />
              <IconButton onClick={() => handleRemoveFile(file)} sx={{ color: '#ff6b6b', ml: 1 }}>
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
        </Box>
      )}

      {/* Uploaded Section */}
      {uploadedFiles.length > 0 && (
        <Box mt={3} sx={{ width: '100%', maxWidth: 600 }}>
          <Typography variant="subtitle1" color="textSecondary" mb={1} sx={{ color: '#7a5df1' }}>
            Uploaded
          </Typography>
          <List>
            {uploadedFiles.map((file) => (
              <ListItem
                key={file.name}
                sx={{
                  border: '2px solid #4caf50',
                  borderRadius: '4px',
                  mb: 1,
                  backgroundColor: '#f6fff5',
                }}
              >
                <ListItemText
                  primary={file.name}
                  sx={{ color: completedUploads.includes(file.name) ? '#4caf50' : 'textPrimary' }}
                />
                <IconButton onClick={() => handleRemoveFile(file)} sx={{ color: '#ff6b6b' }}>
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
        </Box>
      )}

      {/* Upload files button */}
      <Button
        variant="contained"
        onClick={handleButtonClick} // Call the button click handler
        sx={{
          mt: 4,
          backgroundColor: '#7a5df1',
          color: '#fff',
          width: '100%',
          maxWidth: 600,
          paddingY: 1.5,
          borderRadius: 4,
          fontWeight: 'bold',
          '&:hover': {
            backgroundColor: '#6a4ddf',
          },
        }}
      >
        UPLOAD FILES
      </Button>
    </Box>
  );
};

export default Bulkupload;
