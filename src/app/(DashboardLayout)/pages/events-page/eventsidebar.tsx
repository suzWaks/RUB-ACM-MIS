import React, { useState } from "react";
import { Card, CardContent, Typography, List, ListItem, ListItemText, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EventForm from "./eventform";

interface EventSidebarProps {
    onViewAllEvents: () => void; // Add a prop to handle view change
}

const EventSidebar: React.FC<EventSidebarProps> = ({ onViewAllEvents }) => {
    const [isEventFormOpen, setIsEventFormOpen] = useState(false);

    const handleOpenEventForm = () => setIsEventFormOpen(true);
    const handleCloseEventForm = () => setIsEventFormOpen(false);

    return (
        <>
            <Card>
                <CardContent>
                    <Typography variant="h5">Upcoming Events</Typography>
                    <List>
                        <ListItem>
                            <ListItemText
                                disableTypography
                                primary={
                                    <>
                                        <Typography variant="h6" component="span" fontWeight="bold">
                                            Design Conference
                                        </Typography>
                                        <br />
                                    </>
                                }
                                secondary={
                                    <>
                                        <Typography component="span" variant="body2" color="text.primary">
                                            8 Oct 2024
                                        </Typography>
                                        <br />
                                        <Typography component="span" variant="body2" color="text.secondary">
                                            Venue: International Expo Center
                                        </Typography>
                                    </>
                                }
                            />
                        </ListItem>
                    </List>

                    {/* Trigger view change to show all events */}
                    <Button
                        variant="outlined"
                        fullWidth
                        onClick={onViewAllEvents} // Call the handler to change view
                        sx={{
                            marginTop: 2,
                            color: "#16A1B8",
                            borderColor: "#16A1B8",
                            "&:hover": { borderColor: "#138f9b", color: "#138f9b" },
                        }}
                    >
                        View All Events
                    </Button>

                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        fullWidth
                        onClick={handleOpenEventForm}
                        sx={{
                            marginTop: 2,
                            backgroundColor: "#16A1B8",
                            color: "white",
                            "&:hover": { backgroundColor: "#138f9b" },
                        }}
                    >
                        Add New Event
                    </Button>
                </CardContent>
            </Card>

            {isEventFormOpen && <EventForm onClose={handleCloseEventForm} />}
        </>
    );
};

export default EventSidebar;
