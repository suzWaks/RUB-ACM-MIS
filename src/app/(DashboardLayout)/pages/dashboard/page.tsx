"use client";
import { Typography } from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";

const dashboard = () => {
  return (
    <PageContainer title="Dashboard" description="Home of RUB ACM MIS">
      <DashboardCard title="Dashboard">
        <Typography>Modify this home page</Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default dashboard;
