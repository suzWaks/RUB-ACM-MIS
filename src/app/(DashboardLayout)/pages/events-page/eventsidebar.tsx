"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, Typography, List, ListItem, ListItemText, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

// EventSidebar Component
const EventSidebar: React.FC = () => {
    const router = useRouter();

    // Function to handle the button click
    const handleAddEvent = () => {
        router.push("/eventform"); // Correctly navigate to the EventForm page
    };

    return (
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

                    {/* Add more events as needed */}
                </List>
                <Button
                    variant="outlined"
                    fullWidth
                    sx={{
                        marginTop: 2,
                        color: '#16A1B8',
                        borderColor: '#16A1B8',
                        '&:hover': { borderColor: '#138f9b', color: '#138f9b' },
                    }}
                >
                    View All Events
                </Button>

                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    fullWidth
                    onClick={handleAddEvent} // Add the click handler
                    sx={{
                        marginTop: 2,
                        backgroundColor: '#16A1B8',
                        color: 'white',
                        '&:hover': { backgroundColor: '#138f9b' },
                    }}
                >
                    Add New Event
                </Button>
            </CardContent>
        </Card>
    );
};

export default EventSidebar;
