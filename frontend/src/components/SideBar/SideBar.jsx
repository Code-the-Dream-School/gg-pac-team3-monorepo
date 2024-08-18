import React from 'react';
import SideBarItem from "../SideBarItem/SideBarItem.jsx";
import styles from './SideBarStyles.module.css';


const SideBar = () => {
    const sideBarItems = [
        {
            name: "Dashboard",
            href: "/teacher/dashboard"
        },
        {
            name: "Courses",
            href: "/teacher/courses",
        }
    ]

    return (
        <nav className={styles.sideBarContainer}>
            <ul className={styles.sideBarItems}>
                {
                     sideBarItems.map((item, index) => {
                        return <SideBarItem key={index} item={item}/>
                    })
                }
            </ul>
        </nav>
    );
};

export default SideBar;