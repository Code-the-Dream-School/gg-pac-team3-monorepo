import styling from "./frontpage.module.css";
import panelImg from "../../assets/images/panelImage.jpg";
import pencil from "../../assets/images/brokenPencil.png";
import { useEffect } from "react";
import { getCourses } from "../../services.js/api";
import { useState } from "react";


const FrontPage = () => {
    const [courseDescriptions, setCoursesDescriptions] = useState([]);
    const [state, setState] = useState({
        loading: true,
        error: false
    });

    useEffect(() => {
        getCourses()
        .then(data => {
            setCoursesDescriptions(data);
            setState({
                loading: false,
                error:false
            });
        })
        .catch(error => {
            console.log(error.message);
            setState({
                loading: false,
                error: true
            });
        })
    
    },[])

    if(!state.loading && !state.error ){
        return(
            <>
                <div className={styling.panelContainer}>
                    <img className={styling.panel} src={panelImg}/>
                    <div className={styling.panelText}>
                        <h3>Welcome to LearningHub: Your go-to platform for managing and inspiring students or diving into a wide range of educational materials. Whether you're an educator looking to streamline your classroom or a learner eager to explore new topics, join us today to enhance your teaching experience or expand your knowledge across various subjects.</h3>
                    </div>
                </div>
                <div className={styling.mainContainer}>
                    <h3>Checkout our available courses:</h3>
                        <div className={styling.coursesContainer}>
                            {courseDescriptions.map((course,index) => (
                                <div className={styling.courseContainer} key={index}>
                                    <img className={styling.courseLogo} src={course.logoUrl} alt="Course Image"/>
                                    <div className={styling.courseDescription}>
                                        <h1>{course.courseName}</h1>
                                        <p>Description:{course.description}</p>
                                        <p>Rating:{course.rating}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                </div>
            </>
        );
    }

    else if(state.loading && !state.error){
        return(
            <>
            <h1>Loading...</h1>
            <div className={styling.ldsspinner}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            <p>Thank you for your patience.</p>
            </>
        )
    }

    else if(!state.error){
        return(
            <div className={styling.errorContainer}>
                <img src={pencil} className={styling.pencilImg}/>
                <h1>Opps, something went wrong!</h1>
                <p>We've encountered an error while trying to display our current available courses. Please wait a moment and try again.</p>
            </div>
        )
    }

}
export default FrontPage;
