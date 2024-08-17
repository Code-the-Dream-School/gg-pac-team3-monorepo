import styles from "./SignUp.module.css";

const SignUp = () => {
  return (
    <div className={styles.container}>
      <section className={styles.Headings}>
        <h1 className={styles.Header}>Sign Up</h1>
        <p id={styles.Name}>Getting started with LearnHub</p>
      </section>

      <div className={styles.Forms}>
        <label className={styles.FormName} htmlFor="email">
          Email
        </label>
        <input className={styles.Input} id="email" placeholder="Email"></input>

        <label className={styles.FormName} htmlFor="password">
          Password
        </label>
        <input
          className={styles.Input}
          id="password"
          placeholder="Password"
          type="password"
        ></input>
        <button className={styles.Forms} id={styles.button}>
          Register
        </button>
      </div>

      <section className={styles.closingSection}>
        <p id={styles.Content}>
          Already have an account? <a className={styles.Join}>Login now</a>
        </p>
      </section>
    </div>
  );
};

export default SignUp;
