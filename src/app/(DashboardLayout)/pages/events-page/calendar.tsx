import React, { useState } from "react";
import { DateSelectArg, EventClickArg } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import EventForm from "./eventform";
import EventTable from "./eventtable"; // Ensure path is correct
import "./calendar.css";
import EventDetail from "./eventdetails";

interface CalendarEvent {
    id: string;
    title: string;
    start: string;
    end?: string;
    allDay?: boolean;
    venue?: string;
}

const Calendar: React.FC = () => {
    const [currentEvents, setCurrentEvents] = useState<CalendarEvent[]>([
        {
            id: "1",
            title: "Sample Event 1",
            start: new Date().toISOString(),
            allDay: true,
            venue: "ITS Hall",
        },
        {
            id: "2",
            title: "Sample Event 2",
            start: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(),
            allDay: true,
            venue: "ITS Hall",
        },
    ]);

    const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
    const [selectedDate, setSelectedDate] = useState<DateSelectArg | null>(null);
    const [showEventTable, setShowEventTable] = useState(false); // Track event table visibility
    const [selectedEvent, setSelectedEvent] = useState<any | null>(null);
    const handleDateClick = (selected: DateSelectArg) => {
        setSelectedDate(selected);
        setIsFormOpen(true);
    };

    const handleEventClick = (selected: EventClickArg) => {
        if (window.confirm(`Are you sure you want to delete the event "${selected.event.title}"?`)) {
            setCurrentEvents(currentEvents.filter(event => event.id !== selected.event.id));
        }
    };

    const handleCloseForm = () => {
        setIsFormOpen(false);
        setSelectedDate(null);
    };

    const handleAddEvent = (eventData: any) => {
        const newEvent: CalendarEvent = {
            id: `${new Date().getTime()}`,
            title: eventData.name,
            start: selectedDate ? selectedDate.startStr : eventData.startDate,
            end: eventData.endDate,
            allDay: selectedDate ? selectedDate.allDay : false,
            venue: eventData.venue,
        };

        setCurrentEvents([...currentEvents, newEvent]);
        handleCloseForm();
    };

    const handleViewAllEvents = () => {
        setShowEventTable(true); // Show event table
    };

    const handleCloseEventTable = () => {
        setShowEventTable(false); // Close event table and go back to the calendar view
    };

    const handleEdit = (event: CalendarEvent) => {
        // Open an edit form or perform any edit logic here
        console.log("Editing event:", event);
    };

    const handleDelete = (eventId: string) => {
        setCurrentEvents((prevEvents) => prevEvents.filter((event) => event.id !== eventId));
    };

    if (showEventTable) {
        return (
            <EventTable
                events={currentEvents}
                onClose={handleCloseEventTable}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
        );
    }

    return (
        <div className="calendar-container">
            <div className="event-list-card">
                <div className="event-list-header">Upcoming Events</div>
                <ul className="event-list">
                    {currentEvents.length <= 0 && (
                        <div className="no-events">No Events Present</div>
                    )}
                    {currentEvents.map((event) => (
                        <li className="event-item" key={event.id}>
                            <div className="event-title">{event.title}</div>
                            <span className="event-date">
                                {new Date(event.start).toLocaleDateString()}
                            </span>
                            <span>, </span>
                            <span className="event-venue">{event.venue}</span>
                        </li>
                    ))}
                </ul>
                <button className="view-all-button" onClick={handleViewAllEvents}>
                    View All Events
                </button>
            </div>

            <div className="calendar-card">
                <FullCalendar
                    height={"85vh"}
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    headerToolbar={{
                        left: "prev,next",
                        center: "title",
                        right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
                    }}
                    initialView="dayGridMonth"
                    editable={true}
                    selectable={true}
                    selectMirror={true}
                    dayMaxEvents={true}
                    select={handleDateClick}
                    eventClick={handleEventClick}
                    events={currentEvents}
                    eventColor="#6F42C1"
                    eventTextColor="#ffffff"
                />
            </div>

            {isFormOpen && (
                <EventForm
                    onClose={handleCloseForm}
                    onSubmit={handleAddEvent}
                />
            )}
        </div>
    );
};

export default Calendar;
