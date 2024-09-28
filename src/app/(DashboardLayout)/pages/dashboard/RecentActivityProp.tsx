import React from "react";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import {
  Timeline,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
  timelineOppositeContentClasses,
} from "@mui/lab";
import { Link, Typography, useTheme } from "@mui/material";
import "./RecentActivity.css";

interface Activity {
  date: string;
  title: string;
}

interface RecentActivityProps {
  activities: Activity[];
}

const RecentActivity: React.FC<RecentActivityProps> = ({ activities }) => {
  const theme = useTheme();

  return (
    <DashboardCard>
      <>
        <Typography
          variant="h5"
          align="center"
          sx={{
            color: theme.palette.secondary.main,
            marginBottom: 2,
          }}
        >
          Recent Activity
        </Typography>
        <Timeline
          className="theme-timeline"
          sx={{
            padding: 0,
            marginBottom: "-20px",
            "& .MuiTimelineConnector-root": {
              width: "2px",
              backgroundColor: theme.palette.divider,
            },
            [`& .${timelineOppositeContentClasses.root}`]: {
              flex: 0.5,
              paddingLeft: 0,
              color: theme.palette.text.secondary,
            },
          }}
        >
          {activities.map((activity, index) => (
            <TimelineItem key={index} sx={{ paddingBottom: "20px" }}>
              <TimelineOppositeContent
                sx={{ marginRight: 2, marginBottom: "10px" }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: theme.palette.text.secondary,
                    fontFamily: theme.typography.fontFamily,
                  }}
                >
                  {new Date(activity.date).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </Typography>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot
                  className="animate"
                  sx={{
                    backgroundColor: theme.palette.secondary.main,
                    width: 10,
                    height: 10,
                    margin: 0,
                  }}
                />
                <TimelineConnector
                  className="animate"
                  sx={{ backgroundColor: theme.palette.divider }}
                />
              </TimelineSeparator>
              <TimelineContent sx={{ padding: 0, marginLeft: "10px" }}>
                <Typography
                  fontWeight="600"
                  variant="body1"
                  sx={{
                    marginBottom: 1,
                    fontFamily: theme.typography.fontFamily,
                  }}
                >
                  {activity.title}
                </Typography>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
        <Link
          href="/"
          underline="none"
          sx={{
            display: "block",
            textAlign: "center",
            marginTop: "20px",
            fontWeight: "600",
            color: theme.palette.secondary.main,
            "&:hover": {
              textDecoration: "underline",
            },
            fontFamily: theme.typography.fontFamily,
          }}
        >
          Show More
        </Link>
      </>
    </DashboardCard>
  );
};

export default RecentActivity;
