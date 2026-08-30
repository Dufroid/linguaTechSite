import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import { Clock, Loader2 } from 'lucide-react';

const TimeSlotSelector = ({ date, selectedSlot, onSelectSlot }) => {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!date) return;

    const fetchSlots = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/availability/${date}`);
        setSlots(res.data.slots || []);
      } catch (err) {
        console.error('Error fetching time slots:', err);
        setError('Impossible de charger les heures pour cette date.');
      } finally {
        setLoading(false);
      }
    };

    fetchSlots();
  }, [date]);

  if (loading) {
    return (
      <div style={{ padding: '3rem 0', textAlign: 'center', color: '#64748b' }}>
        <Loader2 className="animate-spin" size={32} style={{ margin: '0 auto 1rem', display: 'block' }} />
        <p>Récupération des horaires pour le {date}...</p>
      </div>
    );
  }

  if (error) {
    return <div style={{ color: '#ef4444', textAlign: 'center', padding: '2rem' }}>{error}</div>;
  }

  return (
    <div className="slot-section">
      <h3>
        <Clock size={22} color="#2d87ee" /> 2. Choisissez une heure ({date})
      </h3>

      <div className="slots-grid">
        {slots.map((slot, idx) => {
          const isSelected = selectedSlot && selectedSlot.startTime === slot.startTime;

          return (
            <button
              key={idx}
              type="button"
              className={`slot-btn ${isSelected ? 'selected' : ''}`}
              disabled={!slot.isAvailable}
              onClick={() => slot.isAvailable && onSelectSlot(slot)}
            >
              <Clock size={16} />
              {slot.startTime} - {slot.endTime}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TimeSlotSelector;
