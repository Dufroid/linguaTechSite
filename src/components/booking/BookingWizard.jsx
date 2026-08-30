import React, { useState } from 'react';
import BookingCalendar from './BookingCalendar';
import TimeSlotSelector from './TimeSlotSelector';
import AppointmentForm from './AppointmentForm';
import BookingSuccess from './BookingSuccess';
import api from '../../api/api';
import './Booking.css';

const BookingWizard = () => {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [confirmedAppointment, setConfirmedAppointment] = useState(null);

  const handleSelectDate = (date) => {
    setSelectedDate(date);
    setSelectedSlot(null);
    setStep(2);
  };

  const handleSelectSlot = (slot) => {
    setSelectedSlot(slot);
    setStep(3);
  };

  const handleFormSubmit = async (formData) => {
    try {
      setLoading(true);
      setErrorMessage('');

      const payload = {
        ...formData,
        date: selectedDate,
        startTime: selectedSlot.startTime,
        endTime: selectedSlot.endTime
      };

      const res = await api.post('/appointments', payload);
      setConfirmedAppointment(res.data.appointment);
      setStep(4);
    } catch (err) {
      console.error('Booking submission error:', err);
      const msg = err.response?.data?.message || 'Une erreur s’est produite lors de la réservation. Veuillez réessayer.';
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setStep(1);
    setSelectedDate('');
    setSelectedSlot(null);
    setErrorMessage('');
    setConfirmedAppointment(null);
  };

  return (
    <div className="booking-wizard">
      {/* Stepper Header */}
      <div className="stepper">
        <div className={`step-item ${step === 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>
          <div className="step-number">1</div>
          <div className="step-label">Date</div>
        </div>
        <div className={`step-item ${step === 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}>
          <div className="step-number">2</div>
          <div className="step-label">Heure</div>
        </div>
        <div className={`step-item ${step === 3 ? 'active' : ''} ${step > 3 ? 'completed' : ''}`}>
          <div className="step-number">3</div>
          <div className="step-label">Informations</div>
        </div>
        <div className={`step-item ${step === 4 ? 'active' : ''}`}>
          <div className="step-number">4</div>
          <div className="step-label">Confirmation</div>
        </div>
      </div>

      {/* Step Content */}
      {step === 1 && <BookingCalendar selectedDate={selectedDate} onSelectDate={handleSelectDate} />}

      {step === 2 && (
        <>
          <TimeSlotSelector date={selectedDate} selectedSlot={selectedSlot} onSelectSlot={handleSelectSlot} />
          <div className="wizard-actions">
            <button type="button" className="btn-secondary" onClick={() => setStep(1)}>
              ← Choisir une autre date
            </button>
          </div>
        </>
      )}

      {step === 3 && (
        <>
          <AppointmentForm onSubmit={handleFormSubmit} loading={loading} errorMessage={errorMessage} />
          <div className="wizard-actions" style={{ borderTop: 'none', marginTop: '1rem' }}>
            <button type="button" className="btn-secondary" onClick={() => setStep(2)}>
              ← Retour aux heures
            </button>
          </div>
        </>
      )}

      {step === 4 && confirmedAppointment && (
        <BookingSuccess appointment={confirmedAppointment} onReset={handleReset} />
      )}
    </div>
  );
};

export default BookingWizard;
