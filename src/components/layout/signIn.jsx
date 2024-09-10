import React, { useState, useEffect } from 'react';
import { LoginUser, googleSignIn } from '../../services/api';
import CloseIcon from '../icons/CloseIcon';
import styles from './SignIn.module.css';
import PropTypes from 'prop-types';

const SignIn = ({ switchForm, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isGoogleReady, setIsGoogleReady] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(true); 

  useEffect(() => {
    const loadGoogleScript = () => {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = () => setIsGoogleReady(true);
      document.body.appendChild(script);
    };

    if (!window.google) {
      loadGoogleScript();
    } else {
      setIsGoogleReady(true);
    }

    return () => {
      const script = document.querySelector('script[src="https://accounts.google.com/gsi/client"]');
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, []);

  useEffect(() => {
    if (isGoogleReady && window.google) {
      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: handleGoogleSignIn,
      });
      window.google.accounts.id.renderButton(
        document.getElementById('googleSignInButton'),
        { theme: 'outline', size: 'large' }
      );
    }
  }, [isGoogleReady]);

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    try {
      const user = await LoginUser(email, password);
      if (onLoginSuccess) {
        onLoginSuccess(user.name, user.userType);
      }
      setIsFormVisible(false);
      switchForm(null);
    } catch (error) {
      // Handle and display backend errors
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error); 
      } else {
        setError('Login failed. Please try again later.');
      }
    }
  };

  const handleGoogleSignIn = async (response) => {
    try {
      const user = await googleSignIn(response.credential);
      if (onLoginSuccess) {
        onLoginSuccess(user.name, user.userType);
      }
      setIsFormVisible(false);
      switchForm(null);
    } catch (error) {
      console.error('Google sign-in failed:', error);

      // Handle specific Google sign-in error
      if (error.response && error.response.status === 404) {
        setError('No account found for this Google email. Please sign up first.');
      } else {
        setError('Google sign-in failed. Please try again.');
      }
    }
  };

  return (
    <>
      {isFormVisible && (
        <div className={styles.pageOverlay}>
          <div className={styles.container}>
            <section className={styles.headings}>
              <div className={styles.headingsContainer}>
                <h1 className={styles.header}>Log In</h1>
                <p className={styles.name}>Welcome Back to LearningHub</p>
              </div>
              <button
                className={styles.closeFormButton}
                onClick={() => {
                  setIsFormVisible(false);
                  switchForm(null);
                }}
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
                type='email'
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-required='true'
              />
              <label className={styles.formName} htmlFor='password'>
                Password
              </label>
              <input
                className={styles.input}
                id='password'
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-required='true'
              />
              {error && <p className={styles.errorMessage}>{error}</p>}
              <button type='button' className={styles.button} onClick={handleLogin}>
                Log In
              </button>

              <p className={styles.forgotPassword}>
                <a
                  className={styles.forgotPasswordLink}
                  onClick={(e) => {
                    e.preventDefault();
                    switchForm('ForgotPassword');
                  }}
                >
                  Forgot Password?
                </a>
              </p>

              {isGoogleReady && <div id="googleSignInButton" className={styles.googleButton}></div>}
            </div>
            <section className={styles.closingSection}>
              <p className={styles.content}>
                Don't have an account?{' '}
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
        </div>
      )}
    </>
  );
};

SignIn.propTypes = {
  switchForm: PropTypes.func.isRequired,
  onLoginSuccess: PropTypes.func.isRequired,
};

export default SignIn;