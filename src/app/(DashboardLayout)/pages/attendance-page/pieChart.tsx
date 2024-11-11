import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { Box, Typography } from "@mui/material";
import theme from "@/utils/theme";
const Pie = () => {
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
                  value: 10,
                  label: "Total absent",
                  color: theme.palette.primary.main,
                },
                {
                  id: 1,
                  value: 15,
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
