import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  const handleLogin = (name) => {
    setIsLoggedIn(true);
    setUserName(name);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName('');
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, userName, handleLogin, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
