import dynamic from "next/dynamic";
import { Grid, Typography, Stack, Box } from "@mui/material";
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
  // Hardcoded colors because global theme disrupts local theme set up
  const title = "#6f42c1";
  const primary = "#007BFF";
  const secondary = "#0DCAF0";

  const totalBudget = budgetUsed + budgetRemaining;

  const optionsPieChart: any = {
    chart: {
      type: "donut",
      fontFamily: "'Roboto', sans-serif",
      foreColor: "#6e6b7b",
      height: 160,
    },
    colors: [primary, secondary],
    plotOptions: {
      pie: {
        donut: {
          size: "75%",
          background: "transparent",
        },
        expandOnClick: true,
      },
    },
    tooltip: {
      theme: "light",
      fillSeriesColor: false,
    },
    dataLabels: {
      enabled: true,
      formatter: (val: number) => `${val.toFixed(1)}%`,
      style: {
        colors: ["black"],
        fontWeight: "bold",
        fontSize: "16px",
        textStroke: "3px #ffff",
      },
      dropShadow: {
        enabled: true,
        top: 2,
        left: 2,
        blur: 3,
        color: "rgba(0, 0, 0, 0.6)",
        opacity: 0.8,
      },
      offsetY: -10,
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

  const seriesPieChart: any = [budgetUsed, budgetRemaining];

  return (
    <DashboardCard>
      <Box>
        <Typography
          variant="h5"
          sx={{
            textAlign: "center",
            color: title,
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
                    backgroundColor: primary,
                    borderRadius: "50%",
                    marginRight: 1,
                  }}
                />
                <Typography variant="body1" color={primary} fontWeight={500}>
                  Used: ${budgetUsed.toLocaleString()}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    backgroundColor: secondary, // Hardcoded secondary color
                    borderRadius: "50%",
                    marginRight: 1,
                  }}
                />
                <Typography variant="body1" color={secondary} fontWeight={500}>
                  Remaining: ${budgetRemaining.toLocaleString()}
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
