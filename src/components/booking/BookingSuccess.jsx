import React from 'react';
import { CheckCircle2, Calendar, Clock, User, Mail, Phone, MapPin } from 'lucide-react';

const BookingSuccess = ({ appointment, onReset }) => {
  return (
    <div className="booking-success-card">
      <div className="success-icon-wrapper">
        <CheckCircle2 size={48} />
      </div>

      <h2 style={{ color: '#1e293b', fontSize: '1.8rem', marginBottom: '0.5rem' }}>
        🎉 Votre rendez-vous est confirmé !
      </h2>
      <p style={{ color: '#64748b', fontSize: '1rem' }}>
        Un email de confirmation contenant tous les détails a été envoyé à <strong>{appointment.email}</strong>.
      </p>

      <div className="summary-box">
        <h4 style={{ color: '#2d87ee', marginBottom: '1rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem' }}>
          Récapitulatif de votre rendez-vous
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div>
            <p style={{ color: '#64748b', fontSize: '0.85rem' }}>Nom Client</p>
            <p style={{ fontWeight: 600, color: '#1e293b' }}>{appointment.fullName}</p>
          </div>
          <div>
            <p style={{ color: '#64748b', fontSize: '0.85rem' }}>Date</p>
            <p style={{ fontWeight: 600, color: '#1e293b' }}>{appointment.date}</p>
          </div>
          <div>
            <p style={{ color: '#64748b', fontSize: '0.85rem' }}>Heure (Kinshasa)</p>
            <p style={{ fontWeight: 600, color: '#2d87ee' }}>
              {appointment.startTime} - {appointment.endTime}
            </p>
          </div>
          <div>
            <p style={{ color: '#64748b', fontSize: '0.85rem' }}>Motif</p>
            <p style={{ fontWeight: 600, color: '#1e293b' }}>{appointment.subject}</p>
          </div>
        </div>
      </div>

      <div style={{ background: '#eff6ff', padding: '1rem', borderRadius: '8px', marginBottom: '2rem', textAlign: 'left' }}>
        <p style={{ margin: 0, fontSize: '0.9rem', color: '#1e40af' }}>
          💡 <strong>Note importante :</strong> Nos bureaux sont situés à Kinshasa. En cas d'empêchement, vous pouvez contacter notre équipe par WhatsApp au +243 815 861 285.
        </p>
      </div>

      <button type="button" className="btn btn-primary" onClick={onReset}>
        Prendre un autre rendez-vous
      </button>
    </div>
  );
};

export default BookingSuccess;
