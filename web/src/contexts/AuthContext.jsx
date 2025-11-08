import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on app start
    const initializeAuth = () => {
      try {
        const loggedInUser = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        const adminData = localStorage.getItem('admin');

        if (loggedInUser) {
          const userData = JSON.parse(loggedInUser);
          setUser(userData);
        } else if (adminData) {
          // If admin data exists but user data doesn't, use admin data
          const adminUser = JSON.parse(adminData);
          setUser(adminUser);
          localStorage.setItem('user', JSON.stringify(adminUser));
        }

        // If token exists but no user data, you might want to fetch user data here
        if (token && !loggedInUser && !adminData) {
          // Optionally: Fetch user data using the token
          console.log('Token exists but no user data found');
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        // Clear corrupted data
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('admin');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = (userData, token = null) => {
    try {
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      
      if (token) {
        localStorage.setItem('token', token);
      }

      // If user is admin, also store in admin storage for easy access
      if (userData.role === 'admin') {
        localStorage.setItem('admin', JSON.stringify(userData));
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const logout = () => {
    try {
      setUser(null);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('admin');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const updateUser = (updatedUserData) => {
    try {
      const mergedUser = { ...user, ...updatedUserData };
      setUser(mergedUser);
      localStorage.setItem('user', JSON.stringify(mergedUser));

      // Also update admin storage if user is admin
      if (mergedUser.role === 'admin') {
        localStorage.setItem('admin', JSON.stringify(mergedUser));
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const isAuthenticated = () => {
    return !!user;
  };

  const isAdmin = () => {
    return user?.role === 'admin';
  };

  const hasRole = (role) => {
    return user?.role === role;
  };

  const getUserRole = () => {
    return user?.role || null;
  };

  const value = {
    user,
    login,
    logout,
    updateUser,
    isAuthenticated,
    isAdmin,
    hasRole,
    getUserRole,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};