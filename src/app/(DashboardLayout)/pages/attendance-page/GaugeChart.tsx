import * as React from "react";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";

import { Box, Typography } from "@mui/material";

const GaugeChart = () => {
  const turnout = 75;

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
              fontSize: 40,
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
