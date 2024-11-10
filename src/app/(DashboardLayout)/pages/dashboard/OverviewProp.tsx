import dynamic from "next/dynamic";
import { Grid, Typography, Stack, Box } from "@mui/material";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface BudgetOverviewProps {
  totalIncome: number;
  totalExpense: number;
}

const BudgetOverview: React.FC<BudgetOverviewProps> = ({
  totalIncome,
  totalExpense,
}) => {
  const titleColor = "#6f42c1";
  const primaryColor = "#007BFF";
  const secondaryColor = "#0DCAF0";

  const seriesPieChart: any = [totalIncome, totalExpense];

  const optionsPieChart: any = {
    chart: {
      type: "donut",
      fontFamily: "'Roboto', sans-serif",
      height: 160,
      animations: {
        enabled: true,
      },
    },
    colors: [primaryColor, secondaryColor],
    plotOptions: {
      pie: {
        donut: {
          size: "75%",
          background: "transparent",
        },
        expandOnClick: true,
        shadow: {
          enabled: true,
          color: "#000",
          top: 5,
          left: 5,
          blur: 5,
          opacity: 0.1,
        },
      },
    },
    tooltip: {
      theme: "light",
      fillSeriesColor: false,
      style: {
        fontSize: "14px",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["#fff"],
    },
    legend: {
      show: false,
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "horizontal",
        shadeIntensity: 0.8,
        gradientToColors: ["#007bff", "#00d4ff"],
        stops: [0, 100],
      },
    },
  };

  return (
    <DashboardCard>
      <Box sx={{ padding: 2 }}>
        <Typography
          variant="h5"
          sx={{
            textAlign: "center",
            color: titleColor,
            fontWeight: 600,
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
          <Grid item xs={12} md={6} sx={{ textAlign: "center" }}>
            <Chart
              options={optionsPieChart}
              series={seriesPieChart}
              type="donut"
              height={170}
              width={"100%"}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack spacing={1} alignItems="center" mt={2}>
              <Box display="flex" alignItems="center">
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    backgroundColor: primaryColor,
                    borderRadius: "50%",
                    marginRight: 1,
                  }}
                />
                <Typography
                  variant="body1"
                  color={primaryColor}
                  fontWeight={500}
                >
                  Total Income: Nu.{totalIncome.toLocaleString()}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    backgroundColor: secondaryColor,
                    borderRadius: "50%",
                    marginRight: 1,
                  }}
                />
                <Typography
                  variant="body1"
                  color={secondaryColor}
                  fontWeight={500}
                >
                  Total Expense: Nu.{totalExpense.toLocaleString()}
                </Typography>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </DashboardCard>
  );
};

export default BudgetOverview;
