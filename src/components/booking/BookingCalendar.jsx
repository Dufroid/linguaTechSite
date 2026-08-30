import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import { Calendar as CalendarIcon, Loader2 } from 'lucide-react';

const BookingCalendar = ({ selectedDate, onSelectDate }) => {
  const [availabilities, setAvailabilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAvailabilities = async () => {
      try {
        setLoading(true);
        const res = await api.get('/availability');
        setAvailabilities(res.data);
      } catch (err) {
        console.error('Error fetching availabilities:', err);
        setError('Impossible de charger les dates disponibles. Veuillez réessayer.');
      } finally {
        setLoading(false);
      }
    };

    fetchAvailabilities();
  }, []);

  // Format date helper for display
  const formatDateParts = (dateStr) => {
    const date = new Date(dateStr + 'T00:00:00');
    const dayName = date.toLocaleDateString('fr-FR', { weekday: 'short' });
    const dayNum = date.getDate();
    const monthName = date.toLocaleDateString('fr-FR', { month: 'short' });
    return { dayName, dayNum, monthName };
  };

  if (loading) {
    return (
      <div style={{ padding: '3rem 0', textAlign: 'center', color: '#64748b' }}>
        <Loader2 className="animate-spin" size={36} style={{ margin: '0 auto 1rem', display: 'block' }} />
        <p>Recherche des dates disponibles...</p>
      </div>
    );
  }

  if (error) {
    return <div style={{ color: '#ef4444', textAlign: 'center', padding: '2rem' }}>{error}</div>;
  }

  if (availabilities.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#64748b' }}>
        <CalendarIcon size={48} style={{ opacity: 0.5, marginBottom: '1rem' }} />
        <p>Aucun créneau disponible pour le moment. Veuillez revenir très bientôt !</p>
      </div>
    );
  }

  return (
    <div className="calendar-section">
      <h3>
        <CalendarIcon size={22} color="#2d87ee" /> 1. Choisissez une date
      </h3>

      <div className="calendar-grid">
        {availabilities.map((avail) => {
          const { dayName, dayNum, monthName } = formatDateParts(avail.date);
          const isSelected = selectedDate === avail.date;
          const hasSlots = avail.slots && avail.slots.some((s) => s.isAvailable);

          return (
            <div
              key={avail.date}
              className={`date-card ${isSelected ? 'selected' : ''} ${!hasSlots ? 'disabled' : ''}`}
              onClick={() => hasSlots && onSelectDate(avail.date)}
            >
              <div className="day-name">{dayName}</div>
              <div className="day-number">{dayNum}</div>
              <div className="month-year">{monthName}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BookingCalendar;
