import * as React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { Typography, Box } from "@mui/material";
import theme from "@/utils/theme";
import { useState, useEffect } from "react";

interface graphdata {
  data: number[];
}

const LineGraph = () => {
  const [data, setData] = useState<graphdata>({ data: [] });

  const fetchData = async () => {
    try {
      const response = await fetch("/api/attendance/dash/monthlytrends", {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.log("Error while fetching data: ", error);
    }
  };

  //useEffect to fetch data
  useEffect(() => {
    const fetchGraphData = async () => {
      await fetchData();
    };
    fetchGraphData();
  }, []);

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
              data: data.data,
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
