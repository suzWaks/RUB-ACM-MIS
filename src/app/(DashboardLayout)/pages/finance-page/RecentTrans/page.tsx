"use client";
import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { Box, Typography, Card, Button, IconButton } from "@mui/material";
import TransactionForm from "./TransactionForm";
import theme from "@/utils/theme";
import Modal from "@mui/material/Modal";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import Loading from "../../../loading";

interface TransactionData {
  id: number;
  amount: number;
  type: "Income" | "Expense";
  category: string;
  createdBy: string;
  createdOn: string;
  description: string;
}

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

const RecentTrans = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [rows, setRows] = useState<TransactionData[]>([]);
  const [errorType, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [transactionToEdit, setTranasctionToEdit] =
    useState<TransactionData | null>(null);
  const [transactionToDelete, setTransactionToDelete] =
    useState<TransactionData | null>(null);

  const fetchRowData = async () => {
    try {
      const response = await fetch("/api/financials/fetchall/");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      console.log(result);
      setRows(result);
    } catch (error) {
      console.log("Fetching Row Data Error: ", error);
      setError("Some error occured");
    }
  };

  // Triggered when the form submission is complete
  const handleRefresh = () => {
    setRefresh((prev) => !prev); // Toggle state to trigger useEffect
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchRowData();
      setLoading(false);
    };
    fetchData();
  }, [refresh]);

  if (loading) return <Loading />;

  const columns: GridColDef[] = [
    {
      field: "category",
      headerName: "Category",
      width: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "amount",
      headerName: "Amount in Nu.",
      width: 150,
      type: "number",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "type",
      headerName: "Type",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "description",
      headerName: "Description",
      width: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "createdBy",
      headerName: "Created By",
      width: 180,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "createdOn",
      headerName: "Created On",
      width: 150,
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

  // Define the handler functions outside the columns array
  const handleEdit = (rowData: any) => {
    console.log("Edit button clicked for:", rowData);
    // Add your logic for handling edit action

    const initialData = {
      id: rowData.id,
      amount: rowData.amount,
      type: rowData.type,
      category: rowData.category,
      description: rowData.description || "",
      createdBy: rowData.createdBy,
      createdOn: rowData.createdOn,
    };
    setTranasctionToEdit(initialData);
    setOpenDialog(true);
  };

  const handleDelete = async () => {
    if (transactionToDelete) {
      console.log("Deleteting this data: ", transactionToDelete.id);
      try {
        const response = await fetch(
          `/api/financials/${transactionToDelete.id}`,
          { method: "DELETE" }
        );
        console.log(response);
        if (!response.ok) {
          throw new Error("Failed to delete the transaction");
        } else {
          setRows((prevRows) =>
            prevRows.filter((row) => row.id !== transactionToDelete.id)
          );

          setOpen(false);
        }
      } catch (error) {
        console.error("Error deleting transaction:", error);
        alert("An error occurred while deleting the transaction.");
      }
    }
  };

  const openModal = (rowData: any) => {
    console.log("Delete button clicked for:", rowData);
    setTransactionToDelete(rowData);
    setOpen(true);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Proceed with Caution !!
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Deleting this transaction will permanently delete it from the
            database.
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 2,
        }}
      >
        <Typography
          variant="h3"
          fontWeight="bold"
          gutterBottom
          sx={{ color: theme.palette.primary.main }}
        >
          All Transactions
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setTranasctionToEdit(null);
            setOpenDialog(true);
          }}
          sx={{}}
        >
          Add Transaction
        </Button>
      </Box>

      <Card sx={{ p: 2 }}>
        <div style={{ height: 600, width: "100%" }}>
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
                  pageSize: 8,
                },
              },
            }}
            pageSizeOptions={[5]}
            checkboxSelection
            disableDensitySelector
            disableColumnSelector
          />
        </div>
      </Card>
      {openDialog && (
        <TransactionForm
          onClose={() => {
            setOpenDialog(false);
          }}
          onSubmit={handleRefresh}
          initialData={transactionToEdit}
        />
      )}
    </Box>
  );
};

export default RecentTrans;
