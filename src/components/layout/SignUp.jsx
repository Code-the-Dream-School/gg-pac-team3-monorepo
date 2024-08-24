import styles from './SignUp.module.css';

const SignUp = ({ switchForm }) => {
  console.log('This is the switch form', switchForm);
  return (
    <div className={styles.container}>
      <section className={styles.headings}>
        <h1 className={styles.header}>Sign Up</h1>
        <p className={styles.name}>Getting started with LearnHub</p>
      </section>

      <div className={styles.forms}>
        <label className={styles.formName} htmlFor='email'>
          Email
        </label>
        <input className={styles.input} id='email' placeholder='Email'></input>

        <label className={styles.formName} htmlFor='password'>
          Password
        </label>
        <input
          className={styles.input}
          id='password'
          placeholder='Password'
          type='password'
        ></input>
        <button className={styles.button}>Register</button>
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

export default SignUp;
