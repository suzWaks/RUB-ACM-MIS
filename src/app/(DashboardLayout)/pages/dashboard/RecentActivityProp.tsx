import React, { useState } from "react";
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
import {
  Link,
  Typography,
  useTheme,
  Dialog,
  DialogContent,
  DialogTitle,
  Backdrop,
} from "@mui/material";
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
  const [open, setOpen] = useState(false);
  const colors = ["#6f42c1", "#007BFF", "#00CCCC", "#0DCAF0"];

  const handleShowMore = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
      }}
    >
      <DashboardCard>
        <>
          <Typography
            variant="h5"
            align="center"
            sx={{
              color: "#6f42c1",
              marginBottom: 2,
            }}
          >
            Recent Activity
          </Typography>
          <Timeline
            className="theme-timeline"
            sx={{
              flexGrow: 1,
              padding: 0,
              marginBottom: "-20px",
              "& .MuiTimelineConnector-root": {
                width: "2px",
                backgroundColor: "#e0e0e0",
              },
              [`& .${timelineOppositeContentClasses.root}`]: {
                flex: 0.5,
                paddingLeft: 0,
                color: "#666",
              },
            }}
          >
            {activities.slice(0, 3).map((activity, index) => (
              <TimelineItem key={index} sx={{ paddingBottom: "20px" }}>
                <TimelineOppositeContent
                  sx={{ marginRight: 2, marginBottom: "10px" }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#666",
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
                      backgroundColor: colors[index % colors.length],
                      width: 10,
                      height: 10,
                      margin: 0,
                    }}
                  />
                  <TimelineConnector
                    className="animate"
                    sx={{ backgroundColor: "#e0e0e0" }}
                  />
                </TimelineSeparator>
                <TimelineContent sx={{ padding: 0, marginLeft: "20px" }}>
                  <Typography
                    fontWeight="600"
                    variant="body1"
                    sx={{
                      marginBottom: 1,
                    }}
                  >
                    {activity.title}
                  </Typography>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
          <Link
            onClick={handleShowMore}
            underline="none"
            sx={{
              display: "block",
              textAlign: "center",
              marginTop: "20px",
              color: "#6f42c1",
              cursor: "pointer",
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

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        BackdropProps={{
          style: {
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Blurred dark background
          },
        }}
        sx={{
          "& .MuiDialog-paper": {
            margin: "auto", // Centers the dialog in the viewport
            overflowY: "auto", // Allows scrolling for large content
          },
        }}
      >
        <DialogTitle sx={{ textAlign: "center", color: "#6f42c1" }}>
          All Activities
        </DialogTitle>
        <DialogContent dividers sx={{ maxHeight: "70vh" }}>
          <Timeline
            className="theme-timeline"
            sx={{
              padding: 0,
              "& .MuiTimelineConnector-root": {
                width: "2px",
                backgroundColor: "#e0e0e0",
              },
              [`& .${timelineOppositeContentClasses.root}`]: {
                flex: 0.5,
                paddingLeft: 0,
                color: "#666",
              },
            }}
          >
            {activities.map((activity, index) => (
              <TimelineItem key={index} sx={{ paddingBottom: "20px" }}>
                <TimelineOppositeContent
                  sx={{ marginRight: 2, marginBottom: "10px" }}
                >
                  <Typography variant="body2" sx={{ color: "#666" }}>
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
                      backgroundColor: colors[index % colors.length],
                      width: 10,
                      height: 10,
                      margin: 0,
                    }}
                  />
                  <TimelineConnector
                    className="animate"
                    sx={{ backgroundColor: "#e0e0e0" }}
                  />
                </TimelineSeparator>
                <TimelineContent sx={{ padding: 0, marginLeft: "20px" }}>
                  <Typography
                    fontWeight="600"
                    variant="body1"
                    sx={{ marginBottom: 1 }}
                  >
                    {activity.title}
                  </Typography>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RecentActivity;
