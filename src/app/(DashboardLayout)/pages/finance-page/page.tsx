"use client";
import { Typography } from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";

const FinancePage = () => {
  return (
    <PageContainer title="Finance Page" description="Finance page">
      <DashboardCard title="Finance Page">
        <Typography>Modify this page</Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default FinancePage;
