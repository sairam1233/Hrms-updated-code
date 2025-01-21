import { useState, useEffect } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import './index.css';

const locales = {
    'en-US': require('date-fns/locale/en-US')
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek: () => startOfWeek(new Date()),
    getDay,
    locales
});

// Event types with colors
const eventTypes = {
    Meeting: '#1E90FF',
    Birthday: '#FF4500',
    Holiday: '#32CD32',
    Conference: '#8A2BE2',
    Workshop: '#FFD700',
    Sports: '#FF6347',
    Music: '#FF69B4',
    Other: '#A9A9A9'
};

const MyCalendar = () => {
    const [events, setEvents] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [newEvent, setNewEvent] = useState({
        title: '',
        date: '',
        startTime: '',
        endTime: '',
        type: ''
    });

    // Fetch existing events from the server
    const fetchEvents = async () => {
        const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];

        if (!token) {
            alert('No JWT token found. Please log in.');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/events', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();

            if (response.ok) {
                // Map event types to colors
                const mappedEvents = data.events.map((event) => ({
                    ...event,
                    start: new Date(`${event.date}T${event.startTime}`),
                    end: new Date(`${event.date}T${event.endTime}`),
                    color: eventTypes[event.type] || eventTypes.Other
                }));

                setEvents(mappedEvents);
            } else {
                alert('Error fetching events: ' + data.message);
            }
        } catch (error) {
            console.error('Error fetching events:', error);
            alert('There was an error fetching the events.');
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewEvent((prevEvent) => ({
            ...prevEvent,
            [name]: value
        }));
    };

    const handleAddEvent = async () => {
        const token = document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1];

        if (!token) {
            alert('No JWT token found. Please log in.');
            return;
        }

        const eventData = {
            title: newEvent.title,
            date: newEvent.date,
            startTime: newEvent.startTime,
            endTime: newEvent.endTime,
            type: newEvent.type
        };

        try {
            const response = await fetch('http://localhost:5000/events', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(eventData)
            });

            const data = await response.json();

            if (response.ok) {
                const addedEvent = {
                    ...eventData,
                    start: new Date(`${newEvent.date}T${newEvent.startTime}`),
                    end: new Date(`${newEvent.date}T${newEvent.endTime}`),
                    color: eventTypes[newEvent.type] || eventTypes.Other
                };
                setEvents([...events, addedEvent]);

                alert('Event added successfully!');
                setNewEvent({
                    title: '',
                    date: '',
                    startTime: '',
                    endTime: '',
                    type: ''
                });
            } else {
                alert('Error adding event: ' + data.message);
            }
        } catch (error) {
            console.error('Error adding event:', error);
            alert('There was an error adding the event.');
        }
    };

    const eventStyleGetter = (event) => {
        return {
            style: {
                backgroundColor: event.color,
                borderRadius: '8px',
                opacity: 0.9,
                color: 'white',
                border: 'none',
                padding: '5px'
            }
        };
    };

    return (
        <div className='Calendar-siderBar'>
            <div style={{ padding: '20px' }} className='calendar-render'>
                <div className="calendar-header">
                    <button className="rbc-btn-group rbc-today-btn" onClick={() => setShowForm(!showForm)}>
                        {showForm ? 'Close Form' : 'Add Event'}
                    </button>
                </div>

                {showForm && (
                    <div className="event-form">
                        <input type="text" name="title" value={newEvent.title} onChange={handleInputChange} placeholder="Event Title" />
                        <input type="date" name="date" value={newEvent.date} onChange={handleInputChange} />
                        <input type="time" name="startTime" value={newEvent.startTime} onChange={handleInputChange} />
                        <input type="time" name="endTime" value={newEvent.endTime} onChange={handleInputChange} />

                        <select name="type" value={newEvent.type} onChange={handleInputChange}>
                            <option value="">Select Type</option>
                            {Object.entries(eventTypes).map(([type, color]) => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>

                        <button className="add-event-btn" onClick={handleAddEvent}>Add Event</button>
                    </div>
                )}

                <div className="event-type-labels">
                    {Object.entries(eventTypes).map(([type, color]) => (
                        <div key={type} style={{ display: 'inline-flex', alignItems: 'center', margin: '5px 10px' }}>
                            <div style={{ width: '10px', height: '10px', backgroundColor: color, borderRadius: '50%', marginRight: '5px' }} />
                            <span>{type}</span>
                        </div>
                    ))}
                </div>

                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 500, marginTop: '20px' }}
                    eventPropGetter={eventStyleGetter}
                />
            </div>
        </div>
    );
};

export default MyCalendar;
