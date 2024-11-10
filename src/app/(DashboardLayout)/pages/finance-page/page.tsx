// FinancePage.js

"use client";
import React from "react";
import { useState, useEffect } from "react";
import { Session } from "next-auth";

import Loading from "../../loading";

import { Typography, Card, Grid, Box, LinearProgress } from "@mui/material";
import { Line, Bar, Pie } from "react-chartjs-2";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import { useRouter } from "next/navigation";
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
import PaidIcon from "@mui/icons-material/Paid";
import theme from "@/utils/theme";

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

interface summaryInterface {
  totalIncome: number;
  totalExpense: number;
  totalBalance: number;
}

interface cummulativeInterface {
  label: string;
  data: number[];
}

interface topFundsInterface {
  totalIncome: number;
  category: string;
  totalLevel: number;
}

interface Transaction {
  amount: number;
  type: string;
  description: string;
}

interface recentTransactionInterface {
  recentTransactions: Transaction[];
  totalAmount: number;
}

interface monthlyDataInterface {
  label: string;
  data: number[];
}
const FinanceDashboard = () => {
  const [summary, setSummary] = useState<summaryInterface | null>(null);
  const [cumulativeData, setCumulativeData] = useState<
    cummulativeInterface[] | null
  >(null);
  const [topFundsData, setTopFundsData] = useState<topFundsInterface[] | null>(
    null
  );
  const [recentTransaction, setRecentTransaction] =
    useState<recentTransactionInterface | null>(null);
  const [monthlyData, setMonthlyData] = useState<monthlyDataInterface[] | null>(
    null
  );
  const [errorType, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const themeColors = {
    primary_blue: "#027BFE",
    primary_purple: "#6F42C1",
    secondary_turquoise: "#00CCCB",
    secondary_blue: "#09CBF1",
    secondary_teal: "#16A1B8",
  };

  //Fetching Data
  const fetchFinancialSummary = async () => {
    try {
      const response = await fetch("/api/financials/summary");
      if (!response.ok) {
        throw new Error("Network reponse was not ok");
      }
      const result = await response.json();
      setSummary(result);
    } catch (error) {
      setError("Some error occured");
    }
  };

  const fetchCumulativeData = async () => {
    try {
      const response = await fetch("/api/financials/cumulativeData");
      if (!response.ok) {
        throw new Error("Network reponse was not ok");
      }
      const result = await response.json();
      setCumulativeData(result);
    } catch (error) {
      setError("Some error occured");
    }
  };

  const fetchTopFunds = async () => {
    try {
      const response = await fetch("/api/financials/topFunds/");
      if (!response.ok) {
        throw new Error("Network reponse was not ok");
      }
      const result = await response.json();
      setTopFundsData(result);
    } catch (error) {
      setError("Some error occured");
    }
  };

  const fetchRecentTransactions = async () => {
    try {
      const response = await fetch("/api/financials/recentTransactions/");
      if (!response.ok) {
        throw new Error("Network reponse was not ok");
      }
      const result = await response.json();
      setRecentTransaction(result);
    } catch (error) {
      setError("Some error occured");
    }
  };

  const fetchMonthlyData = async () => {
    try {
      const response = await fetch("/api/financials/incomeExpenseMonth/");
      if (!response.ok) {
        throw new Error("Network reponse was not ok");
      }
      const result = await response.json();
      setMonthlyData(result);
    } catch (error) {
      setError("Some error occured");
    }
  };

  //Calling Use Effect to fetch data
  useEffect(() => {
    const fetchData = async () => {
      await fetchFinancialSummary();
      await fetchCumulativeData();
      await fetchTopFunds();
      await fetchRecentTransactions();
      await fetchMonthlyData();
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) return <Loading />;
  //Data for the balance overview, report expenses, and funds
  const reportExpenseData = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: cumulativeData?.[0]?.label ?? "Net Balance",
        data: cumulativeData?.[0]?.data ?? new Array(12).fill(0),
        borderColor: themeColors.primary_purple,
        fill: false,
        tension: 0.1,
      },
      {
        label: cumulativeData?.[1]?.label ?? "Total Expense",
        data: cumulativeData?.[1]?.data ?? new Array(12).fill(0), // Expenses per month
        borderColor: themeColors.secondary_teal, // Color for expense line
        fill: false,
        tension: 0.1,
      },
      {
        label: cumulativeData?.[2]?.label ?? "Total Income",
        data: cumulativeData?.[2]?.data ?? new Array(12).fill(0), // Income per month
        borderColor: themeColors.primary_blue, // Color for income line
        fill: false,
        tension: 0.1,
      },
    ],
  };

  const pieData = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        data: [summary?.totalIncome, summary?.totalExpense],
        backgroundColor: [
          theme.palette.primary.main,
          theme.palette.primary_blue.main,
        ],
      },
    ],
  };

  const fundsData = [
    {
      name: topFundsData?.[0]?.category ?? "",
      amount: topFundsData?.[0]?.totalIncome ?? "",
      color: theme.palette.primary.main,
      total: topFundsData?.[0]?.totalLevel ?? "",
    },
    {
      name: topFundsData?.[1]?.category ?? "",
      amount: topFundsData?.[1]?.totalIncome ?? "",
      color: theme.palette.secondary_teal.main,
      total: topFundsData?.[1]?.totalLevel ?? "",
    },
    {
      name: topFundsData?.[2]?.category ?? "",
      amount: topFundsData?.[2]?.totalIncome ?? "",
      color: theme.palette.secondary.main,
      total: topFundsData?.[2]?.totalLevel ?? "",
    },
    {
      name: topFundsData?.[3]?.category ?? "",
      amount: topFundsData?.[3]?.totalIncome ?? "",
      color: theme.palette.primary_blue.main,
      total: topFundsData?.[3]?.totalLevel ?? "",
    },
    {
      name: topFundsData?.[4]?.category ?? "",
      amount: topFundsData?.[4]?.totalIncome ?? "",
      color: theme.palette.secondary_blue.main,
      total: topFundsData?.[4]?.totalLevel ?? "",
    },
  ];

  const recentTransactionData = recentTransaction?.recentTransactions.map(
    (transaction) => {
      return {
        type: transaction.type,
        description: transaction.description,
        amount: `Nu. ${transaction.amount.toFixed(2)}`,
        icon: (
          <AccountCircleIcon
            sx={{ fontSize: 40, color: themeColors.primary_purple }}
          />
        ),
        actionIcon: (
          <DirectionsCarIcon sx={{ color: themeColors.primary_blue }} />
        ),
      };
    }
  );

  const expenseGraphData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: monthlyData?.[0]?.label ?? "Expenses",
        data: monthlyData?.[0]?.data ?? [0, 0, 0, 0],
        backgroundColor: themeColors.primary_purple,
      },
      {
        label: monthlyData?.[1]?.label ?? "Income",
        data: monthlyData?.[1]?.data ?? [0, 0, 0, 0],
        backgroundColor: themeColors.secondary_teal,
      },
    ],
  };

  const handleSeeFullHistory = () => {
    router.push("/pages/finance-page/RecentTrans");
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Balance Overview */}
      <Grid container spacing={2} justifyContent="space-between">
        {/* First Card */}
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              p: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderRadius: "25px", // Rounded corners
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)", // Soft shadow
              backgroundColor: "#f4f6f9", // Light background
            }}
          >
            <Box>
              <Typography variant="h6" color="textSecondary">
                Total Balance
              </Typography>
              <Typography variant="h4" sx={{ color: "#3F51B5" }}>
                Nu.{summary?.totalBalance}
              </Typography>
            </Box>
            <Box>
              <AccountBalanceWalletIcon
                sx={{ fontSize: 40, color: "#3F51B5" }}
              />
            </Box>
          </Card>
        </Grid>

        {/* Second Card */}
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              p: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderRadius: "25px",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#f4f6f9",
            }}
          >
            <Box>
              <Typography variant="h6" color="textSecondary">
                Total Income
              </Typography>
              <Typography variant="h4" sx={{ color: "#3F51B5" }}>
                Nu.{summary?.totalIncome}
              </Typography>
            </Box>
            <Box>
              <TrendingUpIcon
                sx={{ fontSize: 40, color: theme.palette.secondary.main }}
              />
            </Box>
          </Card>
        </Grid>

        {/* Third Card */}
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              p: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderRadius: "25px",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#f4f6f9",
            }}
          >
            <Box>
              <Typography variant="h6" color="textSecondary">
                Total Expense
              </Typography>
              <Typography variant="h4" sx={{ color: "#3F51B5" }}>
                Nu.{summary?.totalExpense}
              </Typography>
            </Box>
            <Box>
              <TrendingDownIcon
                sx={{ fontSize: 40, color: theme.palette.secondary_teal.main }}
              />
            </Box>
          </Card>
        </Grid>
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
                Cumulative Balance
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
                Total Income By Categories
              </Typography>
            </Box>

            <Box>
              {fundsData.map((fund, index) => {
                const progress = Number(fund.total); // Convert to number explicitly
                const scaledProgress =
                  progress > 100 ? progress / 10 : progress; // Scale if necessary
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
                      value={scaledProgress}
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
              height: "280px",
              borderRadius: "16px",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>
              Payment Transactions
            </Typography>

            {/* Total and filter dropdown */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography variant="h4">
                Nu. {recentTransaction?.totalAmount}
              </Typography>
              <Typography variant="body2" sx={{ color: "gray" }}>
                Two Recent Transactions
              </Typography>
            </Box>

            {/* Transaction list */}
            {recentTransactionData?.map((transaction, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                  mb: 2,
                  borderBottom: "1px solid #f0f0f0",
                  pb: 2,
                }}
              >
                {/* Left section with icon and text */}
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Box sx={{ mr: 2 }}>
                    <PaidIcon
                      sx={{ fontSize: 30, color: themeColors.primary_purple }}
                    />
                  </Box>
                  <Box>
                    <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                      {transaction.type}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "gray" }}>
                      {transaction.description}
                    </Typography>
                  </Box>
                </Box>

                {/* Right section with amount and action icons */}
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: "bold", mr: 2 }}
                  >
                    {transaction.amount}
                  </Typography>
                  <ArrowForwardIcon
                    sx={{
                      fontSize: 16,
                      ml: 1,
                      color: themeColors.primary_blue,
                    }}
                  />
                </Box>
              </Box>
            ))}

            {/* Full History Link */}
            <Typography
              variant="body2"
              sx={{
                textAlign: "center",
                color: themeColors.secondary_teal,
                cursor: "pointer",
                mt: 2,
              }}
              onClick={handleSeeFullHistory} // Add onClick here
            >
              See Full History
            </Typography>
          </Card>
        </Grid>

        {/* Expenses Graph Section */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              p: 2,
              height: "280px",
              borderRadius: "16px",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Typography variant="h6">Expenses and Income This Month</Typography>
            <Bar data={expenseGraphData} />
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

const FinancePage = () => {
  return (
    <PageContainer title="Finance Page" description="Finance page">
      <Typography
        variant="h3"
        sx={{ color: theme.palette.primary.main, fontWeight: "bold" }}
        mb={2}
      >
        Finance
      </Typography>
      <FinanceDashboard />
    </PageContainer>
  );
};

export default FinancePage;
