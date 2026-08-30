import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../api/api';
import { Search, Filter, Trash2, CheckCircle, XCircle, LogOut, ArrowLeft, Eye } from 'lucide-react';
import './Admin.css';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [selectedAppt, setSelectedAppt] = useState(null);

  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const params = {};
      if (search) params.search = search;
      if (statusFilter) params.status = statusFilter;
      if (dateFilter) params.date = dateFilter;

      const res = await api.get('/admin/appointments', { params });
      setAppointments(res.data);
    } catch (err) {
      console.error('Error fetching appointments:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [search, statusFilter, dateFilter]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await api.patch(`/admin/appointments/${id}`, { status: newStatus });
      fetchAppointments();
      if (selectedAppt && selectedAppt._id === id) {
        setSelectedAppt({ ...selectedAppt, status: newStatus });
      }
    } catch (err) {
      console.error('Error updating status:', err);
      alert('Erreur lors de la mise à jour du statut');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer définitivement ce rendez-vous ?')) return;

    try {
      await api.delete(`/admin/appointments/${id}`);
      fetchAppointments();
      if (selectedAppt && selectedAppt._id === id) {
        setSelectedAppt(null);
      }
    } catch (err) {
      console.error('Error deleting appointment:', err);
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
          <Link to="/admin/availability">Disponibilités</Link>
          <Link to="/admin/appointments" className="active">Rendez-vous</Link>
          <button onClick={() => { logout(); navigate('/admin/login'); }} className="btn-logout">
            <LogOut size={14} style={{ display: 'inline', marginRight: '4px' }} /> Déconnexion
          </button>
        </nav>
      </header>

      <main className="admin-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h1 style={{ fontSize: '1.8rem', color: '#0f172a' }}>Gestion des Rendez-vous</h1>
            <p style={{ color: '#64748b' }}>Consultez, confirmez ou annulez les réservations de vos clients</p>
          </div>
          <Link to="/admin/dashboard" className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ArrowLeft size={18} /> Retour Tableau de Bord
          </Link>
        </div>

        {/* Filter Controls */}
        <div style={{ background: '#ffffff', padding: '1.25rem', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ flex: 1, minWidth: '220px', position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input
              type="text"
              placeholder="Rechercher par nom, email, téléphone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: '100%', padding: '0.6rem 0.8rem 0.6rem 2.4rem', border: '1px solid #cbd5e1', borderRadius: '8px' }}
            />
          </div>

          <div style={{ minWidth: '160px' }}>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={{ width: '100%', padding: '0.6rem', border: '1px solid #cbd5e1', borderRadius: '8px' }}>
              <option value="">Tous les statuts</option>
              <option value="confirmed">Confirmé</option>
              <option value="pending">En attente</option>
              <option value="completed">Terminé</option>
              <option value="cancelled">Annulé</option>
            </select>
          </div>

          <div style={{ minWidth: '160px' }}>
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              style={{ width: '100%', padding: '0.6rem', border: '1px solid #cbd5e1', borderRadius: '8px' }}
            />
          </div>

          {(search || statusFilter || dateFilter) && (
            <button
              onClick={() => { setSearch(''); setStatusFilter(''); setDateFilter(''); }}
              style={{ background: '#e2e8f0', color: '#475569', border: 'none', padding: '0.6rem 1rem', borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem' }}
            >
              Réinitialiser
            </button>
          )}
        </div>

        {/* Data Table */}
        <div className="data-table-container">
          {loading ? (
            <p style={{ textAlign: 'center', color: '#64748b', padding: '3rem' }}>Chargement des rendez-vous...</p>
          ) : appointments.length > 0 ? (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Client</th>
                  <th>Contact</th>
                  <th>Date & Créneau</th>
                  <th>Motif</th>
                  <th>Statut</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appt) => (
                  <tr key={appt._id}>
                    <td><strong>{appt.fullName}</strong></td>
                    <td>
                      <div>{appt.email}</div>
                      <div style={{ fontSize: '0.85rem', color: '#64748b' }}>{appt.phone}</div>
                    </td>
                    <td>
                      <div>{appt.date}</div>
                      <div style={{ fontWeight: 600, color: '#2d87ee', fontSize: '0.85rem' }}>
                        {appt.startTime} - {appt.endTime}
                      </div>
                    </td>
                    <td>{appt.subject}</td>
                    <td><span className={`badge ${appt.status}`}>{appt.status}</span></td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.4rem' }}>
                        <button
                          onClick={() => setSelectedAppt(appt)}
                          title="Voir Détails"
                          style={{ background: '#eff6ff', color: '#2563eb', border: 'none', padding: '0.4rem', borderRadius: '6px', cursor: 'pointer' }}
                        >
                          <Eye size={16} />
                        </button>

                        {appt.status !== 'confirmed' && (
                          <button
                            onClick={() => handleStatusChange(appt._id, 'confirmed')}
                            title="Confirmer"
                            style={{ background: '#d1fae5', color: '#059669', border: 'none', padding: '0.4rem', borderRadius: '6px', cursor: 'pointer' }}
                          >
                            <CheckCircle size={16} />
                          </button>
                        )}

                        {appt.status !== 'cancelled' && (
                          <button
                            onClick={() => handleStatusChange(appt._id, 'cancelled')}
                            title="Annuler"
                            style={{ background: '#fee2e2', color: '#dc2626', border: 'none', padding: '0.4rem', borderRadius: '6px', cursor: 'pointer' }}
                          >
                            <XCircle size={16} />
                          </button>
                        )}

                        <button
                          onClick={() => handleDelete(appt._id)}
                          title="Supprimer"
                          style={{ background: '#f1f5f9', color: '#64748b', border: 'none', padding: '0.4rem', borderRadius: '6px', cursor: 'pointer' }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p style={{ textAlign: 'center', color: '#64748b', padding: '3rem' }}>
              Aucun rendez-vous ne correspond à vos critères.
            </p>
          )}
        </div>

        {/* Details Modal */}
        {selectedAppt && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
            <div style={{ background: '#ffffff', padding: '2rem', borderRadius: '16px', maxWidth: '550px', width: '90%', border: '1px solid #e2e8f0', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
              <h3 style={{ fontSize: '1.3rem', color: '#0f172a', marginBottom: '1rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem' }}>
                Fiche Rendez-vous
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div><strong style={{ color: '#64748b', fontSize: '0.85rem' }}>NOM COMPLET :</strong><div>{selectedAppt.fullName}</div></div>
                <div><strong style={{ color: '#64748b', fontSize: '0.85rem' }}>STATUT :</strong><div><span className={`badge ${selectedAppt.status}`}>{selectedAppt.status}</span></div></div>
                <div><strong style={{ color: '#64748b', fontSize: '0.85rem' }}>EMAIL :</strong><div>{selectedAppt.email}</div></div>
                <div><strong style={{ color: '#64748b', fontSize: '0.85rem' }}>TÉLÉPHONE :</strong><div>{selectedAppt.phone}</div></div>
                <div><strong style={{ color: '#64748b', fontSize: '0.85rem' }}>DATE :</strong><div>{selectedAppt.date}</div></div>
                <div><strong style={{ color: '#64748b', fontSize: '0.85rem' }}>CRÉNEAU :</strong><div>{selectedAppt.startTime} - {selectedAppt.endTime}</div></div>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <strong style={{ color: '#64748b', fontSize: '0.85rem' }}>MOTIF :</strong>
                <div>{selectedAppt.subject}</div>
                <strong style={{ color: '#64748b', fontSize: '0.85rem', display: 'block', marginTop: '0.75rem' }}>MESSAGE DU CLIENT :</strong>
                <div style={{ background: '#f8fafc', padding: '0.75rem', borderRadius: '6px', fontSize: '0.9rem', color: '#334155' }}>
                  {selectedAppt.message || 'Aucun message particulier fourni.'}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                <button className="btn-secondary" onClick={() => setSelectedAppt(null)}>Fermer</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Appointments;
