import logo from '../../assets/logos/blue.png';
import styles from './nav.module.css';
import { NavLink} from "react-router-dom";

const Nav = (props) => {

    const {isLoggedIn} = props;

    const navLinks = isLoggedIn? ['Dashboard', 'Account', 'Logout'] : ['About', 'Login', 'Register'];

    return(
        <div className={styles.nav}>
            <img className={styles.logo} src={logo}/>
            <div className={styles.listContainer}>
                <ul className={styles.list}>
                    { navLinks.map((link) => (
                        <li className={styles.listItem} key={link}>
                            <NavLink to={link.toLowerCase()}>{link}</NavLink>
                        </li>
                    ))
                    }
                </ul>
            </div>
        </div>
    )    
}
export default Nav;
