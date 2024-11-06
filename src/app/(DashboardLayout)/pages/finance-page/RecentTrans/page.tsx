"use client";
import React, { useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Typography, Card, Button, useTheme } from "@mui/material";
import TransactionForm from "./TransactionForm";
import theme from "@/utils/theme";

interface TransactionData {
  id: number;
  amount: number;
  type: "Income" | "Expense";
  description: string;
  items: string[];
  event?: string;
}

const RecentTrans = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [rows, setRows] = useState<TransactionData[]>([
    {
      id: 1,
      amount: 500,
      type: "Income",
      description: "Membership fees",
      items: ["Item1", "Item2"],
      event: "Membership Event",
    },
    {
      id: 2,
      amount: 300,
      type: "Expense",
      description: "Event catering",
      items: ["Food", "Drinks"],
      event: "Annual Gathering",
    },
    {
      id: 3,
      amount: 750,
      type: "Income",
      description: "Donation",
      items: ["Sponsorship"],
      event: "Charity Fundraiser",
    },
  ]);

  const theme = useTheme();

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 80, type: "number" },
    { field: "amount", headerName: "Amount (Nu.)", width: 140, type: "number" },
    { field: "type", headerName: "Type", width: 120 },
    { field: "description", headerName: "Description", width: 260 },
    {
      field: "items",
      headerName: "Items",
      width: 180,
      renderCell: (params) => params.value.join(", "),
    },
    { field: "event", headerName: "Event", width: 180 },
  ];

  const handleAddTransaction = (transactionData: TransactionData) => {
    console.log("New transaction added:", transactionData);
    setRows((prevRows) => [
      ...prevRows,
      { ...transactionData, id: prevRows.length + 1 },
    ]);
    setOpenDialog(false);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography
        variant="h3"
        fontWeight="bold"
        gutterBottom
        sx={{ color: theme.palette.secondary.main }}
      >
        Add Transaction
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpenDialog(true)}
        sx={{ mb: 4 }}
      >
        Add Transaction
      </Button>
      <Card
        sx={{
          p: 2,
          borderRadius: "16px",
          boxShadow: theme.shadows[4],
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <div style={{ height: 600, width: "100%" }}>
          <DataGrid rows={rows} columns={columns} />
        </div>
      </Card>
      {openDialog && (
        <TransactionForm
          onClose={() => setOpenDialog(false)}
          onSubmit={handleAddTransaction}
        />
      )}
    </Box>
  );
};

export default RecentTrans;
