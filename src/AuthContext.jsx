import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Initialize state from localStorage
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const storedUserName = localStorage.getItem('userName') || '';

    setIsLoggedIn(storedIsLoggedIn);
    setUserName(storedUserName);
  }, []);

  const handleLogin = (name) => {
    setIsLoggedIn(true);
    setUserName(name);

    // Store state in localStorage
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userName', name);
  };

  const handleLogout = () => {
    
    setIsLoggedIn(false);
    setUserName('');

    localStorage.removeItem('authToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('isLoggedIn');
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
