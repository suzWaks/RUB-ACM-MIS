"use client";

import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  Box,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import EventNoteIcon from "@mui/icons-material/EventNote";
import { useTheme } from "@mui/material/styles";
import "./EventCalendar.css";

interface Event {
  name: string;
  date: Date;
}

interface EventCalendarProps {
  events: Event[];
}

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const EventCalendar: React.FC<EventCalendarProps> = ({ events }) => {
  const theme = useTheme();
  const [selectedDate, setSelectedDate] = useState<Value>(new Date());
  const [highlightedDate, setHighlightedDate] = useState<Date | null>(null);

  const handleDateChange = (value: Value) => {
    setSelectedDate(value);
    setHighlightedDate(null);
  };

  const handleEventClick = (date: Date) => {
    setSelectedDate(date);
    setHighlightedDate(date);
    setTimeout(() => setHighlightedDate(null), 500);
  };

  const hasEvent = (date: Date): boolean => {
    return events.some((event) => {
      return (
        event.date.getFullYear() === date.getFullYear() &&
        event.date.getMonth() === date.getMonth() &&
        event.date.getDate() === date.getDate()
      );
    });
  };

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f5f5f5",
        borderRadius: 1,
        overflow: "hidden",
      }}
    >
      <Grid container spacing={0} sx={{ flexGrow: 1, height: "100%" }}>
        <Grid item xs={12} md={6} sx={{ height: "100%", borderRight: "none" }}>
          <Paper
            elevation={2}
            sx={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              height: "100%",
              margin: 0,
              padding: 0,
              backgroundColor: "#ffffff",
              border: "1px solid #ccc", // Maintain the border for the events list
              borderRight: "none", // Remove the right border
              overflowY: "auto",
            }}
          >
            <Typography
              variant="h5"
              align="center"
              sx={{
                color: theme.palette.secondary.main,
                paddingTop: 4,
                paddingBottom: 3,
              }}
            >
              Upcoming Events
            </Typography>
            <List dense sx={{ padding: 0 }}>
              {events.map((event, index) => (
                <ListItem key={index} sx={{ padding: 0 }}>
                  <Card
                    sx={{
                      width: "100%",
                      margin: "4px 0",
                      boxShadow: 0,
                      transition: "transform 0.3s",
                      "&:hover": {
                        transform: "scale(1.02)",
                        boxShadow: 1,
                      },
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                    onClick={() => handleEventClick(event.date)}
                  >
                    <CardContent sx={{ display: "flex", alignItems: "center" }}>
                      <EventNoteIcon
                        sx={{
                          color: theme.palette.secondary.main,
                          marginRight: 1,
                        }}
                      />
                      <ListItemText
                        primary={event.name}
                        secondary={event.date.toLocaleDateString()}
                        primaryTypographyProps={{
                          fontWeight: "bold",
                          fontSize: "1rem",
                        }}
                        secondaryTypographyProps={{
                          variant: "body2",
                          color: "text.secondary",
                        }}
                      />
                    </CardContent>
                  </Card>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6} sx={{ height: "100%" }}>
          <Paper
            elevation={2}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              width: "100%",
              margin: 0,
              padding: 0,
              backgroundColor: "#ffffff",
              border: "1px solid #ccc", // Maintain the border for the calendar
              borderRadius: 0,
              overflow: "hidden",
            }}
          >
            <Calendar
              onChange={handleDateChange}
              value={selectedDate}
              tileClassName={({ date }) =>
                highlightedDate &&
                date.toISOString().split("T")[0] ===
                  highlightedDate.toISOString().split("T")[0]
                  ? "highlight-tile"
                  : ""
              }
              tileContent={({ date, view }) =>
                view === "month" && hasEvent(date) ? (
                  <div
                    style={{
                      width: 5,
                      height: 5,
                      backgroundColor: "blue",
                      borderRadius: "50%",
                      margin: "auto",
                    }}
                  ></div>
                ) : null
              }
              className="custom-calendar"
              showNeighboringMonth={false}
            />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EventCalendar;
