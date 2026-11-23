import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Accueil from './components/Accueil';
import LanguagePrograms from './components/LanguagePrograms';
import TechPrograms from './components/TechPrograms';
import Opportunities from './components/Opportunities';
import Team from './components/Team';
import Contact from './components/Contact';
import Footer from './components/Footer';

// Pages
import BookAppointment from './pages/BookAppointment';
import AdminLogin from './pages/AdminLogin';
import AdminSetup from './pages/AdminSetup';
import AdminDashboard from './pages/AdminDashboard';
import ManageAvailability from './pages/ManageAvailability';
import Appointments from './pages/Appointments';
import ProtectedRoute from './routes/ProtectedRoute';

import './App.css';

function MainLandingPage() {
  return (
    <div className="app-container">
      <Navbar />
      <main>
        <Hero />
        <Accueil />
        <LanguagePrograms />
        <TechPrograms />
        <Team />
        <Opportunities />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Routes>
      {/* Public Landing Page */}
      <Route path="/" element={<MainLandingPage />} />

      {/* Public Standalone Booking Page */}
      <Route path="/appointment" element={<BookAppointment />} />

      {/* Admin Portal Routes */}
      <Route path="/admin/setup" element={<AdminSetup />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/availability"
        element={
          <ProtectedRoute>
            <ManageAvailability />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/appointments"
        element={
          <ProtectedRoute>
            <Appointments />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
