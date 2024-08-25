import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SignIn from './SignIn';
import SignUp from './SignUp';
import styles from './Nav.module.css';
import { useAuth } from '../../AuthContext';
import logo from '../../assets/logos/blue.png';
import { useNavigate } from 'react-router-dom';

const Nav = ({ isLoggedIn, onLogout }) => {
  const [activeForm, setActiveForm] = useState(null);
  const navigate = useNavigate();
  const { userName, handleLogin } = useAuth();
  const [userType, setUserType] = useState('');

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
        console.log('userType in nav:', userType);
        if (userType === 'Student') {
          navigate('/UserDashboard/home'); // Navigate to Student Dashboard
        } else if (userType === 'Teacher') {
          navigate('/teacher/dashboard'); // Navigate to Teacher Dashboard
        }
        break;
      default:
        setActiveForm(null);
    }
  };

  // console.log(isLoggedIn);
  useEffect(() => {}, [userType]);

  useEffect(() => {}, [isLoggedIn]);

  const navLinks = isLoggedIn
    ? [
        { id: 1, link: `Welcome ${userName}` },
        { id: 2, link: 'Dashboard' },
        { id: 3, link: 'Logout' },
      ]
    : [
        { id: 1, link: 'Login' },
        { id: 2, link: 'Register' },
      ];

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
      {activeForm === 'SignUp' && <SignUp switchForm={switchForm} />}
      {activeForm === 'SignIn' && (
        <SignIn
          switchForm={switchForm}
          onLoginSuccess={(name, type) => {
            // Set isLoggedIn to true in the parent component
            switchForm(null); // Close the form
            handleLogin(name);
            console.log('userType after login in nav type:', type);
            setUserType(type);
            console.log('userType after login in nav:', userType);
          }}
        />
      )}
    </div>
  );
};

Nav.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  onLogout: PropTypes.func.isRequired,
};
export default Nav;
