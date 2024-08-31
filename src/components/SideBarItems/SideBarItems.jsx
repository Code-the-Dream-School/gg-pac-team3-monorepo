import { Link, useLocation } from "react-router-dom";
import styles from './SideBarItemStyles.module.css';

const SIDEBAR_ITEMS = [
  {
    name: "Dashboard",
    href: "/teacher/dashboard"
  },
  {
    name: "All courses",
    href: "/teacher/courses"
  }
]

const SideBarItems = () => {
  const location = useLocation();

  return (
    <ul className={styles.sideBarItems}>
      {SIDEBAR_ITEMS.map((item) => {
        const isActive = location.pathname === item.href;
        return (
          <Link key={item.name} to={item.href} className={styles.sideBarLink}>
            <li className={`${styles.sideBarItem} ${isActive ? styles.active : ''}`}>
              {item.name}
            </li>
          </Link>
        );
    })}
    </ul>
  );
};

export default SideBarItems;