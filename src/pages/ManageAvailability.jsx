import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../api/api';
import { Calendar, Plus, Trash2, CheckCircle2, XCircle, LogOut, ArrowLeft } from 'lucide-react';
import './Admin.css';

const ManageAvailability = () => {
  const [availabilities, setAvailabilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('10:00');
  const [slots, setSlots] = useState([
    { startTime: '09:00', endTime: '10:00', isAvailable: true },
    { startTime: '10:00', endTime: '11:00', isAvailable: true },
    { startTime: '11:00', endTime: '12:00', isAvailable: true },
    { startTime: '14:00', endTime: '15:00', isAvailable: true },
    { startTime: '15:00', endTime: '16:00', isAvailable: true }
  ]);
  const [bulkDays, setBulkDays] = useState(7);
  const [message, setMessage] = useState('');

  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const fetchAvailabilities = async () => {
    try {
      setLoading(true);
      const res = await api.get('/availability');
      setAvailabilities(res.data);
    } catch (err) {
      console.error('Error loading availabilities:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAvailabilities();
  }, []);

  const handleAddSlot = () => {
    if (!startTime || !endTime) return;
    setSlots([...slots, { startTime, endTime, isAvailable: true }]);
  };

  const handleRemoveSlot = (idx) => {
    setSlots(slots.filter((_, i) => i !== idx));
  };

  const handleSaveDate = async (e) => {
    e.preventDefault();
    try {
      await api.post('/admin/availability', {
        date,
        isAvailable: true,
        slots
      });
      setMessage(`Disponibilité enregistrée avec succès pour le ${date}`);
      fetchAvailabilities();
      setTimeout(() => setMessage(''), 4000);
    } catch (err) {
      console.error('Error saving availability:', err);
      alert('Erreur lors de la sauvegarde');
    }
  };

  const handleBulkCreate = async () => {
    try {
      const dateList = [];
      const start = new Date();
      for (let i = 0; i < bulkDays; i++) {
        const d = new Date(start);
        d.setDate(start.getDate() + i);
        if (d.getDay() !== 0) { // Skip Sundays
          dateList.push(d.toISOString().split('T')[0]);
        }
      }

      await api.post('/admin/availability/bulk', {
        dates: dateList,
        slots,
        isAvailable: true
      });

      setMessage(`${dateList.length} dates configurées avec succès !`);
      fetchAvailabilities();
      setTimeout(() => setMessage(''), 4000);
    } catch (err) {
      console.error('Error bulk setting availabilities:', err);
      alert('Erreur lors de la configuration groupée');
    }
  };

  const handleDeleteAvailability = async (id) => {
    if (!window.confirm('Voulez-vous supprimer cette date des disponibilités ?')) return;

    try {
      await api.delete(`/admin/availability/${id}`);
      fetchAvailabilities();
    } catch (err) {
      console.error('Error deleting availability:', err);
    }
  };

  return (
    <div className="admin-layout">
      <header className="admin-navbar">
        <div className="admin-logo">
          <img src="/logo_lingua.JPG" alt="LinguaTech Logo" style={{ height: '36px', borderRadius: '6px' }} />
          <span>LinguaTech Admin</span>
        </div>
        <nav className="admin-nav-links">
          <Link to="/admin/dashboard">Tableau de bord</Link>
          <Link to="/admin/availability" className="active">Disponibilités</Link>
          <Link to="/admin/appointments">Rendez-vous</Link>
          <button onClick={() => { logout(); navigate('/admin/login'); }} className="btn-logout">
            <LogOut size={14} style={{ display: 'inline', marginRight: '4px' }} /> Déconnexion
          </button>
        </nav>
      </header>

      <main className="admin-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h1 style={{ fontSize: '1.8rem', color: '#0f172a' }}>Gestion des Disponibilités</h1>
            <p style={{ color: '#64748b' }}>Définissez les dates et créneaux horaires ouverts à la réservation</p>
          </div>
          <Link to="/admin/dashboard" className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ArrowLeft size={18} /> Retour Tableau de Bord
          </Link>
        </div>

        {message && (
          <div style={{ background: '#d1fae5', borderLeft: '4px solid #10b981', color: '#065f46', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
            {message}
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          {/* Availability Builder Card */}
          <div style={{ background: '#ffffff', padding: '1.75rem', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
            <h3 style={{ fontSize: '1.2rem', color: '#0f172a', marginBottom: '1.25rem' }}>Configuration d'une Journée</h3>
            <form onSubmit={handleSaveDate} className="contact-form">
              <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                <label>Date *</label>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
              </div>

              <div style={{ margin: '1.5rem 0' }}>
                <label style={{ fontWeight: 600, color: '#1e293b', display: 'block', marginBottom: '0.75rem' }}>Créneaux de la journée</label>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                  <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
                  <span style={{ alignSelf: 'center' }}>à</span>
                  <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
                  <button type="button" onClick={handleAddSlot} className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>
                    <Plus size={18} />
                  </button>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {slots.map((s, idx) => (
                    <div key={idx} style={{ background: '#eff6ff', border: '1px solid #bfdbfe', color: '#1e40af', padding: '0.4rem 0.8rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <span>{s.startTime} - {s.endTime}</span>
                      <button type="button" onClick={() => handleRemoveSlot(idx)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}>
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginBottom: '1rem' }}>
                Enregistrer cette date
              </button>

              <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '1.25rem', marginTop: '1.25rem' }}>
                <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '0.75rem' }}>Appliquer cette grille sur plusieurs jours :</p>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <select value={bulkDays} onChange={(e) => setBulkDays(Number(e.target.value))} style={{ flex: 1 }}>
                    <option value={7}>Les 7 prochains jours</option>
                    <option value={14}>Les 14 prochains jours</option>
                    <option value={30}>Les 30 prochains jours</option>
                  </select>
                  <button type="button" onClick={handleBulkCreate} className="btn btn-outline" style={{ whiteSpace: 'nowrap' }}>
                    Génération groupée
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Current Availabilities List */}
          <div className="data-table-container" style={{ height: 'fit-content' }}>
            <div className="table-header">
              <h3 style={{ fontSize: '1.2rem', color: '#0f172a' }}>Dates Ouvertes Actuellement</h3>
              <span style={{ fontSize: '0.85rem', color: '#64748b' }}>{availabilities.length} date(s)</span>
            </div>

            {loading ? (
              <p style={{ textAlign: 'center', color: '#64748b', padding: '2rem' }}>Chargement...</p>
            ) : availabilities.length > 0 ? (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Créneaux Ouverts</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {availabilities.map((avail) => {
                    const openSlotsCount = avail.slots ? avail.slots.filter((s) => s.isAvailable).length : 0;
                    return (
                      <tr key={avail._id}>
                        <td><strong>{avail.date}</strong></td>
                        <td>
                          <span style={{ fontWeight: 600, color: openSlotsCount > 0 ? '#10b981' : '#ef4444' }}>
                            {openSlotsCount} créneaux libres
                          </span>
                        </td>
                        <td>
                          <button
                            onClick={() => handleDeleteAvailability(avail._id)}
                            style={{ background: '#fee2e2', color: '#991b1b', border: 'none', padding: '0.4rem 0.75rem', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.85rem' }}
                          >
                            <Trash2 size={14} /> Supprimer
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <p style={{ textAlign: 'center', color: '#64748b', padding: '2rem' }}>
                Aucune disponibilité enregistrée. Utilisez le formulaire à gauche pour ouvrir des créneaux.
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ManageAvailability;
