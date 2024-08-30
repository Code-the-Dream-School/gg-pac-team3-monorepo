import { useState } from 'react';
import { registerUser } from '../../services/api';
import CloseIcon from '../icons/CloseIcon';
import styles from './SignUp.module.css';
import PropTypes from 'prop-types';

const SignUp = ({ switchForm }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('Student');
  const [successMessage, setSuccessMessage] = useState('');

  const handleRegister = async () => {
    if (!name || !email || !password) {
      setSuccessMessage('Please fill in all fields.');
      return;
    }
    try {
      const response = await registerUser(name, email, password, userType);
<<<<<<< HEAD
      setSuccessMessage(
        `You have registered successfully ${response}, please login.`,
      );
=======
      console.log('User registered successfully:', response);
      setSuccessMessage('You have registered successfully, please login.');
>>>>>>> b1eca9f (Add Learn and Lesson page to see course material)
      // switch to login or dashboard after successful registration
      setTimeout(() => {
        switchForm('Login');
      }, 3000);
    } catch (error) {
      console.error('Registration failed:', error);
      if (error.response && error.response.data) {
        setSuccessMessage(
          `Registration failed: ${error.response.data.message}`,
        );
      } else {
        setSuccessMessage('Registration failed, please try again later.');
      }
    }
  };

  return (
    <div className={styles.container}>
      <section className={styles.headings}>
        <div className={styles.headingsContainer}>
          <h1 className={styles.header}>Sign Up</h1>
          <p className={styles.name}>Getting started with LearnHub</p>
        </div>
        <button
          className={styles.closeFormButton}
          onClick={() => switchForm(null)}
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
        ></input>

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
        ></input>

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
        ></input>
<<<<<<< HEAD
=======

>>>>>>> a43107d (Merged LessonPage Branch)
        <label className={styles.formName} htmlFor='userType'>
          Select Role
        </label>
        <select
          className={styles.inputField}
          id='userType'
          value={userType}
          onChange={(e) => setUserType(e.target.value)}
        >
          <option value='Student'>Student</option>
          <option value='Teacher'>Teacher</option>
        </select>
        <button
          type='button'
          className={styles.registerButton}
          onClick={handleRegister}
        >
          Register
        </button>
        {successMessage && (
          <p className={styles.successMessage}>{successMessage}</p>
        )}
      </div>

      <section className={styles.closingSection}>
        <p className={styles.content}>
          Already have an account?{' '}
          <a
            className={styles.join}
            onClick={(e) => {
              e.preventDefault();
              switchForm('Login');
            }}
          >
            Login now
          </a>
        </p>
      </section>
    </div>
  );
};

SignUp.propTypes = {
  switchForm: PropTypes.func.isRequired,
};

export default SignUp;
