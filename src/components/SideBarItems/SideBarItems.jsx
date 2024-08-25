import { Link, useLocation } from 'react-router-dom';
import styles from './SideBarItemStyles.module.css';

const SIDEBAR_ITEMS = [
  {
    name: 'Dashboard',
    href: '/teacher/dashboard',
  },
  {
    name: 'Courses',
    href: '/teacher/courses',
  },
];

const SideBarItems = () => {
  const location = useLocation();

  return (
    <ul className={styles.sideBarItems}>
      {SIDEBAR_ITEMS.map((item) => {
        const isActive = location.pathname === item.href;
        return (
          <li
            key={item.name}
            className={`${styles.sideBarItem} ${isActive ? styles.active : ''}`}
          >
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
