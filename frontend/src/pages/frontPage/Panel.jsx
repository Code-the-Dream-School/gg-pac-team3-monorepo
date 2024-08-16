import Nav from "../../components/layout/Nav";
import { Outlet } from "react-router-dom";

import SignUp from "../../components/layout/SignUp";
const Panel = (props) => {
  const { isLoggedIn } = props;
  return (
    <>
      <SignUp />
      <Nav isLoggedIn={isLoggedIn} />
      <Outlet />
    </>
  );
};
export default Panel;
