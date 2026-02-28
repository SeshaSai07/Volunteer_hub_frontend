import { useState, useEffect } from 'react';
import { getCalendarEvents } from '../api/eventService';
import './CalendarPage.css';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const CalendarPage = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [current, setCurrent] = useState(new Date());

    useEffect(() => {
        getCalendarEvents().then(res => setEvents(res.data || [])).catch(() => { }).finally(() => setLoading(false));
    }, []);

    const year = current.getFullYear();
    const month = current.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const getEventsForDay = (day) => {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        return events.filter(ev => ev.start?.startsWith(dateStr));
    };

    const cells = [];
    for (let i = 0; i < firstDay; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);

    const today = new Date();

    return (
        <div className="page-container">
            <h1 className="section-title">Events <span>Calendar</span></h1>
            <div className="cal-nav">
                <button className="btn btn-secondary" onClick={() => setCurrent(new Date(year, month - 1, 1))}>←</button>
                <span className="cal-month">{MONTHS[month]} {year}</span>
                <button className="btn btn-secondary" onClick={() => setCurrent(new Date(year, month + 1, 1))}>→</button>
            </div>
            {loading ? (
                <div className="loading-screen"><div className="spinner" /></div>
            ) : (
                <div className="cal-grid-wrapper">
                    <div className="cal-header">
                        {DAYS.map(d => <div key={d} className="cal-day-name">{d}</div>)}
                    </div>
                    <div className="cal-grid">
                        {cells.map((day, i) => {
                            const isToday = day && year === today.getFullYear() && month === today.getMonth() && day === today.getDate();
                            const dayEvents = day ? getEventsForDay(day) : [];
                            return (
                                <div key={i} className={`cal-cell ${day ? '' : 'empty'} ${isToday ? 'today' : ''}`}>
                                    {day && <span className="cal-date">{day}</span>}
                                    {dayEvents.map(ev => (
                                        <div key={ev.id} className="cal-event" title={ev.title}>{ev.title}</div>
                                    ))}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Upcoming list */}
            <h2 style={{ marginTop: '3rem', marginBottom: '1rem', fontFamily: 'Outfit', fontSize: '1.2rem' }}>Upcoming Events</h2>
            {events.slice(0, 10).map(ev => (
                <div key={ev.id} className="card" style={{ marginBottom: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <span style={{ fontWeight: 500 }}>{ev.title}</span>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{new Date(ev.start).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>
            ))}
        </div>
    );
};

export default CalendarPage;
