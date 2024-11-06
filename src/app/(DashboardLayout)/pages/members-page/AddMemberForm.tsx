import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  MenuItem,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

interface Member {
  name: string;
  studentNo: string;
  department: string;
  email: string;
  year: string;
  gender?: "Male" | "Female" | "Others";
}

interface AddMemberFormProps {
  onAddMember: (newMember: Member) => void;
  onClose: () => void; // Add a prop for closing the dialog
}

const AddMemberForm: React.FC<AddMemberFormProps> = ({ onAddMember, onClose }) => {
  const theme = useTheme();

  const [name, setName] = useState("");
  const [studentNo, setStudentNo] = useState("");
  const [department, setDepartment] = useState("");
  const [email, setEmail] = useState("");
  const [year, setYear] = useState("");
  const [gender, setGender] = useState<"Male" | "Female" | "Others" | "">("");

  const departments = ["Information Technology", "Geology", "Civil", "Electrical"];
  const years = ["1", "2", "3", "4"];

  const handleSubmit = () => {
    const newMember: Member = {
      name,
      studentNo,
      department,
      email,
      year,
      gender: gender || undefined, // Assign gender if provided
    };
    onAddMember(newMember);
    resetForm();
  };

  const resetForm = () => {
    setName("");
    setStudentNo("");
    setDepartment("");
    setEmail("");
    setYear("");
    setGender("");
  };

  return (
    <Dialog open={true} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle
        sx={{
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.common.white,
          textAlign: "center",
          fontWeight: "bold",
          padding: "16px 24px",
        }}
      >
        Member Registration
      </DialogTitle>
      <DialogContent
        sx={{
          backgroundColor: "#f8f9fa",
          padding: "24px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: "0 0 8px 8px",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: theme.palette.primary.main,
            marginBottom: 3,
            fontWeight: "600",
          }}
        >
          {/* Add any additional text here if needed */}
        </Typography>
        <TextField
          autoFocus
          margin="dense"
          label="Name"
          type="text"
          fullWidth
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{
            mb: 2,
            backgroundColor: "white",
            borderRadius: "4px",
          }}
        />
        <TextField
          margin="dense"
          label="Student No"
          type="text"
          fullWidth
          variant="outlined"
          value={studentNo}
          onChange={(e) => setStudentNo(e.target.value)}
          sx={{
            mb: 2,
            backgroundColor: "white",
            borderRadius: "4px",
          }}
        />
        <TextField
          margin="dense"
          label="Department"
          select
          fullWidth
          variant="outlined"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          sx={{
            mb: 2,
            backgroundColor: "white",
            borderRadius: "4px",
          }}
        >
          {departments.map((dept) => (
            <MenuItem key={dept} value={dept}>
              {dept}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          margin="dense"
          label="Email"
          type="email"
          fullWidth
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{
            mb: 2,
            backgroundColor: "white",
            borderRadius: "4px",
          }}
        />
        <TextField
          margin="dense"
          label="Year"
          select
          fullWidth
          variant="outlined"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          sx={{
            mb: 2,
            backgroundColor: "white",
            borderRadius: "4px",
          }}
        >
          {years.map((yr) => (
            <MenuItem key={yr} value={yr}>
              {yr}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          margin="dense"
          label="Gender"
          select
          fullWidth
          variant="outlined"
          value={gender}
          onChange={(e) => setGender(e.target.value as "Male" | "Female" | "Others" | "")}
          sx={{
            mb: 2,
            backgroundColor: "white",
            borderRadius: "4px",
          }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="Male">Male</MenuItem>
          <MenuItem value="Female">Female</MenuItem>
          <MenuItem value="Others">Others</MenuItem>
        </TextField>
      </DialogContent>
      <DialogActions
        sx={{
          backgroundColor: "#f1f1f1",
          justifyContent: "center",
          padding: "16px",
        }}
      >
        <Button
          onClick={() => {
            resetForm();
            onClose(); // Close the dialog when cancel is clicked
          }}
          variant="outlined"
          sx={{
            borderColor: theme.palette.primary.main,
            color: theme.palette.primary.main,
            marginRight: "8px",
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.common.white,
          }}
        >
          Add Member
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddMemberForm;
