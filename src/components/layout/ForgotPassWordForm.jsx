import React, { useState } from 'react';
import axios from 'axios'; 
import styles from './ForgotPasswordForm.module.css'; 
import CloseIcon from '../icons/CloseIcon';

// Use the environment variable for the backend API base URL
const API_BASE_URL = import.meta.env.VITE_BASE_URL;

const ForgotPassword = ({ switchForm }) => {
  const [email, setEmail] = useState(''); 
  const [message, setMessage] = useState(''); 
  const [error, setError] = useState(''); 

  // Function to handle sending the reset link
  const handleSendLink = async () => {
    setMessage(''); 
    setError('');

    try {
      // Send request to the backend API to trigger the password reset email
      const response = await axios.post(`${API_BASE_URL}/user/resetpassword`, {
        email,
      });
      setMessage(response.data.message); 
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.error); 
      } else {
        setError('Failed to send reset link. Please try again.');
      }
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.formContainer}>
        <button className={styles.closeFormButton} onClick={() => switchForm(null)}>
          <CloseIcon width={30} height={30} />
        </button>
        <h1 className={styles.header}>Forgot Password?</h1>
        <p className={styles.instructions}>Please enter your email to reset the password</p>
        <div>
          {message && <p style={{ color: 'green' }}>{message}</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}

          <label className={styles.label} htmlFor="email">Email</label>
          <input
            id="email"
            className={styles.input}
            placeholder="Enter your email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Update email state
            required
          />

          <button className={styles.button} onClick={handleSendLink}>
            Send Reset Link
          </button>

          <p className={styles.resendText}>
            Didn’t receive the email?{' '}
            <a href="#" className={styles.resendLink} onClick={handleSendLink}>
              Resend it
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
