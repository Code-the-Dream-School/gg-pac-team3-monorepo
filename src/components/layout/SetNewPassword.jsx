import React from 'react';
import styles from './SetNewPassword.module.css'; // Correct path to your CSS
import CloseIcon from '../icons/CloseIcon';

const SetNewPassWord = ({ switchForm }) => {
  return (
    <form className={styles.formContainer}>
      <h1 className={styles.SetPassWordId}>SetNewPassWord</h1>
      <button
        className={styles.closeFormButton}
        onClick={() => switchForm(null)}
      >
        <CloseIcon width={30} height={30} />
      </button>
      <div>
        <label className={styles.label} htmlFor='newPassword'>
          New Password
        </label>
        <input
          id='newPassword'
          className={styles.input}
          placeholder='Enter your Password'
          type='password'
        />

        <label className={styles.label} htmlFor='confirmPassword'>
          Confirm New Password
        </label>
        <input
          id='confirmPassword'
          className={styles.input}
          placeholder='Confirm New Password'
          type='password'
        />

        <button className={styles.button}>RESET PASSWORD</button>
      </div>
    </form>
  );
};

export default SetNewPassWord;
