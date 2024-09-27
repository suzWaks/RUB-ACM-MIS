import dynamic from "next/dynamic";
import { useTheme } from "@mui/material/styles";
import { Grid, Typography, Stack } from "@mui/material";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface BudgetOverviewProps {
  budgetUsed: number;
  budgetRemaining: number;
}

const BudgetOverview: React.FC<BudgetOverviewProps> = ({
  budgetUsed,
  budgetRemaining,
}) => {
  const theme = useTheme();
  const primary = theme.palette.secondary.main;
  const purple = "#9c27b0";

  const totalBudget = budgetUsed + budgetRemaining;

  const optionsPieChart: any = {
    chart: {
      type: "donut",
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: "#adb0bb",
      toolbar: {
        show: false,
      },
      height: 155,
    },
    colors: [primary, purple],
    plotOptions: {
      pie: {
        donut: {
          size: "75%",
          background: "transparent",
        },
      },
    },
    tooltip: {
      theme: theme.palette.mode === "dark" ? "dark" : "light",
      fillSeriesColor: false,
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
  };

  const seriesPieChart: any = [budgetUsed, budgetRemaining];

  return (
    <DashboardCard>
      <>
        <Typography
          variant="h5"
          sx={{
            color: primary,
            marginBottom: 2,
          }}
        >
          Budget Overview
        </Typography>
        <Grid
          container
          spacing={2}
          justifyContent="center"
          alignItems="center"
          direction="column"
        >
          {/* Centered Pie Chart */}
          <Grid item xs={12} md={6} sx={{ textAlign: "center" }}>
            <Chart
              options={optionsPieChart}
              series={seriesPieChart}
              type="donut"
              height={150}
              width={"100%"}
            />
          </Grid>
          {/* Budget Summary Below the Chart */}
          <Grid item xs={12} md={6}>
            <Stack spacing={1} alignItems="center" mt={2}>
              <Typography
                variant="body1"
                color={primary}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <span
                  style={{
                    display: "inline-block",
                    width: 12,
                    height: 12,
                    backgroundColor: primary,
                    borderRadius: "50%",
                    marginRight: 8,
                  }}
                ></span>
                Used: ${budgetUsed.toLocaleString()}
              </Typography>
              <Typography
                variant="body1"
                color={purple}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <span
                  style={{
                    display: "inline-block",
                    width: 12,
                    height: 12,
                    backgroundColor: purple,
                    borderRadius: "50%",
                    marginRight: 8,
                  }}
                ></span>
                Remaining: ${budgetRemaining.toLocaleString()}
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </>
    </DashboardCard>
  );
};

export default BudgetOverview;
