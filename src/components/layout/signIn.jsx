import styles from './SignIn.module.css';

const SignIn = ({ switchForm }) => {
  return (
    <div className={styles.container}>
      <section className={styles.headings}>
        <h1 className={styles.header}>Log In</h1>
        <p className={styles.name}>Welcome Back to LearnHub</p>
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
        <button className={styles.button}>Log In</button>
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

export default SignIn;
