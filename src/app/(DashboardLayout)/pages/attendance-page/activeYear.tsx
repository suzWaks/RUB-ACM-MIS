import { Box, LinearProgress, Typography } from "@mui/material";

const ActiveYear = () => {
  const years = [1, 2, 3, 4];
  const attendancePercentage = [100, 80, 60, 50];

  // Define the theme colors
  const themeColors = {
    primary_blue: "#027BFE",
    primary_purple: "#6F42C1",
    secondary_turquoise: "#00CCCB",
    secondary_blue: "#09CBF1",
    secondary_teal: "#16A1B8",
  };

  // Array to assign specific colors to each year
  const yearColors = [
    themeColors.primary_blue,
    themeColors.primary_purple,
    themeColors.secondary_turquoise,
    themeColors.secondary_teal,
  ];

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h6" color="black">
          Attendance Progress By Year
        </Typography>
      </Box>

      <Box>
        {years.map((year, index) => {
          const progress = attendancePercentage[index]; // Get the percentage for each year
          const scaledProgress = progress > 100 ? 100 : progress; // Ensure progress doesn't exceed 100%

          return (
            <Box key={index} sx={{ mb: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 2,
                }}
              >
                <Typography sx={{ fontWeight: 500, color: yearColors[index] }}>
                  Year {year}
                </Typography>
                <Typography>{attendancePercentage[index]}%</Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={scaledProgress}
                sx={{
                  height: 6,
                  borderRadius: 5,
                  backgroundColor: "#e0e0e0", // Light background for the progress bar
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: yearColors[index], // Use theme color for the progress
                  },
                }}
              />
            </Box>
          );
        })}
      </Box>
    </>
  );
};

export default ActiveYear;
