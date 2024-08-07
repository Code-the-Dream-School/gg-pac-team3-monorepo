import logo from '../logos/blue.png';
import styles from './navBlue.module.css';
import {Link} from "react-router-dom";

function NavBarBlue(){
    return(
        <div className={styles.nav}>
            <img src={logo}/>
            <div className={styles.list}>
                <ul>
                    <li><Link to="/about">About Us</Link></li>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/signup">Get started</Link></li>
                </ul>
            </div>
        </div>
    )
}
export default NavBarBlue;