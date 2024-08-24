import React, { useState } from "react";
import SignIn from "./signIn";
import SignUp from "./SignUp";
import styles from "./nav.module.css";
import logo from "../../assets/logos/blue.png";
const Nav = (props) => {
  const [activeForm, setActiveForm] = useState(null);

  const switchForm = (link) => {
    console.log("Switch form function called with:", link); // Add logging here
    if (link === "Register") {
      setActiveForm("SignUp");
    } else if (link === "Login") {
      setActiveForm("SignIn");
    } else {
      setActiveForm(null);
    }
  };

  const { isLoggedIn } = props;

  const navLinks = isLoggedIn
    ? [
        { id: 1, link: "Dashboard" },
        { id: 2, link: "Account" },
        { id: 3, link: "Logout" },
      ]
    : [
        { id: 1, link: "About" },
        { id: 2, link: "Login" },
        { id: 3, link: "Register" },
      ];

    return(
        <div className={styles.nav}>
            <img className={styles.logo} src={logo} alt="Logo"/>
            <div className={styles.list}>
                <ul className={styles.ul}>
                    { navLinks.map((navLink) => (
                        <li
                            key={navLink.id}
                            to={navLink.link.toLowerCase()}
                            onClick={() => switchForm(navLink.link)}>
                            {navLink.link}
                        </li>
                    ))
                    }
                </ul>
            </div>
            {activeForm === "SignUp" && <SignUp switchForm={switchForm} />}
            {activeForm === "SignIn" && <SignIn switchForm={switchForm} />}
        </div>
    )    
}
export default Nav;
