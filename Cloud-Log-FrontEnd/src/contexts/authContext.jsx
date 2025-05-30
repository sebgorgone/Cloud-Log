import React, { createContext, useContext, useState, useEffect } from 'react';
import * as jwt_decode from 'jwt-decode';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser]   = useState(null);
  const [token, setToken] = useState(null);

  // On mount, try to load & validate any saved token
  useEffect(() => {
    const t = localStorage.getItem('token');
    if (t) {
      try {
        const decoded = jwt_decode(t);
        // exp is in seconds
        if (decoded.exp * 1000 > Date.now()) {
          setUser({ id: decoded.id, name: decoded.name, email: decoded.email });
          setToken(t);
        } else {
          localStorage.removeItem('token');
        }
      } catch (err) {
        console.error('Invalid token:', err);
        localStorage.removeItem('token');
      }
    }
  }, []);

  // Call this with { token, user }
  const login = ({ token: t, user: u }) => {
    setUser(u);
    setToken(t);
    localStorage.setItem('token', t);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}