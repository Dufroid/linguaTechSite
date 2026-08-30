import React, { useState } from 'react';
import { User, Mail, Phone, BookOpen, MessageSquare } from 'lucide-react';

const AppointmentForm = ({ onSubmit, loading, errorMessage }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: 'Inscription à une formation',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="form-section">
      <h3>
        <User size={22} color="#2d87ee" /> 3. Vos coordonnées
      </h3>

      {errorMessage && (
        <div style={{ background: '#fef2f2', borderLeft: '4px solid #ef4444', color: '#991b1b', padding: '1rem', borderRadius: '6px', marginBottom: '1.5rem' }}>
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-row">
          <div className="form-group half">
            <label htmlFor="fullName">Nom complet *</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Ex: Jean Dupont"
              required
            />
          </div>
          <div className="form-group half">
            <label htmlFor="email">Adresse Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Ex: jean.dupont@gmail.com"
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group half">
            <label htmlFor="phone">Téléphone / WhatsApp *</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Ex: +243 815 861 285"
              required
            />
          </div>
          <div className="form-group half">
            <label htmlFor="subject">Motif du rendez-vous *</label>
            <select id="subject" name="subject" value={formData.subject} onChange={handleChange} required>
              <option value="Inscription à une formation">Inscription à une formation</option>
              <option value="Demande d'information">Demande d'information</option>
              <option value="Formation en entreprise">Formation en entreprise</option>
              <option value="Coaching / Accompagnement">Coaching / Accompagnement</option>
              <option value="Développement web/mobile">Développement web/mobile</option>
              <option value="Intelligence Artificielle">Intelligence Artificielle</option>
              <option value="Autre">Autre service...</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="message">Message ou précision complémentaire (Facultatif)</label>
          <textarea
            id="message"
            name="message"
            rows="3"
            value={formData.message}
            onChange={handleChange}
            placeholder="Informez-nous de vos besoins spécifiques..."
          ></textarea>
        </div>

        <div className="wizard-actions">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Réservation en cours...' : 'Confirmer le Rendez-vous'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AppointmentForm;
