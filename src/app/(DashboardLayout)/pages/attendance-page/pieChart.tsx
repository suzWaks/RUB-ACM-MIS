import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { Box, Typography } from "@mui/material";

const Pie = () => {
  return (
    <Box sx={{ width: "100%", height: 300 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Absent : Present ratio
      </Typography>
      <PieChart
        series={[
          {
            data: [
              { id: 0, value: 10, label: "Total absent" },
              { id: 1, value: 15, label: "Total present" },
            ],
          },
        ]}
        height={300}
      />
    </Box>
  );
};

export default Pie;
