import Nav from "../../components/layout/Nav";
import Panel from "./Panel";

const FrontPage = (props) => {
    const {isLoggedIn } = props;
    
    return(
        <>
            <Nav isLoggedIn={isLoggedIn}/>
            <Panel/>
        </>
    )
}
export default FrontPage;