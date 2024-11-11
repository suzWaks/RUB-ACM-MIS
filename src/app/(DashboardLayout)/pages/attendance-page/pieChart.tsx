import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { Box, Typography } from "@mui/material";
import theme from "@/utils/theme";
import { useState, useEffect } from "react";

const Pie = () => {
  const [totalPresent, setTotalPresent] = useState<number>(0);
  const [totalAbsent, setTotalAbsent] = useState<number>(0);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/attendance/dash/absentVsPresent", {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      setTotalAbsent(result.totalAbsent);
      setTotalPresent(result.totalPresent);
    } catch (error) {
      console.log("Error while fetching data: ", error);
    }
  };

  useEffect(() => {
    const fetchGraphData = async () => {
      await fetchData();
    };
    fetchGraphData();
  }, []);

  return (
    <>
      <Typography variant="h6" align="center" gutterBottom>
        Absent Vs Present
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <PieChart
          series={[
            {
              data: [
                {
                  id: 0,
                  value: totalAbsent,
                  label: "Total absent",
                  color: theme.palette.primary.main,
                },
                {
                  id: 1,
                  value: totalPresent,
                  label: "Total present",
                  color: theme.palette.secondary_teal.main,
                },
              ],
            },
          ]}
          height={150}
        />
      </Box>
    </>
  );
};

export default Pie;
