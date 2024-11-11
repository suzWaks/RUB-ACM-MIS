import React, { useEffect, useState } from "react";
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
  std_id: string;
  department: string;
  email: string;
  year: string;
  gender?: "Male" | "Female" | "Others";
  contact_number: string;
  designation: string;
  _id?: string;
}

interface AddMemberFormProps {
  onAddMember: (newMember: Member) => void;
  onClose: () => void; // Add a prop for closing the dialog
  member?: Member;
  onEditMember: () => void;
}

const AddMemberForm: React.FC<AddMemberFormProps> = ({
  onAddMember,
  onClose,
  member,
  onEditMember,
}) => {
  const theme = useTheme();

  const [_id, setMemberID] = useState(member?._id || "");
  const [name, setName] = useState(member?.name || "");
  const [std_id, setStudentNo] = useState(member?.std_id || "");
  const [department, setDepartment] = useState(member?.department || "");
  const [email, setEmail] = useState(member?.email || "");
  const [year, setYear] = useState(member?.year || "");
  const [gender, setGender] = useState<"Male" | "Female" | "Others" | "">(
    member?.gender || ""
  );
  const [contact_number, setContactNumber] = useState(
    member?.contact_number || ""
  );
  const [designation, setDesignation] = useState(member?.designation || "");

  const departments = [
    "Information Technology",
    "Geology",
    "Civil",
    "Electrical",
    "Electronic and Communication",
    "Water",
    "Mechanical",
    "Instrumentation and Control",
    "Architecture",
    "Software",
  ];

  const years = ["1", "2", "3", "4"];

  /**For adding new members */

  const validateForm = () => {
    if (
      !name ||
      !std_id ||
      !department ||
      !email ||
      !year ||
      !contact_number ||
      !designation
    ) {
      return false;
    }
    return true;
  };

  const getMember = () => {
    const newMember: Member = {
      name,
      std_id,
      department,
      email,
      contact_number,
      designation,
      year,
      gender: gender || undefined, // Assign gender if provided
      _id,
    };
    return newMember;
  };

  const handleSubmit = async () => {
    // Check if any required field is empty
    if (!validateForm()) {
      console.log("Please fill in all required fields."); // Log a message for incomplete form
      alert("Please fill in all required fields.");
      return; // Exit the function if any field is empty
    }
    const newMember: Member = getMember();

    // Log the member info to the console
    console.log("Adding new member:", newMember);

    try {
      const response = await fetch("/api/members/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMember),
      });
      if (!response.ok) {
        throw new Error("Failed to submit transaction data");
      }
      const responseData = await response.json();
      console.log("Member Added successfully:", responseData);
      onEditMember();
      resetForm();
      onClose();
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to add member. Please try again.");
    }
  };

  const handleEdit = async () => {
    console.log("Handle Edit");
    // Check if any required field is empty
    if (!validateForm()) {
      console.log("Please fill in all required fields."); // Log a message for incomplete form
      alert("Please fill in all required fields.");
      return; // Exit the function if any field is empty
    }
    const editMember: Member = getMember();
    const id = editMember._id;
    console.log("The id is: ", editMember._id);
    try {
      const response = await fetch(`/api/members/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editMember),
      });
      if (!response.ok) {
        throw new Error("Failed to submit transaction data");
      }
      const responseData = await response.json();
      console.log("Member Edited successfully:", responseData);
      resetForm();
      onEditMember();
      onClose();
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to edit member. Please try again.");
    }
  };

  // useEffect(() => {
  //   console.log("Current member:", member);
  // }, [member]);

  {
    /*Reseting the form */
  }
  const resetForm = () => {
    setName("");
    setStudentNo("");
    setDepartment("");
    setEmail("");
    setYear("");
    setGender("");
    setContactNumber("");
    setDesignation("");
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
          value={std_id}
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
          onChange={(e) =>
            setGender(e.target.value as "Male" | "Female" | "Others" | "")
          }
          sx={{
            mb: 2,
            backgroundColor: "white",
            borderRadius: "4px",
          }}
        >
          <MenuItem value="Male">Male</MenuItem>
          <MenuItem value="Female">Female</MenuItem>
          <MenuItem value="Others">Others</MenuItem>
        </TextField>
        <TextField
          margin="dense"
          label="Contact Number"
          fullWidth
          variant="outlined"
          value={contact_number}
          onChange={(e) => setContactNumber(e.target.value)}
          sx={{
            mb: 2,
            backgroundColor: "white",
            borderRadius: "4px",
          }}
        />
        <TextField
          margin="dense"
          label="Designation"
          select
          fullWidth
          variant="outlined"
          value={designation}
          onChange={(e) =>
            setDesignation(
              e.target.value as
                | "Chairmen"
                | "Vice Chairmen"
                | "Treasurer"
                | "Member"
            )
          }
          sx={{
            mb: 2,
            backgroundColor: "white",
            borderRadius: "4px",
          }}
        >
          <MenuItem value="Chairmen">Chairmen</MenuItem>
          <MenuItem value="Vice Chairmen">Vice Chairmen</MenuItem>
          <MenuItem value="Treasurer">Treasurer</MenuItem>
          <MenuItem value="Member">Member</MenuItem>
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
        {member ? (
          <Button
            onClick={handleEdit}
            variant="contained"
            sx={{
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.common.white,
            }}
          >
            Update Member
          </Button>
        ) : (
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
        )}
      </DialogActions>
    </Dialog>
  );
};

export default AddMemberForm;
