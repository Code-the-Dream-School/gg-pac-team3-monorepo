import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [userType, setUserType] = useState('');

  useEffect(() => {
    // Initialize state from localStorage
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const storedUserName = localStorage.getItem('userName') || '';
    const storedUserType = localStorage.getItem('userType') || '';

    setIsLoggedIn(storedIsLoggedIn);
    setUserName(storedUserName);
    setUserType(storedUserType);
  }, []);

  const handleLogin = (name, type) => {
    setIsLoggedIn(true);
    setUserName(name);
    setUserType(type);

    // Store state in localStorage
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userName', name);
    localStorage.setItem('userType', type);

  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName('');

    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('userType');

  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, userName, userType, handleLogin, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
