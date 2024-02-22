import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  // Check for an existing token in localStorage to set the initial isLoggedIn state
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('userToken') ? true : false
  );

  const login = (token) => {
    localStorage.setItem('userToken', token); // Store the token in localStorage
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem('userToken'); // Remove the token from localStorage
    setIsLoggedIn(false);
  };

  // This effect will run once on component mount and check for the token
  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (token) {
      // If a token exists, set the logged-in state to true
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

