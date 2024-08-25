// import PropTypes from 'prop-types';
import Nav from './Nav';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../../AuthContext';

const Panel = () => {
  const { isLoggedIn, handleLogout } = useAuth();
  return (
    <>
      <Nav isLoggedIn={isLoggedIn} onLogout={handleLogout} />

      <Outlet />
    </>
  );
};

export default Panel;