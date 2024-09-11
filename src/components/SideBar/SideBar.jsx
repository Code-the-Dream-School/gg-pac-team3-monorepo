import SideBarItems from "../SideBarItems/SideBarItems.jsx";
import styles from './SideBar.module.css';
import {Link} from "react-router-dom";


const SideBar = () => {

  return (
    <nav className={styles.sideBarContainer}>
      <Link className={styles.newCourseLink} to={"/teacher/courses/new"}>+ New Course</Link>
      <SideBarItems/>
    </nav>
  );
};

export default SideBar;
