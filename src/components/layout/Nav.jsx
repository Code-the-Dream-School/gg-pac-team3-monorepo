import { useState } from 'react';
import SignIn from './signIn';
import SignUp from './SignUp';
import ForgotPassword from './ForgotPassWordForm';
import styles from './Nav.module.css';
import logo from '../../assets/logos/blue.png';
import SetNewPassWord from './SetNewPassword';

const Nav = ({ isLoggedIn, handleLogin, setUserType }) => {
  const [activeForm, setActiveForm] = useState(null);

  const switchForm = (link) => {
    switch (link) {
      case 'Register':
        setActiveForm('SignUp');
        break;
      case 'Login':
        setActiveForm('SignIn');
        break;
      case 'ForgotPassword':
        setActiveForm('ForgotPassword');
        break;
      case 'SetNewPassWord':
        setActiveForm('SetNewPassWord');
        break;
      default:
        setActiveForm(null);
    }
  };

  const navLinks = isLoggedIn
    ? [
        { id: 1, link: 'Dashboard' },
        { id: 2, link: 'Account' },
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
            setUserType(type);
          }}
        />
      )}
      {activeForm === 'ForgotPassword' && (
        <ForgotPassword switchForm={switchForm} />
      )}
      {activeForm === 'SetNewPassWord' && (
        <SetNewPassWord switchForm={switchForm} />
      )}
    </div>
  );
};

export default Nav;
