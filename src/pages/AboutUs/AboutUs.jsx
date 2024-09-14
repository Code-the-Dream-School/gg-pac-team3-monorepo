import styles from './About.module.css';
import user from '../../assets/images/user.svg';
import Edith from '../../assets/images/edith.png';
import Sonali from '../../assets/images/sonaliPhoto.jpg';
import Laura from '../../assets/images/laura.png';
import Olga from '../../assets/images/Olga.jpg';
const AboutUs = () => {
  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.textContainer}>
          <h1>Why the Learning Hub</h1>
          <p>
            We created this app to revolutionize the learning experience by
            making it engaging, interactive, and accessible to everyone. In
            today's fast-paced world, traditional learning methods can fall
            short in keeping students motivated and involved. Our app addresses
            this by combining courses, quizzes, and by providing administrators
            with robust tools to manage student progress and course content. We
            aim to streamline the educational process and enhance the overall
            learning experience. Our goal is to empower learners and educators
            alike, making education more effective and enjoyable for all.
          </p>
        </div>
        <div className={styles.creatorsContainer}>
          <div className={styles.textContainer}>
            <h1>Meet the team</h1>
            <p>Developers</p>
          </div>
          <div className={styles.cardsContainer}>
            <div className={styles.card}>
              <img src={Edith} alt='User Icon' className={styles.userIcon} />
              <h1>Edith</h1>
              <p>Back End Developer</p>
            </div>
            <div className={styles.card}>
              <img src={Sonali} alt='User Icon' className={styles.userIcon} />
              <h1>Sonali</h1>
              <p> Back End Developer</p>
            </div>
            <div className={styles.card}>
              <img src={Olga} alt='User Icon' className={styles.userIcon} />
              <h1>Olga</h1>
              <p>Front End Developer</p>
            </div>
            <div className={styles.card}>
              <img src={Laura} alt='User Icon' className={styles.userIcon} />
              <h1>Laura</h1>
              <p>Front End Developer</p>
            </div>
            <div className={styles.card}>
              <img src={user} alt='User Icon' className={styles.userIcon} />
              <h1>John</h1>
              <p>Front End Developer</p>
            </div>
          </div>
        </div>
        <div className={styles.creatorsContainer}>
          <div className={styles.textContainer}>
            <p>Mentors</p>
          </div>
          <div className={styles.cardsContainer}>
            <div className={styles.card}>
              <img src={user} alt='User Icon' className={styles.userIcon} />
              <h1>Eli</h1>
              <p>Software Developer</p>
            </div>
            <div className={styles.card}>
              <img src={user} alt='User Icon' className={styles.userIcon} />
              <h1>Mattew</h1>
              <p>Software Developer</p>
            </div>
            <div className={styles.card}>
              <img src={user} alt='User Icon' className={styles.userIcon} />
              <h1>Alejandro</h1>
              <p>Software Developer</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AboutUs;
