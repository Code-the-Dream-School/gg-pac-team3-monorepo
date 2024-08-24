import React from 'react';
import {Link, useLocation} from "react-router-dom";
import styles from './SideBarItemStyles.module.css';

const SideBarItems = () => {
    const location = useLocation();

    const sideBarItems = [
        {
            name: "Dashboard",
            href: "/teacher/dashboard"
        },
        {
            name: "Courses",
            href: "/teacher/courses"
        }
    ]

    return (
        <ul className={styles.sideBarItems}>
            {sideBarItems.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                    <li key={item.name} className={`${styles.sideBarItem} ${isActive ? styles.active : ''}`}>
                        <Link to={item.href} className={styles.sideBarLink}>
                            {item.name}
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
};

export default SideBarItems;