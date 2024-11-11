import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { Box, Typography } from "@mui/material";
import theme from "@/utils/theme";
import { useState, useEffect } from "react";

interface presentData {
  present: number[];
}

interface absentData {
  absent: number[];
}
const Bar = () => {
  const [absentData, setAbsentData] = useState<absentData>({ absent: [] });
  const [presentData, setPresentData] = useState<presentData>({
    present: [],
  });

  const fetchData = async () => {
    try {
      const response = await fetch("/api/attendance/dash/AttendanceByYear", {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      setAbsentData({ absent: result.absent });
      setPresentData({ present: result.present });
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
            data: absentData.absent,
            stack: "A",
            label: "Absent",
            color: theme.palette.primary.main,
          },
          {
            data: presentData.present,
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
