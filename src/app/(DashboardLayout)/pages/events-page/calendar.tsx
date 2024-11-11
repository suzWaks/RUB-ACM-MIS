import React, { useEffect, useState } from "react";
import { DateSelectArg, EventClickArg } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import EventForm from "./eventform";
import EventTable from "./eventtable"; // Ensure path is correct
import "./calendar.css";
import EventDetail from "./eventdetails";
import Loading from "@/app/loading";
import dayjs from "dayjs";
import { Button } from "@mui/material";
import theme from "@/utils/theme";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useSession } from "next-auth/react";

interface Event {
  event_id: string;
  event_name: string;
  event_date: string;
  venue: string;
  time: string;
  year: string[];
}

const Calendar: React.FC = () => {
  //User Session
  const { data: session } = useSession();
  const showComponent = session?.user?.role === "admin";
  console.log(showComponent);

  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<DateSelectArg | null>(null);
  const [showEventTable, setShowEventTable] = useState(false); // Track event table visibility
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);

  const handleDateClick = (selected: DateSelectArg) => {
    if (!showComponent) {
      return;
    }
    setSelectedDate(selected);
    setIsFormOpen(true);
  };

  const handleDateClickbtn = () => {
    setIsFormOpen(true);
  };

  // const handleEventClick = (selected: EventClickArg) => {
  //   if (
  //     window.confirm(
  //       `Are you sure you want to delete the event "${selected.event.title}"?`
  //     )
  //   ) {
  //     setCurrentEvents(
  //       currentEvents.filter((event) => event.id !== selected.event.id)
  //     );
  //   }
  // };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedDate(null);
  };

  const handleViewAllEvents = () => {
    setShowEventTable(true); // Show event table
  };

  const handleCloseEventTable = () => {
    setShowEventTable(false); // Close event table and go back to the calendar view
  };

  //------------------------------------------------------------
  // Integration Code

  const [allEvent, setAllEvent] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchAllEvents = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/events/fetchall");
      if (!response.ok) {
        throw new Error("Fetch error");
      }
      const result = await response.json();
      console.log("See: ", result);
      setAllEvent(result);
    } catch (error) {
      setError("Some Error Occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllEvents();
  }, []);

  if (loading) return <Loading />;
  if (showEventTable) {
    return (
      <EventTable
        onClose={handleCloseEventTable}
        // onEdit={handleEdit}
        // onDelete={handleDelete}
      />
    );
  }

  const transformedEvents = allEvent.map((event) => ({
    id: event.event_id,
    title: event.event_name,
    start: event.event_date, // Ensure this is an ISO string or Date object
    allDay: true,
    extendedProps: {
      venue: event.venue,
    },
  }));

  return (
    <div className="calendar-container">
      <div className="event-list-card">
        <div className="event-list-header">Upcoming Events</div>
        <ul className="event-list">
          {allEvent.length <= 0 && (
            <div className="no-events">No Events...</div>
          )}
          {allEvent
            .filter((event) => dayjs().isBefore(dayjs(event.event_date), "day")) // Only upcoming events
            .map((event) => (
              <li className="event-item" key={event.event_id}>
                <div className="event-title">{event.event_name}</div>

                <span className="event-date">
                  {new Date(event.event_date).toLocaleDateString()}
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
        {showComponent && (
          <button className="add-event-button" onClick={handleDateClickbtn}>
            <AddCircleIcon style={{ marginRight: "8px" }} />
            Add an Event
          </button>
        )}

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
          events={transformedEvents}
          eventColor="#6F42C1"
          eventTextColor="#ffffff"
        />
      </div>

      {isFormOpen && <EventForm onClose={handleCloseForm} />}
    </div>
  );
};

export default Calendar;
