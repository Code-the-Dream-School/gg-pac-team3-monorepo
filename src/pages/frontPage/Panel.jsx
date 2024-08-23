import Nav from '../../components/layout/Nav';
import { Outlet } from 'react-router-dom';

const Panel = (props) => {
  const { isLoggedIn } = props;
  return (
    <>
      <Nav isLoggedIn={isLoggedIn} />

      <Outlet />
    </>
  );
};
export default Panel;
