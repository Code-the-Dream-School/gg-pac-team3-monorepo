import CloseIcon from '../icons/CloseIcon';
import styles from './SignIn.module.css';

const SignIn = ({ switchForm }) => {
  return (
    <div className={styles.container}>
      <section className={styles.headings}>
        <div className={styles.headingsContainer}>
          <h1 className={styles.header}>Log In</h1>
          <p className={styles.name}>Welcome Back to LearnHub</p>{' '}
        </div>
        <button
          className={styles.closeFormButton}
          onClick={() => switchForm(null)}
        >
          <CloseIcon width={30} height={30} />
        </button>
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
