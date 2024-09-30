import dynamic from "next/dynamic";
import { useTheme } from "@mui/material/styles";
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
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;
  const totalBudget = budgetUsed + budgetRemaining;

  const optionsPieChart: any = {
    chart: {
      type: "donut",
      fontFamily: theme.typography.fontFamily,
      foreColor: theme.palette.text.secondary,
      toolbar: { show: false },
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
      theme: theme.palette.mode === "dark" ? "dark" : "light",
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
      colors: [theme.palette.background.paper],
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
        gradientToColors: [
          theme.palette.primary.dark,
          theme.palette.secondary.dark,
        ],
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
            color: secondary,
            fontWeight: 600,
            marginBottom: 2,
            ...theme.typography.h5,
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
                <Typography
                  variant="body1"
                  color={primary}
                  fontWeight={500}
                  fontFamily={theme.typography.fontFamily}
                >
                  Used: ${budgetUsed.toLocaleString()}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    backgroundColor: secondary,
                    borderRadius: "50%",
                    marginRight: 1,
                  }}
                />
                <Typography
                  variant="body1"
                  color={secondary}
                  fontWeight={500}
                  fontFamily={theme.typography.fontFamily}
                >
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
