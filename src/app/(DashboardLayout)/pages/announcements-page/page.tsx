"use client";
import { Typography } from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";

const AnnouncementsPage = () => {
  return (
    <PageContainer
      title="Announcement Page"
      description="this is the announcement page"
    >
      <DashboardCard title="Announcement Page">
        <Typography>Modify announcement page</Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default AnnouncementsPage;
