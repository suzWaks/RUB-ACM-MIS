import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { Box, Typography } from "@mui/material";
import theme from "@/utils/theme";
const Bar = () => {
  return (
    <>
      <Typography variant="h6" align="center" gutterBottom>
        Attendance stats by year
      </Typography>
      <BarChart
        xAxis={[
          {
            scaleType: "band",
            data: ["1st Year", "2nd Year", "3rd Year", "4th Year"],
          },
        ]}
        series={[
          {
            data: [4, 2, 5, 4],
            stack: "A",
            label: "Absent",
            color: theme.palette.primary.main,
          },
          {
            data: [14, 6, 5, 8],
            label: "Present",
            color: theme.palette.secondary_teal.main,
          },
        ]}
        barLabel={(item, context) => {
          return context.bar.height >= 60 ? item.value?.toString() : null;
        }}
        height={350}
        skipAnimation={false}
      />
    </>
  );
};

export default Bar;
