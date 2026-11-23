import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/api';
import { UserPlus, Mail, Lock, User, KeyRound, ShieldCheck, Eye, EyeOff, AlertCircle, CheckCircle2 } from 'lucide-react';
import './Admin.css';

const AdminSetup = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    setupKey: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const getPasswordStrength = (pwd) => {
    if (!pwd) return { level: 0, label: '', color: '#e2e8f0' };
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    const levels = [
      { level: 1, label: 'Faible', color: '#ef4444' },
      { level: 2, label: 'Moyen', color: '#f97316' },
      { level: 3, label: 'Bon', color: '#eab308' },
      { level: 4, label: 'Fort', color: '#22c55e' }
    ];
    return levels[score - 1] || { level: 0, label: '', color: '#e2e8f0' };
  };

  const strength = getPasswordStrength(form.password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (form.password !== form.confirmPassword) {
      return setError('Les mots de passe ne correspondent pas.');
    }
    if (form.password.length < 6) {
      return setError('Le mot de passe doit contenir au moins 6 caractères.');
    }

    try {
      setLoading(true);
      await api.post('/auth/create-admin', {
        name: form.name,
        email: form.email,
        password: form.password,
        setupKey: form.setupKey
      });
      setSuccess(true);
      setTimeout(() => navigate('/admin/login'), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de la création du compte administrateur.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="admin-login-wrapper" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)' }}>
        <div className="admin-login-card" style={{ textAlign: 'center', padding: '3rem 2rem' }}>
          <div style={{ width: '72px', height: '72px', background: '#d1fae5', color: '#10b981', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
            <CheckCircle2 size={40} />
          </div>
          <h2 style={{ color: '#0f172a', fontSize: '1.6rem', marginBottom: '0.5rem' }}>Compte créé avec succès !</h2>
          <p style={{ color: '#64748b', marginBottom: '0.5rem' }}>Votre compte administrateur <strong>{form.email}</strong> est prêt.</p>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Redirection vers la page de connexion dans 3 secondes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-login-wrapper" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)', minHeight: '100vh' }}>
      <div style={{ width: '100%', maxWidth: '500px', padding: '1rem' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <img src="/logo_lingua.JPG" alt="LinguaTech Logo" style={{ height: '60px', borderRadius: '10px', marginBottom: '1rem', boxShadow: '0 4px 15px rgba(0,0,0,0.3)' }} />
          <h1 style={{ color: '#ffffff', fontSize: '1.8rem', fontWeight: 800, margin: 0 }}>LinguaTech</h1>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginTop: '0.25rem' }}>Création de compte administrateur</p>
        </div>

        {/* Form Card */}
        <div style={{ background: '#ffffff', borderRadius: '16px', padding: '2.5rem', boxShadow: '0 20px 60px rgba(0,0,0,0.4)', border: '1px solid #e2e8f0' }}>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem', paddingBottom: '1.25rem', borderBottom: '1px solid #f1f5f9' }}>
            <div style={{ width: '44px', height: '44px', background: '#eff6ff', color: '#2d87ee', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <UserPlus size={22} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.2rem', color: '#0f172a', margin: 0 }}>Créer votre compte</h2>
              <p style={{ fontSize: '0.8rem', color: '#64748b', margin: 0 }}>Remplissez les informations ci-dessous</p>
            </div>
          </div>

          {error && (
            <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderLeft: '4px solid #ef4444', color: '#991b1b', padding: '0.85rem 1rem', borderRadius: '8px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
              <AlertCircle size={18} style={{ flexShrink: 0 }} />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="contact-form">

            {/* Nom complet */}
            <div className="form-group" style={{ marginBottom: '1.25rem' }}>
              <label style={{ fontWeight: 600, color: '#374151', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.5rem' }}>
                <User size={15} color="#2d87ee" /> Nom complet *
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Ex: Jean Dupont"
                required
              />
            </div>

            {/* Email */}
            <div className="form-group" style={{ marginBottom: '1.25rem' }}>
              <label style={{ fontWeight: 600, color: '#374151', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.5rem' }}>
                <Mail size={15} color="#2d87ee" /> Adresse Email *
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="admin@linguatech.com"
                required
              />
            </div>

            {/* Mot de passe */}
            <div className="form-group" style={{ marginBottom: '0.5rem' }}>
              <label style={{ fontWeight: 600, color: '#374151', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.5rem' }}>
                <Lock size={15} color="#2d87ee" /> Mot de passe *
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Minimum 6 caractères"
                  required
                  style={{ paddingRight: '2.75rem' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Force du mot de passe */}
            {form.password && (
              <div style={{ marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', gap: '4px', marginBottom: '4px' }}>
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} style={{ flex: 1, height: '4px', borderRadius: '2px', background: i <= strength.level ? strength.color : '#e2e8f0', transition: 'background 0.3s' }} />
                  ))}
                </div>
                {strength.label && <p style={{ fontSize: '0.78rem', color: strength.color, margin: 0, fontWeight: 600 }}>Force : {strength.label}</p>}
              </div>
            )}

            {/* Confirmer mot de passe */}
            <div className="form-group" style={{ marginBottom: '1.25rem' }}>
              <label style={{ fontWeight: 600, color: '#374151', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.5rem' }}>
                <Lock size={15} color="#2d87ee" /> Confirmer le mot de passe *
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showConfirm ? 'text' : 'password'}
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Répétez votre mot de passe"
                  required
                  style={{ paddingRight: '2.75rem', borderColor: form.confirmPassword && form.password !== form.confirmPassword ? '#ef4444' : '' }}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {form.confirmPassword && form.password !== form.confirmPassword && (
                <p style={{ fontSize: '0.8rem', color: '#ef4444', marginTop: '4px' }}>Les mots de passe ne correspondent pas</p>
              )}
            </div>

            {/* Clé de configuration */}
            <div className="form-group" style={{ marginBottom: '1.75rem' }}>
              <label style={{ fontWeight: 600, color: '#374151', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.5rem' }}>
                <KeyRound size={15} color="#2d87ee" /> Clé de configuration
              </label>
              <input
                type="text"
                name="setupKey"
                value={form.setupKey}
                onChange={handleChange}
                placeholder="Obligatoire si un admin existe déjà"
              />
              <p style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '4px' }}>
                Laissez vide si vous êtes le <strong>premier administrateur</strong>. Sinon, utilisez la clé <code>SETUP_KEY</code> définie dans le fichier <code>.env</code> du backend.
              </p>
            </div>

            {/* Info box */}
            <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '8px', padding: '0.85rem 1rem', marginBottom: '1.75rem', display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
              <ShieldCheck size={18} color="#2d87ee" style={{ flexShrink: 0, marginTop: '1px' }} />
              <p style={{ fontSize: '0.82rem', color: '#1e40af', margin: 0, lineHeight: 1.5 }}>
                Ce compte vous donnera un accès complet au portail d'administration : tableau de bord, gestion des disponibilités et des rendez-vous.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
              style={{ width: '100%', padding: '0.9rem', fontSize: '1rem', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
            >
              {loading ? 'Création en cours...' : (
                <><UserPlus size={20} /> Créer mon compte administrateur</>
              )}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid #f1f5f9' }}>
            <p style={{ color: '#64748b', fontSize: '0.88rem', marginBottom: '0.5rem' }}>Vous avez déjà un compte ?</p>
            <Link to="/admin/login" style={{ color: '#2d87ee', fontWeight: 700, fontSize: '0.9rem' }}>
              → Se connecter à l'espace admin
            </Link>
          </div>
          <div style={{ textAlign: 'center', marginTop: '0.75rem' }}>
            <Link to="/" style={{ color: '#94a3b8', fontSize: '0.82rem' }}>← Retour au site LinguaTech</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSetup;
