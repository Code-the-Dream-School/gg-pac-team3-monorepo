import { useState } from 'react';
import logo from '../../assets/logos/blue.png';
import styles from './nav.module.css';
import { NavLink, Outlet} from "react-router-dom";

function Nav(props){

    const {isLoggedIn} = props;

    const [navLinks, setNavLinks]  = useState({
        link1: 'About',
        link2: 'Login',
        link3: 'Register'
    });

    if(isLoggedIn){
        setNavLinks({
            link1: 'Dashboard',
            link2: 'Account',
            link3: 'Logout'
        })
    }

    return(
         <>
            <div className={styles.nav}>
                <img src={logo}/>
                <div className={styles.list}>
                    <ul>
                        <li><NavLink to={navLinks.link1}>{navLinks.link1}</NavLink></li>
                        <li><NavLink to={navLinks.link2}>{navLinks.link2}</NavLink></li>
                        <li><NavLink to={navLinks.link3}>{navLinks.link3}</NavLink></li>
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
