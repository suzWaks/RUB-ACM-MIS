import { Box } from "@mui/material";
import dynamic from "next/dynamic";
import { useTheme } from "@mui/material/styles";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface StudentGraphProps {
  data: number[];
}

interface StudentGraphProps {
  data: number[];
  color: string; 
}

const StudentGraph: React.FC<StudentGraphProps> = ({ data, color }) => {
  const theme = useTheme();

  const optionsColumnChart: any = {
    chart: {
      type: "area",
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: "#adb0bb",
      toolbar: {
        show: false,
      },
      sparkline: {
        enabled: true,
      },
      height: 200,
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 500,
        dynamicAnimation: {
          speed: 350,
        },
      },
    },
    stroke: {
      curve: "smooth",
      width: 3,
    },
    grid: {
      show: false,
    },
    xaxis: {
      categories: data.map((_, index) => `Data ${index + 1}`),
      labels: {
        show: true,
      },
    },
    yaxis: {
      labels: {
        show: false,
      },
      min: Math.min(...data) - 5,
      max: Math.max(...data) + 5,
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "vertical",
        shadeIntensity: 0.6,
        gradientToColors: [color],
        stops: [0, 100],
      },
    },
    markers: {
      size: 4,
      colors: [color],
      strokeColors: "#fff",
      strokeWidth: 2,
      hover: {
        size: 7,
      },
    },
    tooltip: {
      theme: theme.palette.mode === "dark" ? "dark" : "light",
      style: {
        fontSize: "12px",
        background: theme.palette.background.paper,
      },
      x: {
        show: true,
      },
      y: {
        title: {
          formatter: () => "Count",
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (value: number) => value.toString(),
      style: {
        fontSize: "12px",
        colors: [color],
      },
      dropShadow: {
        enabled: true,
        top: 1,
        left: 1,
        blur: 1,
        opacity: 0.45,
      },
    },
  };

  const seriesColumnChart: any = [
    {
      name: `Growth`,
      color: color,
      data: data.map((value, index) => ({
        x: `Year ${index + 1}`,
        y: value,
        fillColor: color,
      })),
    },
  ];

  return (
    <Box
      sx={{
        border: "none",
        boxShadow: "none",
        background: "transparent",
        width: "100%",
      }}
    >
      <DashboardCard>
        <Box>
          <Chart
            options={optionsColumnChart}
            series={seriesColumnChart}
            type="area"
            height={90}
            width={"200"}
          />
        </Box>
      </DashboardCard>
    </Box>
  );
};

export default StudentGraph;

