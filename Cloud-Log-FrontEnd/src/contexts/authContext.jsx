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
    console.log('AuthProvider initializing, reading token...');
    const t = localStorage.getItem('token');
    if (!t) {
      setLoading(false);
      return;
    }

    const decoded = parseJwt(t);
    if (decoded && decoded.exp * 1000 > Date.now()) {
      setUser({ id: decoded.id, name: decoded.name, email: decoded.email });
      setToken(t);
    } else {
      console.log('AuthProvider token invalid or expired, removing from storage');
      localStorage.removeItem('token');
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
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
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