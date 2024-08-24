import React from 'react';
import SideBarItem from "../SideBarItem/SideBarItem.jsx";
import styles from './SideBarStyles.module.css';


const SideBar = () => {

    return (
        <nav className={styles.sideBarContainer}>
            <button className={styles.newCourseButton}>New Course</button>
            <SideBarItem />
        </nav>
    );
};

export default SideBar;