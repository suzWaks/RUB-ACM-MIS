import { Card, Typography, Stack, Avatar, IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import React from "react";

interface NotificationCardProps {
  message: string;
  time: string;
  date: string;
  postedBy: string;
}

const NotificationCard: React.FC<NotificationCardProps> = ({
  message,
  time,
  date,
  postedBy,
}) => {
  const theme = useTheme();
  const primary = theme.palette.secondary.main;

  return (
    <Card
      elevation={1}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 2,
        borderRadius: "12px",
        marginBottom: 2,
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar
          sx={{ backgroundColor: primary, width: 24, height: 24 }}
        ></Avatar>

        {/* Notification Content */}
        <Stack spacing={0.5}>
          <Typography variant="body1" fontWeight={500}>
            {message}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            at {time} on {date}
          </Typography>
        </Stack>
      </Stack>

      {/* Posted Info and More Options */}
      <Stack direction="row" spacing={1} alignItems="center">
        <Typography variant="caption" color="text.secondary">
          {postedBy} | Posted on {date}
        </Typography>
        <IconButton size="small">
          <MoreVertIcon />
        </IconButton>
      </Stack>
    </Card>
  );
};

export default NotificationCard;
