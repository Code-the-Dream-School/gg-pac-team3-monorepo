import logo from '../../assets/logos/blue.png';
import { Link } from 'react-router-dom';
import styles from './footer.module.css';

const Footer = () => {
  return (
    <div className={styles.nav}>
      <img alt='Learning Hub' src={logo} className={styles.logo} />
      <ul className={styles.list}>
        <li className={styles.listItem}>
          <Link to='/'>Home</Link>
        </li>
        <li className={styles.listItem}>
          <a href='https://codethedream.org/'>Code the Dream</a>
        </li>
        <li className={styles.listItem}>
          <Link to='/About'>About Us</Link>
        </li>
      </ul>
    </div>
  );
};
export default Footer;
