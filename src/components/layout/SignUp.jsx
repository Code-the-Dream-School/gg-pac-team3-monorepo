import React, { useState, useEffect, useCallback } from 'react';
import { registerUser, googleSignIn } from '../../services/api';
import CloseIcon from '../icons/CloseIcon';
import styles from './SignUp.module.css';
import PropTypes from 'prop-types';

const SignUp = ({ switchForm }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('Student');
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');
  const [showGoogleUserTypeModal, setShowGoogleUserTypeModal] = useState(false);
  const [googleUserType, setGoogleUserType] = useState('Student');
  const [googleCredential, setGoogleCredential] = useState(null);
  const [isGoogleReady, setIsGoogleReady] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(true);  // New state for form visibility

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

  const handleRegister = async () => {
    if (!name || !email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    try {
      await registerUser(name, email, password, userType);
      setSuccessMessage(`You have registered successfully, please login.`);
      setError('');
      setTimeout(() => {
        setIsFormVisible(false);
        switchForm('Login');
      }, 3000);
    } catch (error) {
      console.error('Registration failed:', error);
      setError(error.response?.data?.error || 'Registration failed, please try again later.');
      setSuccessMessage('');
    }
  };

  const handleGoogleSignUp = useCallback(async (response) => {
    setGoogleCredential(response.credential);
    setShowGoogleUserTypeModal(true);
  }, []);

  const completeGoogleSignUp = async () => {
    try {
      const user = await googleSignIn(googleCredential, googleUserType);
      setSuccessMessage(`You have registered successfully with Google as a ${googleUserType}, please login.`);
      setError('');
      setShowGoogleUserTypeModal(false);
      setTimeout(() => {
        setIsFormVisible(false);
        switchForm('Login');
      }, 3000);
    } catch (error) {
      console.error('Google sign-up failed:', error);
      setError('Registration with Google failed, please try again later.');
      setSuccessMessage('');
    }
  };

  useEffect(() => {
    if (isGoogleReady && window.google) {
      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: handleGoogleSignUp,
      });
      window.google.accounts.id.renderButton(
        document.getElementById('googleSignUpButton'),
        { theme: 'outline', size: 'large', text: 'signup_with' }
      );
    }
  }, [isGoogleReady, handleGoogleSignUp]);

  return (
    <>
      {isFormVisible && (
        <div className={styles.pageOverlay}>
          <div className={styles.container}>
            <section className={styles.headings}>
              <div className={styles.headingsContainer}>
                <h1 className={styles.header}>Sign Up</h1>
                <p className={styles.name}>Getting started with LearnHub</p>
              </div>
              <button
                className={styles.closeFormButton}
                onClick={() => {
                  setIsFormVisible(false);
                  switchForm(null);
                }}
                aria-label="Close sign-up form"
              >
                <CloseIcon width={30} height={30} />
              </button>
            </section>
            <div className={styles.forms}>
              <label className={styles.formName} htmlFor='name'>
                Name
              </label>
              <input
                className={styles.inputField}
                id='name'
                placeholder='Enter Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                aria-required='true'
              />
              <label className={styles.formName} htmlFor='email'>
                Email
              </label>
              <input
                className={styles.inputField}
                type='email'
                id='email'
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-required='true'
              />
              <label className={styles.formName} htmlFor='password'>
                Password
              </label>
              <input
                className={styles.inputField}
                id='password'
                placeholder='Password'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-required='true'
              />
              <label className={styles.formName} htmlFor='userType'>
                Select Role
              </label>
              <select
                className={styles.inputField}
                id='userType'
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                aria-required='true'
              >
                <option value='Student'>Student</option>
                <option value='Teacher'>Teacher</option>
              </select>
              {error && <p className={styles.errorMessage} role="alert">{error}</p>}
              <button
                type='button'
                className={styles.registerButton}
                onClick={handleRegister}
              >
                Register
              </button>
              {isGoogleReady && <div id="googleSignUpButton" className={styles.googleButton}></div>}
              {successMessage && (
                <p className={styles.successMessage} role="status">{successMessage}</p>
              )}
            </div>
            <section className={styles.closingSection}>
              <p className={styles.content}>
                Already have an account?{' '}
                <button
                  className={styles.join}
                  onClick={() => switchForm('Login')}
                >
                  Login now
                </button>
              </p>
            </section>
          </div>
        </div>
      )}

      {showGoogleUserTypeModal && (
        <div className={styles.modal} role="dialog" aria-labelledby="googleUserTypeModalTitle">
          <div className={styles.modalContent}>
            <h2 id="googleUserTypeModalTitle">Select Your Role</h2>
            <select
              value={googleUserType}
              onChange={(e) => setGoogleUserType(e.target.value)}
              className={styles.inputField}
              aria-label="Select user role"
            >
              <option value="Student">Student</option>
              <option value="Teacher">Teacher</option>
            </select>
            <button onClick={completeGoogleSignUp} className={styles.registerButton}>
              Complete Sign Up
            </button>
          </div>
        </div>
      )}
    </>
  );
};

SignUp.propTypes = {
  switchForm: PropTypes.func.isRequired,
};

export default SignUp;