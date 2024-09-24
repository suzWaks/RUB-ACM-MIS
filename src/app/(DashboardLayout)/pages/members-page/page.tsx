"use client";
import { Typography } from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";

const MembersPage = () => {
  return (
    <PageContainer title="Members Page" description="Members page">
      <DashboardCard title="Members Page">
        <Typography>Modify this page</Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default MembersPage;
