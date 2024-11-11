import * as React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { Typography, Box } from "@mui/material";
import theme from "@/utils/theme";

const LineGraph = () => {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" align="center" gutterBottom color="black">
        Monthly Attendance Trends
      </Typography>

      {/* Box to ensure the chart takes full width */}
      <Box sx={{ width: "100%" }}>
        <LineChart
          xAxis={[
            {
              data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
              valueFormatter: (value, context) =>
                context.location === "tick" && Number.isInteger(value)
                  ? `${value}`
                  : "", // Show only integer values for ticks
              min: 1,
              max: 12,
              label: "Month",
            },
          ]}
          series={[
            {
              data: [95, 88, 70, 75, 90, 85, 60, 70, 65, 80, 95, 100],
              color: theme.palette.primary.main,
            },
          ]}
          height={300} // Set the desired height
        />
      </Box>
    </Box>
  );
};

export default LineGraph;
