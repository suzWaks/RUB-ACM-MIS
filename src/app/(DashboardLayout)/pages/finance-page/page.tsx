// FinancePage.js

"use client";
import React from "react";
import { Typography, Card, Grid, Box, LinearProgress } from "@mui/material";
import { Line, Bar, Pie } from "react-chartjs-2";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import theme from "@/utils/theme";
import { CircularProgress } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid"; // Import DataGrid

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

const FinanceDashboard = () => {
  const themeColors = {
    primary_blue: "#027BFE",
    primary_purple: "#6F42C1",
    secondary_turquoise: "#00CCCB",
    secondary_blue: "#09CBF1",
    secondary_teal: "#16A1B8",
  };

  // Data for the balance overview, report expenses, and funds
  const balanceOverview = [
    {
      title: "Current Balance",
      amount: "Nu.3,120.49",
      icon: (
        <AccountBalanceWalletIcon
          sx={{ fontSize: 40, color: theme.palette.primary.dark }}
        />
      ),
    },
    {
      title: "Balance Gained",
      amount: "Nu.5,992.94",
      icon: (
        <TrendingUpIcon
          sx={{ fontSize: 40, color: theme.palette.secondary.main }}
        />
      ),
    },
    {
      title: "Balance Used",
      amount: "Nu.12,488.04",
      icon: (
        <TrendingDownIcon
          sx={{ fontSize: 40, color: theme.palette.secondary_teal.main }}
        />
      ),
    },
  ];

  const reportExpenseData = {
    labels: [
      "Apr 05",
      "Apr 06",
      "Apr 07",
      "Apr 08",
      "Apr 09",
      "Apr 10",
      "Apr 11",
    ],
    datasets: [
      {
        label: "Expenses",
        data: [2000, 3000, 2500, 1000, 4000, 3000, 5000],
        borderColor: themeColors.primary_purple,
        fill: false,
        tension: 0.1,
      },
    ],
  };

  const pieData = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        data: [8140.55, 2193.21],
        backgroundColor: [
          theme.palette.primary.main,
          theme.palette.primary_blue.main,
        ],
      },
    ],
  };

  const fundsData = [
    {
      name: "ACM Lottery",
      amount: 309,
      color: theme.palette.primary.main,
      total: 400,
    },
    {
      name: "ACM Stall",
      amount: 950,
      color: theme.palette.secondary_teal.main,
      total: 1000,
    },
    {
      name: "ACM Show",
      amount: 550,
      color: theme.palette.secondary.main,
      total: 600,
    },
    {
      name: "ACM Fundraiser",
      amount: 620,
      color: theme.palette.primary_blue.main,
      total: 800,
    },
    {
      name: "ACM Fundraiser 2",
      amount: 170,
      color: theme.palette.secondary_blue.main,
      total: 300,
    },
  ];

  const transactionData = [
    {
      title: "MBoB",
      description: "Refreshments for Members",
      amount: "Nu. 1193.21",
      icon: (
        <AccountCircleIcon
          sx={{ fontSize: 40, color: themeColors.primary_purple }}
        />
      ),
      actionIcon: (
        <DirectionsCarIcon sx={{ color: themeColors.primary_blue }} />
      ),
    },
    {
      title: "MBoB",
      description: "Purchase of equipment",
      amount: "Nu.1000.00",
      icon: (
        <AccountCircleIcon
          sx={{ fontSize: 40, color: themeColors.primary_purple }}
        />
      ),
      actionIcon: (
        <DirectionsCarIcon sx={{ color: themeColors.primary_purple }} />
      ),
    },
  ];

  const expenseGraphData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Expenses",
        data: [1060, 500, 750, 300],
        backgroundColor: themeColors.secondary_teal,
      },
    ],
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Balance Overview */}
      <Grid container spacing={2} justifyContent="space-between">
        {balanceOverview.map((item, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card
              sx={{
                p: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderRadius: "25px", // Rounded corners
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)", // Soft shadow
                backgroundColor: "#f4f6f9", // Light background to match image
              }}
            >
              <Box>
                <Typography variant="h6" color="textSecondary">
                  {item.title}
                </Typography>
                <Typography variant="h4" sx={{ color: "#3F51B5" }}>
                  {item.amount}
                </Typography>{" "}
                {/* Changed text color */}
              </Box>
              <Box>{item.icon}</Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Main Content: Report Expense & Funds Section */}
      <Grid container spacing={3} sx={{ mt: 3 }}>
        {/* Report Expense and Income vs Expense */}
        <Grid item xs={8}>
          <Card
            sx={{
              p: 2,
              borderRadius: "25px", // Match card style
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)", // Match shadow
              backgroundColor: "#ffffff",
            }}
          >
            {/* Container for Report Expense Title */}
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <Typography
                variant="h6"
                color="black"
                sx={{ fontWeight: "bold", pl: 1 }}
              >
                Report Expense
              </Typography>
              <Typography
                variant="h6"
                color="black"
                sx={{ fontWeight: "bold", pr: 6 }}
              >
                Income vs Expense
              </Typography>
            </Box>
            <Grid container spacing={3}>
              {/* Line Chart on the left */}
              <Grid item xs={12} md={8}>
                <Box sx={{ height: 300 }}>
                  {" "}
                  {/* Fixed height for the line chart */}
                  <Line
                    data={reportExpenseData}
                    options={{ maintainAspectRatio: false }}
                  />
                </Box>
              </Grid>

              {/* Pie Chart on the right */}
              <Grid item xs={12} md={4}>
                <Box sx={{ height: 300 }}>
                  {" "}
                  {/* Fixed height for the pie chart */}
                  <Pie
                    data={pieData}
                    options={{ maintainAspectRatio: false }}
                  />
                </Box>
              </Grid>
            </Grid>
          </Card>
        </Grid>

        {/* Funds Section on the right */}
        <Grid item xs={4}>
          <Card
            sx={{
              p: 2,
              borderRadius: "25px", // Match card style
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)", // Match shadow
              backgroundColor: "#ffffff",
              height: "373px",
            }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <Typography variant="h6" color="black">
                Funds
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "#3F51B5", cursor: "pointer" }}
              >
                View all
              </Typography>
            </Box>

            <Box>
              {fundsData.map((fund, index) => {
                const progress = (fund.amount / fund.total) * 100;
                return (
                  <Box key={index} sx={{ mb: 2 }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 2,
                      }}
                    >
                      <Typography sx={{ fontWeight: 500, color: fund.color }}>
                        {fund.name}
                      </Typography>
                      <Typography>Nu {fund.amount}</Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={progress}
                      sx={{
                        height: 6,
                        borderRadius: 5,
                        backgroundColor: "#e0e0e0",
                        "& .MuiLinearProgress-bar": {
                          backgroundColor: fund.color,
                        },
                      }}
                    />
                  </Box>
                );
              })}
            </Box>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mt: 3 }}>
        {/* Recent Transactions Section */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              p: 2,
              borderRadius: "25px", // Match card style
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)", // Match shadow
              backgroundColor: "#ffffff",
            }}
          >
            <Typography variant="h6" color="black" sx={{ fontWeight: "bold" }}>
              Recent Transactions
            </Typography>
            {transactionData.map((transaction, index) => (
              <Box
                key={index}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                sx={{ borderBottom: "1px solid #e0e0e0", py: 2 }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  {transaction.icon}
                  <Box sx={{ ml: 1 }}>
                    <Typography variant="body1" color="textPrimary">
                      {transaction.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {transaction.description}
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="body1" color="textPrimary">
                  {transaction.amount}
                </Typography>
                <Box>{transaction.actionIcon}</Box>
              </Box>
            ))}
          </Card>
        </Grid>

        {/* Expenses Graph Section */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              p: 2,
              borderRadius: "25px", // Match card style
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)", // Match shadow
              backgroundColor: "#ffffff",
            }}
          >
            <Typography variant="h6" color="black" sx={{ fontWeight: "bold" }}>
              Expenses Graph
            </Typography>
            <Box sx={{ height: 300 }}>
              <Bar
                data={expenseGraphData}
                options={{ maintainAspectRatio: false }}
              />
            </Box>
          </Card>
        </Grid>
      </Grid>

      {/* MUI Data Grid for Financials */}
      <Box sx={{ mt: 4 }}>
        <Typography
          variant="h6"
          color="black"
          sx={{ fontWeight: "bold", mb: 2 }}
        >
          Financial Records
        </Typography>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={[]}
            columns={[
              { field: "id", headerName: "ID", width: 90 },
              { field: "amount", headerName: "Amount", width: 150 },
              { field: "type", headerName: "Type", width: 150 },
              { field: "description", headerName: "Description", width: 250 },
              { field: "items", headerName: "Items", width: 250 },
              { field: "event", headerName: "Event", width: 150 },
            ]}
            checkboxSelection
          />
        </div>
      </Box>
    </Box>
  );
};

const FinancePage = () => {
  return (
    <PageContainer
      title="Finance Dashboard"
      description="Manage your financial records and reports"
    >
      <FinanceDashboard />
    </PageContainer>
  );
};

export default FinancePage;
