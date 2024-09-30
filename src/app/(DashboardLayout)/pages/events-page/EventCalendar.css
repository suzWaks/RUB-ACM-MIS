/* General calendar styling */
.fc {
    font-family: Arial, sans-serif;
    background-color: #fff;
    border-radius: 20px;
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);
    padding: 20px;
}

/* Header toolbar styling */
.fc-toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
}

.fc-toolbar-title {
    font-size: 20px;
    font-weight: bold;
    color: #333;
}

.fc-button {
    background-color: transparent;
    border: 1px solid transparent;
    padding: 5px 15px;
    margin: 0 2px;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.2s;
}

.fc-button:hover {
    background-color: #e6e6e6;
}

.fc-button-active {
    background-color: #00c7c7;
    color: #fff;
    border: 1px solid #00c7c7;
}

.fc-button-group {
    margin-right: 10px;
    border-radius: 5px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Styling for the day, week, month buttons to look like tabs */
/* Styling for the button group to change default colors */
.fc-button-group .fc-button {
    background-color: #16A1B8;
    /* Change this to your desired default background color */
    color: #333;
    /* Change the text color */
    border: 1px solid #16A1B8;
    /* Change the border color */
    padding: 5px 10px;
    font-size: 12px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.fc-button-group .fc-button:hover {
    background-color: #00a896;
    /* Color when hovering over the button */
    border: 1px solid #00a896;
    /* Change border color on hover */
}


.fc-button-group .fc-button-active {
    background-color: #00c7c7;
    color: #fff;
    border: 1px solid #00c7c7;
}

.fc-dayGridMonth-button:hover,
.fc-button[data-view="dayGridMonth"]:hover {
    background-color: #16A1B8 !important;
    /* Darker Blue when hovering over Month button */
}

.fc-timeGridWeek-button:hover,
.fc-button[data-view="timeGridWeek"]:hover {
    background-color: #16A1B8 !important;
    /* Darker Green when hovering over Week button */
}

.fc-timeGridDay-button:hover,
.fc-button[data-view="timeGridDay"]:hover {
    background-color: #16A1B8 !important;
    /* Darker Yellow when hovering over Day button */
}

.fc-button-group .fc-button:first-child {
    border-radius: 5px 0 0 5px;
}

.fc-button-group .fc-button:last-child {
    border-radius: 0 5px 5px 0;
}

/* Day grid styling */
.fc-daygrid-day {
    border: 1px solid #e6e6e6;
}

.fc-daygrid-day-number {
    padding: 5px;
    color: #333;
    font-weight: 500;
}

.fc-day-today {
    background-color: #f9f9f9;
}

.fc-day-past {
    background-color: #fafafa;
    color: #ccc;
}

/* Event styles */
.fc-event {
    background-color: transparent;
    color: #fff;
    border: none;
    padding: 5px;
    border-radius: 4px;
    font-size: 12px;
    text-align: center;
    cursor: pointer;
}

.fc-event .fc-event-title {
    padding: 0;
}

.fc-daygrid-event-dot {
    display: none;
}

/* Different event types */
.fc-event[data-event-class="conference"] {
    background-color: #7d3fc7;
    border-left: 4px solid #7d3fc7;
    opacity: 0.7;
}

.fc-event[data-event-class="festival"] {
    background-color: #ff69b4;
    border-left: 4px solid #ff69b4;
    opacity: 0.7;
}

.fc-event[data-event-class="highlighted"] {
    background-color: #ffa07a;
    border-left: 4px solid #ffa07a;
    opacity: 0.7;
}

/* Custom overlay for days */
.fc-daygrid-day[data-date="2019-10-01"]::before,
.fc-daygrid-day[data-date="2019-10-31"]::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: repeating-linear-gradient(135deg,
            #d1d8fc,
            #d1d8fc 10px,
            transparent 10px,
            transparent 20px);
    opacity: 0.2;
    pointer-events: none;
}