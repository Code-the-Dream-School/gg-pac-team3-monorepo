<<<<<<< HEAD
// import PropTypes from 'prop-types';
=======
import PropTypes from 'prop-types';
>>>>>>> b1eca9f (Add Learn and Lesson page to see course material)
import Nav from './Nav';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../../AuthContext';

const Panel = () => {
  const { isLoggedIn, handleLogout } = useAuth();
  return (
    <>
<<<<<<< HEAD
      <Nav isLoggedIn={isLoggedIn} onLogout={handleLogout} />
=======
      <Nav isLoggedIn={isLoggedIn} onLogout={handleLogout} />      
>>>>>>> a43107d (Merged LessonPage Branch)

      <Outlet />
    </>
  );
};
<<<<<<< HEAD

export default Panel;
=======
Panel.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  handleLogout: PropTypes.func.isRequired,
};

export default Panel;
>>>>>>> b1eca9f (Add Learn and Lesson page to see course material)
