"use client";

import { Box, Button, IconButton, Modal, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import theme from "@/utils/theme";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import EditForm from "./editAttendanceForm";

interface AttendanceData {
  id: number;
  stdID: string;
  name: string;
  status: string;
  date: string;
  event_name: string;
}

//Style of Modal
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "8px",
};

const AttendanceTable = () => {
  const [rows, setRows] = useState<AttendanceData[]>([]);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [attendanceToDelete, setAttendanceToDelete] =
    useState<AttendanceData | null>(null);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [attendanceRecordToEdit, setAttendanceRecordToEdit] =
    useState<AttendanceData | null>(null);

  const handleRefresh = () => {
    setRefresh((prev) => !prev); // Toggle state to trigger useEffect
  };

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const fetchRowData = async () => {
    try {
      const response = await fetch("/api/attendance/fetchAllAttendance");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      console.log(result);
      setRows(result);
    } catch (error) {
      console.log("Fetching Row Data Error: ", error);
    }
  };

  const openModal = (rowData: any) => {
    console.log("Delete button clicked for:", rowData);
    setAttendanceToDelete(rowData);
    setOpen(true);
  };

  const handleDelete = async () => {
    if (attendanceToDelete) {
      console.log("Deleteting this data: ", attendanceToDelete.id);
      try {
        const response = await fetch(
          `/api/attendance/${attendanceToDelete.id}`,
          { method: "DELETE" }
        );
        console.log(response);
        if (!response.ok) {
          throw new Error("Failed to delete the attendance record");
        } else {
          setRows((prevRows) =>
            prevRows.filter((row) => row.id !== attendanceToDelete.id)
          );

          setOpen(false);
        }
      } catch (error) {
        console.error("Error deleting transaction:", error);
        alert("An error occurred while deleting the transaction.");
      }
    }
  };

  const handleEdit = (rowData: any) => {
    console.log("Edit button clicked for:", rowData);
    const initialData = {
      id: rowData.id,
      stdID: rowData.stdID,
      name: rowData.name,
      status: rowData.status,
      date: rowData.date,
      event_name: rowData.event_name,
    };
    // Add your logic for handling edit action
    setAttendanceRecordToEdit(initialData);
    setOpenEditForm(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchRowData();
      setLoading(false);
    };
    fetchData();
  }, [refresh]);

  const columns: GridColDef[] = [
    {
      field: "stdID",
      headerName: "Student Number",
      width: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "name",
      headerName: "Student Name",
      width: 150,
      type: "number",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "date",
      headerName: "Date",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "event_name",
      headerName: "Event",
      width: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "status",
      headerName: "Status",
      width: 180,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "Action",
      headerName: "Action",
      width: 150,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <>
          <IconButton
            color="primary"
            onClick={() => handleEdit(params.row)}
            aria-label="edit"
          >
            <EditIcon sx={{ color: theme.palette.secondary.main }} />
          </IconButton>
          <IconButton
            color="secondary"
            onClick={() => openModal(params.row)}
            aria-label="delete"
          >
            <DeleteIcon sx={{ color: theme.palette.error.main }} />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure?
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Attendance record will be permanently deleted
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
            <Button variant="text" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="text" color="error" onClick={handleDelete}>
              Confirm
            </Button>
          </Box>
        </Box>
      </Modal>
      <DataGrid
        sx={{
          "& .MuiDataGrid-columnHeaderTitle": {
            fontWeight: "bold", // Make text bold
            fontSize: "12px", // Make text larger
          },
        }}
        rows={rows}
        columns={columns}
        slots={{
          toolbar: GridToolbar,
        }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 1 },
          },
        }}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10]}
        checkboxSelection
        disableDensitySelector
        disableColumnSelector
      />
      {openEditForm && (
        <EditForm
          onClose={() => {
            setOpenEditForm(false);
          }}
          onSubmit={handleRefresh}
          initialData={attendanceRecordToEdit}
        />
      )}
    </Box>
  );
};

export default AttendanceTable;
