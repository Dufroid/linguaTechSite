import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Lock } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHomePage = location.pathname === '/';

  return (
    <header className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        <Link to="/" className="logo" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <img src="/logo_lingua.JPG" alt="LinguaTech Logo" style={{ height: '48px', width: 'auto', borderRadius: '8px', objectFit: 'contain', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }} className="logo-image" />
          <span className="logo-text">LinguaTech</span>
        </Link>

        <nav className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
          {isHomePage ? (
            <>
              <a href="#accueil" onClick={() => setMobileMenuOpen(false)}>Accueil</a>
              <a href="#languages" onClick={() => setMobileMenuOpen(false)}>Langues</a>
              <a href="#technology" onClick={() => setMobileMenuOpen(false)}>Technologie</a>
              <a href="#equipe" onClick={() => setMobileMenuOpen(false)}>Équipe</a>
              <a href="#opportunities" onClick={() => setMobileMenuOpen(false)}>Opportunités</a>
            </>
          ) : (
            <Link to="/" onClick={() => setMobileMenuOpen(false)}>Accueil Site</Link>
          )}
          <Link to="/appointment" className="btn btn-primary nav-cta" onClick={() => setMobileMenuOpen(false)}>
            Prendre Rendez-vous!
          </Link>
          <Link to="/admin/login" style={{ fontSize: '0.85rem', color: '#94a3b8', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }} onClick={() => setMobileMenuOpen(false)} title="Espace Admin">
            <Lock size={14} /> Admin
          </Link>
        </nav>

        <button
          className="mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
    </header>
  );
};

export default Navbar;

