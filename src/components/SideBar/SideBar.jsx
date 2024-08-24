import SideBarItems from "../SideBarItems/SideBarItems.jsx";
import styles from './SideBarStyles.module.css';


const SideBar = () => {

    return (
        <nav className={styles.sideBarContainer}>
            <button className={styles.newCourseButton}>New Course</button>
            <SideBarItems />
        </nav>
    );
};

export default SideBar;