import { useState } from 'react';
import { LoginUser } from '../../services/api';
import CloseIcon from '../icons/CloseIcon';
import styles from './SignIn.module.css';
import PropTypes from 'prop-types';

const SignIn = ({ switchForm, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      console.error('Please fill in all fields.');
      return;
    }
    try {
      const response = await LoginUser(email, password);
      const userName = response.name;
      const userType = response.userType;
      if (onLoginSuccess) onLoginSuccess(userName, userType);
      switchForm(null);
    } catch (error) {
      console.error('Login failed:', error);
      if (error.response && error.response.data) {
        console.error(`Login failed: ${error.response.data.message}`);
      } else {
        console.error('Login failed, please try again later.');
      }
    }
  };
  return (
    <div className={styles.container}>
      <section className={styles.headings}>
        <div className={styles.headingsContainer}>
          <h1 className={styles.header}>Log In</h1>
          <p className={styles.name}>Welcome Back to LearningHub</p>{' '}
        </div>
        <button
          className={styles.closeFormButton}
          onClick={() => switchForm(null)}
          aria-label='Close form'
        >
          <CloseIcon width={30} height={30} />
        </button>
      </section>

      <div className={styles.forms}>
        <label className={styles.formName} htmlFor='email'>
          Email
        </label>
        <input
          className={styles.input}
          id='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-required='true'
        ></input>

        <label className={styles.formName} htmlFor='password'>
          Password
        </label>
        <input
          className={styles.input}
          id='password'
          placeholder='Password'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          aria-required='true'
        ></input>
        <button type='button' className={styles.button} onClick={handleLogin}>
          Log In
        </button>
      </div>

      <section className={styles.closingSection}>
        <p className={styles.content}>
          Don’t have an account?{' '}
          <a
            className={styles.join}
            onClick={(e) => {
              e.preventDefault();
              switchForm('Register');
            }}
          >
            Sign up now
          </a>
        </p>
      </section>
    </div>
  );
};

SignIn.propTypes = {
  switchForm: PropTypes.func.isRequired,
  onLoginSuccess: PropTypes.func.isRequired,
};

export default SignIn;
