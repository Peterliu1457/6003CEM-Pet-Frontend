import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

interface AuthContextData {
  user: any;
  login: (token: string) => void;
  logout: () => void;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextData>({
  user: null,
  login: () => {},
  logout: () => {},
  isLoading: false,
});

export const AuthProvider: React.FC<{children: JSX.Element}> = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserProfile(token);
    } else {
      setIsLoading(false);
    }
  }, []);

  const fetchUserProfile = async (token: string) => {
    try {
      const response = await axios.get('/api/users/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setIsLoading(false);
    }
  };

  const login = (token: string) => {
    localStorage.setItem('token', token);
    fetchUserProfile(token);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);