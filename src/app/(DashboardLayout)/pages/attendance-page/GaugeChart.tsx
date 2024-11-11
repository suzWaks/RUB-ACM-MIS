import * as React from "react";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";

import { Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";

const GaugeChart = () => {
  const [turnout, setTurnout] = useState();

  const fetchData = async () => {
    try {
      const response = await fetch("/api/attendance/dash/turnoutRatio", {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      setTurnout(result.turnoutRate);
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

  const settings = {
    width: 150,
    height: 150,
    value: turnout,
  };
  return (
    <>
      <Typography variant="h6" align="center" gutterBottom>
        Total Turnout Ratio
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Gauge
          {...settings}
          cornerRadius="50%"
          sx={(theme) => ({
            [`& .${gaugeClasses.valueText}`]: {
              fontSize: 30,
            },
            [`& .${gaugeClasses.valueArc}`]: {
              fill: "#6F42C1",
            },
            [`& .${gaugeClasses.referenceArc}`]: {
              fill: theme.palette.text.disabled,
            },
          })}
        />
      </Box>
    </>
  );
};

export default GaugeChart;
