import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_USERS } from '../data/mockUsers';
import { supabase } from '../lib/supabase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('autoportal_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return MOCK_USERS[0];
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [authError, setAuthError] = useState('');

  // Supabase Auth session listener
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        fetchUserProfile(session.user.id);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        fetchUserProfile(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (userId) => {
    try {
      const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).single();
      if (!error && data) {
        setCurrentUser({
          id: data.id,
          name: data.name,
          username: data.username || `@${data.name.toLowerCase().replace(/\s+/g, '')}`,
          role: data.role || 'comprador',
          avatar: data.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
          coverImage: data.cover_image,
          city: data.city || 'São Paulo, SP',
          bio: data.bio || 'Membro AutoPortal',
          verified: data.verified || false,
          plan: data.plan || 'Grátis',
          phone: data.phone || '(11) 99999-8888',
          rating: Number(data.rating || 5.0)
        });
      }
    } catch (err) {
      console.warn('Profile fetch error:', err);
    }
  };

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('autoportal_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('autoportal_user');
    }
  }, [currentUser]);

  const login = async (email, password) => {
    setAuthError('');
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email || 'autoluxe@motors.com',
        password: password || '123456'
      });

      if (error) {
        // Simulation fallback if auth credentials don't exist yet
        const localMatch = MOCK_USERS.find(u => u.username.includes(email.split('@')[0])) || MOCK_USERS[0];
        setCurrentUser(localMatch);
      } else if (data.user) {
        await fetchUserProfile(data.user.id);
      }
      setIsAuthModalOpen(false);
    } catch (err) {
      const localMatch = MOCK_USERS.find(u => u.username.includes(email.split('@')[0])) || MOCK_USERS[0];
      setCurrentUser(localMatch);
      setIsAuthModalOpen(false);
    }
  };

  const register = async (userData) => {
    setAuthError('');
    try {
      const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password || '123456'
      });

      const userId = data?.user?.id || `user_${Date.now()}`;
      const newUserProfile = {
        id: userId,
        name: userData.name,
        username: `@${userData.name.toLowerCase().replace(/\s+/g, '')}`,
        role: userData.role,
        avatar: userData.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
        city: userData.city || 'São Paulo, SP',
        bio: 'Membro registrado no AutoPortal',
        verified: userData.role === 'garagista',
        plan: userData.role === 'garagista' ? 'Profissional' : 'Grátis',
        phone: '(11) 99999-8888',
        rating: 5.0
      };

      // Save profile to Supabase database
      await supabase.from('profiles').upsert({
        id: userId,
        name: newUserProfile.name,
        username: newUserProfile.username,
        role: newUserProfile.role,
        avatar: newUserProfile.avatar,
        city: newUserProfile.city,
        bio: newUserProfile.bio,
        verified: newUserProfile.verified,
        plan: newUserProfile.plan,
        phone: newUserProfile.phone,
        rating: 5.0
      });

      setCurrentUser(newUserProfile);
      setIsAuthModalOpen(false);
      return newUserProfile;
    } catch (err) {
      console.warn('Register fallback:', err);
    }
  };

  const switchRole = (roleType) => {
    const target = MOCK_USERS.find(u => u.role === roleType);
    if (target) {
      setCurrentUser(target);
    } else {
      setCurrentUser({ ...currentUser, role: roleType });
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
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
      setAuthMode,
      authError
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
