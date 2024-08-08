import panelImg from "../../assets/images/panelImage.jpg";
import styling from "./panel.module.css";

const Panel = () => {
    return(
    <div className={styling.container}>
        <img id={styling.panel} src={panelImg}/>
        <div className={styling.panelText}>
            <h3>Join LearningHub to manage or inspire your students effortlessly or sign up and start learning the fundamentals of coding </h3>
        </div>
    </div>

    )
}
export default Panel;