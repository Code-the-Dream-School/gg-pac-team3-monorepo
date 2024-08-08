import Nav from "../../components/layout/Nav";
import Panel from "./Panel";

function FrontPage(props){
    const {isLoggedIn } = props;
    
    return(
        <>
            <Nav isLoggedIn={isLoggedIn}/>
            <Panel/>
        </>
    )
}
export default FrontPage;