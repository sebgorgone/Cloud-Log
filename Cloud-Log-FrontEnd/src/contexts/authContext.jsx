import React, { createContext, useContext, useState, useEffect } from 'react';

function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64    = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const json      = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(json);
  } catch (err) {
    console.error('Failed to parse JWT:', err);
    return null;
  }
}

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser]   = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
  const t = localStorage.getItem('token');
  const stored = localStorage.getItem('user');

  if (!t || !stored) {
    setLoading(false);
    return;
  }

  const decoded = parseJwt(t);
  if (decoded && decoded.exp * 1000 > Date.now()) {
  const timeLeft = decoded.exp * 1000 - Date.now();
  setUser(JSON.parse(stored));
  setToken(t);

  setTimeout(() => {
    logout();
  }, timeLeft);
  } else {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setToken(null);
  }
  setLoading(false);
}, []);

  const login = ({ token: t, user: u }) => {
    setUser(u);
    setToken(t);
    localStorage.setItem('token', t);
    localStorage.setItem('user', JSON.stringify(u));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user')
  };

  const updateUsername = (newName) => {
    setUser(prev => {
      const updated = { ...prev, name: newName };
      localStorage.setItem('user', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading, updateUsername }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export function getUser ()  {
  const data = useContext(AuthContext);
  return({name: data.user.name, ID: data.user.id})
}