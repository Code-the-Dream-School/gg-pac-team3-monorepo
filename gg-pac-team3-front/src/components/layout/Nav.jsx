import logo from '../../assets/logos/blue.png';
import styles from './nav.module.css';
import { NavLink, Outlet} from "react-router-dom";

const Nav = (props) => {

    const {isLoggedIn} = props;

    const navLinks = isLoggedIn? ['Dashboard', 'Account', 'Logout'] : ['About', 'Login', 'Register'];

    return(
         <>
            <div className={styles.nav}>
                <img src={logo}/>
                <div className={styles.list}>
                    <ul>
                        { navLinks.map((link) => (
                            <li key={link}>
                                <NavLink to={link.toLowerCase()}>{link}</NavLink>
                            </li>
                        ))

                        }
                    </ul>
                </div>
                </div>
                <div>
                    <Outlet />
                </div>
            </>
    )    
}
export default Nav;
