"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  IconButton,
  Grid,
  InputAdornment,
  Select,
  MenuItem,
  OutlinedInput,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CategoryIcon from "@mui/icons-material/Category";
import DescriptionIcon from "@mui/icons-material/Description";
import ShopIcon from "@mui/icons-material/Shop";
import { Session, User } from "next-auth";

interface TransactionFormProps {
  onClose: () => void;
  onSubmit: (transactionData: any) => void;
  initialData?: {
    id: number;
    amount: number;
    type: "Income" | "Expense";
    category: string;
    createdBy: string;
    createdOn: string;
    description: string;
  } | null;
}

const TransactionForm: React.FC<TransactionFormProps> = ({
  onClose,
  onSubmit,
  initialData,
}) => {
  const [amount, setAmount] = useState(initialData?.amount || "");
  const [type, setType] = useState(initialData?.type || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [category, setCategory] = useState(initialData?.category || "");

  const theme = useTheme();

  const { data: session } = useSession();
  const { email, id, role } = session?.user as {
    email: string;
    id: string;
    role: string;
  };

  const incomeCategories = [
    "Event",
    "Lottery Sales",
    "Donations",
    "ITS Service",
    "Miscellaneous Income",
  ];

  const expenseCategories = ["Event", "Supplies", "Miscellaneous Expense"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !type || !category) {
      alert("Please fill out all required fields.");
      return;
    }
    const transactionData = {
      amount: parseFloat(String(amount)) || 0,
      type,
      category,
      description,
      userId: id,
    };
    try {
      const method = initialData ? "PATCH" : "POST";
      const url = initialData
        ? `/api/financials/${initialData.id}`
        : `/api/financials/`;
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transactionData),
      });
      if (!response.ok) {
        throw new Error("Failed to submit transaction data");
      }

      const responseData = await response.json();
      console.log("Transaction processed successfully:", responseData);

      // Handle success
      onSubmit(transactionData);
      onClose();
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to submit transaction data. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        backdropFilter: "blur(10px)",
        zIndex: 9999,
      }}
    >
      <Card
        sx={{
          width: "60%",
          maxHeight: "70%",
          position: "relative",
          boxShadow: "0px 0px 12px rgba(0, 0, 0, 0.2)",
          borderRadius: "15px",
          backgroundColor: "white",
          overflow: "hidden",
        }}
      >
        <CardContent>
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{ position: "absolute", top: 10, right: 10 }}
          >
            <CloseIcon />
          </IconButton>
          <Typography
            variant="h5"
            fontWeight="bold"
            gutterBottom
            sx={{ color: theme.palette.primary.main }}
          >
            Add Transaction
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="outlined"
                label="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                type="number"
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AttachMoneyIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Select
                fullWidth
                value={type}
                onChange={(e) => {
                  setType(e.target.value);
                  setCategory("");
                }}
                displayEmpty
                input={<OutlinedInput />}
                required
                startAdornment={
                  <InputAdornment position="start">
                    <ShopIcon />
                  </InputAdornment>
                }
              >
                <MenuItem value="" disabled>
                  Select Type
                </MenuItem>
                <MenuItem value="Income">Income</MenuItem>
                <MenuItem value="Expense">Expense</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12}>
              <Select
                fullWidth
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                displayEmpty
                input={<OutlinedInput />}
                required
                startAdornment={
                  <InputAdornment position="start">
                    <CategoryIcon />
                  </InputAdornment>
                }
              >
                <MenuItem value="" disabled>
                  Select Category
                </MenuItem>
                {/* Conditionally render categories based on the type */}
                {type === "Income" &&
                  incomeCategories.map((categoryOption, index) => (
                    <MenuItem key={index} value={categoryOption}>
                      {categoryOption}
                    </MenuItem>
                  ))}
                {type === "Expense" &&
                  expenseCategories.map((categoryOption, index) => (
                    <MenuItem key={index} value={categoryOption}>
                      {categoryOption}
                    </MenuItem>
                  ))}
              </Select>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="outlined"
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                multiline
                rows={3}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <DescriptionIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              sx={{
                backgroundColor: theme.palette.primary.main,
                "&:hover": { backgroundColor: theme.palette.primary.dark },
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
                borderRadius: "15px",
                padding: "10px 20px",
                fontSize: "1rem",
              }}
            >
              Add Transaction
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default TransactionForm;
