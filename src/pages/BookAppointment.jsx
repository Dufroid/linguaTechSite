import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BookingWizard from '../components/booking/BookingWizard';

const BookAppointment = () => {
  return (
    <div className="app-container">
      <Navbar />
      <main style={{ paddingTop: '100px', paddingBottom: '60px', background: '#f8fafc', minHeight: '85vh' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h1 className="section-title" style={{ fontSize: '2.5rem', color: '#2d87ee' }}>
              Prendre un Rendez-vous
            </h1>
            <p className="section-subtitle" style={{ maxWidth: '650px', margin: '0.5rem auto 0' }}>
              Choisissez une date et un créneau horaire disponible dans l'agenda de LinguaTech pour échanger avec notre équipe.
            </p>
          </div>

          <BookingWizard />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BookAppointment;
