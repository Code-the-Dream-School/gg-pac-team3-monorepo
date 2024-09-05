import React from 'react';
import styles from './ForgotPasswordForm.module.css'; // Adjust to your path
import CloseIcon from '../icons/CloseIcon';

const ForgotPassword = ({ switchForm }) => {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.formContainer}>
        <button
          className={styles.closeFormButton}
          onClick={() => switchForm(null)}
        >
          <CloseIcon width={30} height={30} />
        </button>
        <h1 className={styles.header}>Forgot Password?</h1>
        <p className={styles.instructions}>
          Please enter your email to reset the password
        </p>
        <div>
          <label className={styles.label} htmlFor='email'>
            Email
          </label>
          <input
            id='email'
            className={styles.input}
            placeholder='Enter your email'
            type='email'
          />

          <label className={styles.label} htmlFor='code'>
            Enter Code
          </label>
          <input
            id='code'
            className={styles.input}
            placeholder='Enter the code'
            type='text'
          />

          <button
            className={styles.button}
            onClick={() => switchForm('SetNewPassWord')} // Correct casing here
          >
            RESET PASSWORD
          </button>

          <p className={styles.resendText}>
            Code not received?{' '}
            <a href='#' className={styles.resendLink}>
              Resend here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
