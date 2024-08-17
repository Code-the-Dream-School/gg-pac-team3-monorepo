import styles from "./SignIn.module.css";

const SignIn = () => {
  return (
    <div className={styles.container}>
      <section className={styles.Headings}>
        <h1 className={styles.Header}>Log In</h1>
        <p id={styles.Name}>Welcome To learnHub</p>
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
          Sign In
        </button>
        <a id={styles.ForgotPass}>Forgot Password?</a>
      </div>
    </div>
  );
};

export default SignIn;
