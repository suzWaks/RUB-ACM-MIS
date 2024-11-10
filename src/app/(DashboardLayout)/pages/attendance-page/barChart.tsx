import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { Box, Typography } from "@mui/material";

const Bar = () => {
  return (
    <Box sx={{ width: "100%", height: 350 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Attendance stats by year
      </Typography>
      <BarChart
        xAxis={[
          {
            scaleType: "band",
            data: ["1st Year", "2nd Year", "3rd Year", "4th Year", "5th Year"],
          },
        ]}
        series={[
          {
            data: [4, 2, 5, 4, 1],
            stack: "A",
            label: "Absent",
          },
          { data: [14, 6, 5, 8, 9], label: "Present" },
        ]}
        barLabel={(item, context) => {
          return context.bar.height >= 60 ? item.value?.toString() : null;
        }}
        height={350}
        skipAnimation={false}
      />
    </Box>
  );
};

export default Bar;
