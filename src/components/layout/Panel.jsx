// import PropTypes from 'prop-types';
import Nav from './Nav';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import Footer from './Footer';

const Panel = () => {
  const { isLoggedIn, handleLogout } = useAuth();
  return (
    <>
      <Nav isLoggedIn={isLoggedIn} onLogout={handleLogout} />

      <Outlet />
      <Footer />
    </>
  );
};

export default Panel;
