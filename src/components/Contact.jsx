import React from 'react';
import BookingWizard from './booking/BookingWizard';
import './Contact.css';

const Contact = () => {
  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        <h2 className="section-title">Prendre Rendez-vous</h2>
        <p className="section-subtitle">
          Sélectionnez une date et une heure disponible dans notre agenda en direct, ou contactez-nous directement sur WhatsApp.
        </p>

        <div style={{ marginBottom: '2.5rem' }}>
          <BookingWizard />
        </div>

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <p style={{ color: '#64748b', marginBottom: '1rem', fontWeight: 500 }}>
            Vous préférez discuter directement avec un conseiller LinguaTech ?
          </p>
          <a
            href="https://wa.me/243815861285"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', padding: '0.9rem 1.8rem', borderRadius: '50px', background: '#25D366', color: '#ffffff', fontWeight: 700 }}
          >
            <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="whatsapp-icon" style={{ height: '24px' }} />
            Contactez-nous sur WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;

