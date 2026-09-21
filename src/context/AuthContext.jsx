import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_USERS } from '../data/mockUsers';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Saved in localStorage if available
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('autoportal_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return MOCK_USERS[0]; // Default logged in as AutoLuxe Motors (Garagista)
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('autoportal_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('autoportal_user');
    }
  }, [currentUser]);

  const login = (email, password) => {
    // Find matching user or fallback to first
    const user = MOCK_USERS.find(u => u.username.includes(email.split('@')[0])) || MOCK_USERS[0];
    setCurrentUser(user);
    setIsAuthModalOpen(false);
    return user;
  };

  const register = (userData) => {
    const newUser = {
      id: `user_${Date.now()}`,
      name: userData.name,
      username: `@${userData.name.toLowerCase().replace(/\s+/g, '')}`,
      role: userData.role, // 'garagista' | 'proprietario' | 'comprador'
      avatar: userData.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      city: userData.city || 'São Paulo, SP',
      bio: userData.bio || 'Novo usuário no AutoPortal',
      verified: userData.role === 'garagista',
      plan: userData.role === 'garagista' ? 'Profissional' : 'Grátis',
      phone: userData.phone || '(11) 99999-8888',
      rating: 5.0,
      totalSales: 0,
      inventoryCount: 0
    };
    setCurrentUser(newUser);
    setIsAuthModalOpen(false);
    return newUser;
  };

  const switchRole = (roleType) => {
    const target = MOCK_USERS.find(u => u.role === roleType);
    if (target) {
      setCurrentUser(target);
    } else {
      setCurrentUser({ ...currentUser, role: roleType });
    }
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      isLoggedIn: !!currentUser,
      login,
      register,
      logout,
      switchRole,
      isAuthModalOpen,
      setIsAuthModalOpen,
      authMode,
      setAuthMode
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
