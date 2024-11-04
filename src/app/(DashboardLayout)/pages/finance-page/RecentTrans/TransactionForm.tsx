"use client";
import React, { useState } from "react";
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

interface TransactionFormProps {
  onClose: () => void;
  onSubmit: (transactionData: any) => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({
  onClose,
  onSubmit,
}) => {
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [items, setItems] = useState("");
  const [event, setEvent] = useState(""); // New state for event
  const theme = useTheme();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !type || !event) {
      // Check for event as well
      alert("Please fill out all required fields.");
      return;
    }
    const transactionData = {
      amount: parseFloat(amount) || 0,
      type,
      description,
      items: items
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      event, // Include event in transaction data
    };
    onSubmit(transactionData);
    onClose();
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
                onChange={(e) => setType(e.target.value)}
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
                  Select Type
                </MenuItem>
                <MenuItem value="Income">Income</MenuItem>
                <MenuItem value="Expense">Expense</MenuItem>
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
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="outlined"
                label="Items (comma separated)"
                value={items}
                onChange={(e) => setItems(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <DescriptionIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="outlined"
                label="Event"
                value={event}
                onChange={(e) => setEvent(e.target.value)}
                required
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
