"use client";
import { Typography } from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";

const EventsPage = () => {
  return (
    <PageContainer title="Event Page" description="Members page">
      <DashboardCard title="Event Page">
        <Typography>Modify this page</Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default EventsPage;
