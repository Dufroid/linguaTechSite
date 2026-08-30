import React, { createContext, useState, useEffect } from 'react';
import api from '../api/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('linguatech_admin_token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminProfile = async () => {
      if (token) {
        try {
          const res = await api.get('/auth/me');
          setAdmin(res.data);
        } catch (error) {
          console.error('Session expired or invalid token');
          logout();
        }
      }
      setLoading(false);
    };

    fetchAdminProfile();
  }, [token]);

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    const { token: newToken, ...adminData } = res.data;
    localStorage.setItem('linguatech_admin_token', newToken);
    setToken(newToken);
    setAdmin(adminData);
    return adminData;
  };

  const logout = () => {
    localStorage.removeItem('linguatech_admin_token');
    setToken(null);
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
