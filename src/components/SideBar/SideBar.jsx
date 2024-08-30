
import SideBarItems from "../SideBarItems/SideBarItems.jsx";

import styles from './SideBar.module.css';
import {Link} from "react-router-dom";


const SideBar = () => {

  return (
    <nav className={styles.sideBarContainer}>
      <button className={styles.newCourseButton}>New Course</button>
      <SideBarItems />

    </nav>
  );
};

export default SideBar;
