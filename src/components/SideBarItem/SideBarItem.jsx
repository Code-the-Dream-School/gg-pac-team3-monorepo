import { Link } from 'react-router-dom';

const SideBarItem = ({ item }) => {
  return (
    <li>
      <Link to={item.href}>{item.name}</Link>
    </li>
  );
};

export default SideBarItem;
