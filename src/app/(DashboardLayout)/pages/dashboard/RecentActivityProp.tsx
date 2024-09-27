import React from 'react';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import {
  Timeline,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
  timelineOppositeContentClasses,
} from '@mui/lab';
import { Link, Typography, useTheme } from '@mui/material';

// Define the type for a single activity
interface Activity {
  date: string; // Expecting ISO date format
  title: string;
}

interface RecentActivityProps {
  activities: Activity[]; // Array of Activity objects
}

const RecentActivity: React.FC<RecentActivityProps> = ({ activities }) => {
  const theme = useTheme(); // Access the theme object

  return (
    <DashboardCard>
      <>
        <Typography
          variant="h5"
          sx={{
            color: theme.palette.secondary.main, // Set title color to theme secondary
            marginBottom: 2, // Add some spacing below the title
          }}
        >
          Recent Activity
        </Typography>
        <Timeline
          className="theme-timeline"
          sx={{
            padding: 0,
            marginBottom: '-20px',
            '& .MuiTimelineConnector-root': {
              width: '2px',
              backgroundColor: theme.palette.divider, // Use theme's divider color
            },
            [`& .${timelineOppositeContentClasses.root}`]: {
              flex: 0.5,
              paddingLeft: 0,
              color: theme.palette.text.secondary, // Use theme's text color
            },
          }}
        >
          {activities.map((activity, index) => (
            <TimelineItem key={index} sx={{ paddingBottom: '20px' }}>
              <TimelineOppositeContent sx={{ marginRight: 2, marginBottom: '10px' }}>
                <Typography variant="body2" sx={{ color: theme.palette.text.secondary, fontFamily: theme.typography.fontFamily }}>
                  {new Date(activity.date).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })} {/* Format the date */}
                </Typography>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot
                  sx={{
                    backgroundColor: theme.palette.secondary.main, // Use theme's secondary color
                    width: 10,
                    height: 10,
                  }}
                />
                <TimelineConnector sx={{ backgroundColor: theme.palette.divider }} />
              </TimelineSeparator>
              <TimelineContent sx={{ padding: 0, marginLeft: '10px' }}>
                <Typography fontWeight="600" variant="body1" sx={{ marginBottom: 1, fontFamily: theme.typography.fontFamily }}>
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
            display: 'block',
            textAlign: 'center',
            marginTop: '20px',
            fontWeight: '600',
            color: theme.palette.secondary.main, // Use theme's secondary color
            '&:hover': {
              textDecoration: 'underline',
            },
            fontFamily: theme.typography.fontFamily, // Use theme font
          }}
        >
          Show More
        </Link>
      </>
    </DashboardCard>
  );
};

export default RecentActivity;
