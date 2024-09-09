import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SignIn from './signIn';  
import SignUp from './SignUp';
import ForgotPassword from './ForgotPasswordForm';  
import styles from './nav.module.css';
import { useAuth } from '../../AuthContext';
import logo from '../../assets/logos/blue.png';
import { useNavigate } from 'react-router-dom';

const Nav = ({ isLoggedIn, onLogout }) => {
  const [activeForm, setActiveForm] = useState(null);
  const navigate = useNavigate();
  const { userName, handleLogin, userType } = useAuth();

  const navLinks = isLoggedIn
    ? [
        { id: 1, link: `Welcome ${userName || 'User'}` },
        { id: 2, link: 'Dashboard' },
        { id: 3, link: 'Logout' },
      ]
    : [
        { id: 1, link: 'Login' },
        { id: 2, link: 'Register' },
      ];

  const switchForm = (link) => {
    switch (link) {
      case 'Register':
        setActiveForm('SignUp');
        break;
      case 'Login':
        setActiveForm('SignIn');
        break;
      case 'Logout':
        onLogout();
        setActiveForm(null); // Close the form after logout
        navigate('/');
        break;
      case 'Dashboard':
        if (userType === 'Student') {
          navigate('/UserDashboard/home'); // Navigate to Student Dashboard
        } else if (userType === 'Teacher') {
          navigate('/teacher/dashboard'); // Navigate to Teacher Dashboard
        }
        break;
      case 'ForgotPassword': // Trigger ForgotPassword form
        setActiveForm('ForgotPassword');
        break;
      default:
        setActiveForm(null);
    }
  };

  useEffect(() => {
    // This effect will run when isLoggedIn changes
    if (isLoggedIn) {
      // Fetch the user's name from localStorage if it's not already set
      const storedName = localStorage.getItem('userName');
      if (storedName && !userName) {
        handleLogin(storedName, localStorage.getItem('userType'));
      }
    }
  }, [isLoggedIn, userName, handleLogin]);

  return (
    <div className={styles.nav}>
      <img src={logo} alt='Logo' className={styles.logo} />
      <div className={styles.navLinks}>
        {navLinks.map((navLink) => (
          <span
            key={navLink.id}
            className={styles.navLink}
            onClick={() => switchForm(navLink.link)}
          >
            {navLink.link}
          </span>
        ))}
      </div>

      {/* Render Active Form */}
      {activeForm === 'SignUp' && <SignUp switchForm={switchForm} />}
      {activeForm === 'SignIn' && (
        <SignIn
          switchForm={switchForm}
          onLoginSuccess={(name, type) => {
            switchForm(null); // Close the form
            handleLogin(name, type);
          }}
        />
      )}
      {activeForm === 'ForgotPassword' && (
        <ForgotPassword switchForm={switchForm} />
      )}
    </div>
  );
};

Nav.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default Nav;
