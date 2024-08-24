import { useState } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';
import styles from './Nav.module.css';
import logo from '../../assets/logos/blue.png';

const Nav = (props) => {
  const [activeForm, setActiveForm] = useState(null);

  const switchForm = (link) => {
    if (link === 'Register') {
      setActiveForm('SignUp');
    } else if (link === 'Login') {
      setActiveForm('SignIn');
    } else {
      setActiveForm(null);
    }
  };

  const { isLoggedIn } = props;

  const navLinks = isLoggedIn
    ? [
        { id: 1, link: 'Dashboard' },
        { id: 2, link: 'Account' },
        { id: 3, link: 'Logout' },
      ]
    : [
        { id: 1, link: 'About' },
        { id: 2, link: 'Login' },
        { id: 3, link: 'Register' },
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
      {activeForm === 'SignIn' && <SignIn switchForm={switchForm} />}
    </div>
  );
};

export default Nav;
