import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../api/api';
import { Calendar, Clock, CheckCircle, Users, LogOut, Settings, ListFilter, ArrowRight } from 'lucide-react';
import './Admin.css';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const { admin, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/admin/dashboard');
        setStats(res.data);
      } catch (err) {
        console.error('Error fetching dashboard stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="admin-layout">
      <header className="admin-navbar">
        <div className="admin-logo">
          <img src="/logo_lingua.JPG" alt="LinguaTech Logo" style={{ height: '36px', borderRadius: '6px' }} />
          <span>LinguaTech Admin</span>
        </div>
        <nav className="admin-nav-links">
          <Link to="/admin/dashboard" className="active">Tableau de bord</Link>
          <Link to="/admin/availability">Disponibilités</Link>
          <Link to="/admin/appointments">Rendez-vous</Link>
          <button onClick={handleLogout} className="btn-logout">
            <LogOut size={14} style={{ display: 'inline', marginRight: '4px' }} /> Déconnexion
          </button>
        </nav>
      </header>

      <main className="admin-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h1 style={{ fontSize: '1.8rem', color: '#0f172a' }}>Bienvenue, {admin?.name || 'Administrateur'} 👋</h1>
            <p style={{ color: '#64748b' }}>Aperçu global de l'activité de vos rendez-vous LinguaTech</p>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Link to="/admin/availability" className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Settings size={18} /> Gérer Disponibilités
            </Link>
            <Link to="/admin/appointments" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ListFilter size={18} /> Voir Tous Rendez-vous
            </Link>
          </div>
        </div>

        {loading ? (
          <p style={{ textAlign: 'center', color: '#64748b', padding: '3rem' }}>Chargement des statistiques...</p>
        ) : stats ? (
          <>
            {/* Stats Cards */}
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon blue">
                  <Clock size={26} />
                </div>
                <div className="stat-info">
                  <h4>Aujourd'hui</h4>
                  <div className="stat-value">{stats.todayCount}</div>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon purple">
                  <Calendar size={26} />
                </div>
                <div className="stat-info">
                  <h4>Cette Semaine</h4>
                  <div className="stat-value">{stats.weekCount}</div>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon green">
                  <CheckCircle size={26} />
                </div>
                <div className="stat-info">
                  <h4>Confirmés</h4>
                  <div className="stat-value">{stats.confirmedCount}</div>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon orange">
                  <Users size={26} />
                </div>
                <div className="stat-info">
                  <h4>Total Général</h4>
                  <div className="stat-value">{stats.totalCount}</div>
                </div>
              </div>
            </div>

            {/* Upcoming Appointments */}
            <div className="data-table-container">
              <div className="table-header">
                <h3 style={{ fontSize: '1.2rem', color: '#0f172a' }}>Prochains Rendez-vous</h3>
                <Link to="/admin/appointments" style={{ color: '#2d87ee', fontWeight: 600, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  Voir l'historique complet <ArrowRight size={16} />
                </Link>
              </div>

              {stats.upcomingAppointments && stats.upcomingAppointments.length > 0 ? (
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Client</th>
                      <th>Email / Téléphone</th>
                      <th>Date</th>
                      <th>Créneau</th>
                      <th>Motif</th>
                      <th>Statut</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.upcomingAppointments.map((appt) => (
                      <tr key={appt._id}>
                        <td><strong>{appt.fullName}</strong></td>
                        <td>
                          <div>{appt.email}</div>
                          <div style={{ fontSize: '0.85rem', color: '#64748b' }}>{appt.phone}</div>
                        </td>
                        <td>{appt.date}</td>
                        <td><span style={{ fontWeight: 600, color: '#2d87ee' }}>{appt.startTime} - {appt.endTime}</span></td>
                        <td>{appt.subject}</td>
                        <td><span className={`badge ${appt.status}`}>{appt.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p style={{ textAlign: 'center', color: '#64748b', padding: '2rem' }}>
                  Aucun rendez-vous à venir pour le moment.
                </p>
              )}
            </div>
          </>
        ) : null}
      </main>
    </div>
  );
};

export default AdminDashboard;
