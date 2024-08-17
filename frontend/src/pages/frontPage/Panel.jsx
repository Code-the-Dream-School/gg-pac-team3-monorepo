import Nav from "../../components/layout/Nav";
import { Outlet } from "react-router-dom";
import SignIn from "../../components/layout/signIn";
import SignUp from "../../components/layout/SignUp";
const Panel = (props) => {
  const { isLoggedIn } = props;
  return (
    <>
      <Nav isLoggedIn={isLoggedIn} />
      <SignIn />
      {/* <SignUp isLoggedIn={isLoggedIn} /> */}
      <Outlet />
    </>
  );
};
export default Panel;
