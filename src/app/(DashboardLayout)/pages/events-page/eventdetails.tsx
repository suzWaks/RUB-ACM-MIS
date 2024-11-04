// EventDetail.tsx
import React from "react";
import {
    Box,
    Card,
    CardContent,
    Typography,
    Button,
} from "@mui/material";

interface EventDetailProps {
    eventData: {
        name: string;
        attendees: string;
        venue: string;
        startDate: string;
        endDate: string;
        startTime: string;
        endTime: string;
        description: string;
        status: string;
    };
    onClose: () => void;
}

const EventDetail: React.FC<EventDetailProps> = ({ eventData, onClose }) => {
    return (
        <Box
            sx={{
                position: "fixed",
                top: 0,
                right: 0,
                width: "84%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                backdropFilter: "blur(10px)",
                zIndex: 9999,
                overflow: "auto",
            }}
        >
            <Card
                sx={{
                    width: "40%",
                    boxShadow: "0px 0px 12px rgba(0, 0, 0, 0.2)",
                    borderRadius: "10px",
                    backgroundColor: "white",
                }}
            >
                <CardContent>
                    <Typography variant="h4" color="purple" fontWeight="bold" gutterBottom>
                        Event Details
                    </Typography>

                    <Typography variant="h6"><strong>Name:</strong> {eventData.name}</Typography>
                    <Typography variant="h6"><strong>Attendees:</strong> {eventData.attendees}</Typography>
                    <Typography variant="h6"><strong>Venue:</strong> {eventData.venue}</Typography>
                    <Typography variant="h6"><strong>Start Date:</strong> {eventData.startDate}</Typography>
                    <Typography variant="h6"><strong>End Date:</strong> {eventData.endDate}</Typography>
                    <Typography variant="h6"><strong>Start Time:</strong> {eventData.startTime}</Typography>
                    <Typography variant="h6"><strong>End Time:</strong> {eventData.endTime}</Typography>
                    <Typography variant="h6"><strong>Description:</strong> {eventData.description}</Typography>
                    <Typography variant="h6"><strong>Status:</strong> {eventData.status}</Typography>

                    <Box sx={{ mt: 2 }}>
                        <Button variant="contained" color="primary" onClick={onClose}>
                            Close
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default EventDetail;
