import styling from './FrontPage.module.css';
import panelImg from '../../assets/images/panelImage.jpg';
import pencil from '../../assets/images/brokenPencil.png';
import { getCourses } from '../../services/api';
import { useState, useEffect } from 'react';

const FrontPage = () => {
  const [courseDescriptions, setCoursesDescriptions] = useState([]);
  const [state, setState] = useState({
    loading: true,
    error: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCourses();
        if (data.success === false) {
          setState({
            loading: false,
            error: true,
          });
        } else {
          setCoursesDescriptions(data);
          setState({
            loading: false,
            error: false,
          });
        }
      } catch (error) {
        setState({
          loading: false,
          error: true,
        });
      }
    };
    fetchData();
  }, []);

  if (state.error) {
    return <Error />;
  } else if (state.loading) {
    return <Loading />;
  }
  return (
    <>
      <div className={styling.panelContainer}>
        <img className={styling.panel} src={panelImg} />
        <div className={styling.panelText}>
          <h3>
            Welcome to LearningHub: Your go-to platform for managing and
            inspiring students or diving into a wide range of educational
            materials. Whether you're an educator looking to streamline your
            classroom or a learner eager to explore new topics, join us today to
            enhance your teaching experience or expand your knowledge across
            various subjects.
          </h3>
        </div>
      </div>
      <div className={styling.mainContainer}>
        <h3>Checkout our available courses:</h3>
        <div className={styling.coursesContainer}>
          {courseDescriptions.map((course, index) => (
            <div className={styling.courseContainer} key={index}>
              <img
                className={styling.courseLogo}
                src={course.imageUrl}
                alt='Course Image'
              />
              <div className={styling.courseDescription}>
                <h1>{course.courseName}</h1>
                <p>Description: {course.description}</p>
                <p>Rating: {course.rating}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default FrontPage;

const Error = () => {
  return (
    <div className={styling.errorContainer}>
      <img src={pencil} className={styling.pencilImg} />
      <h1>Oops, something went wrong!</h1>
      <p>
        We've encountered an error while trying to display our current available
        courses. Please wait a moment and try again.
      </p>
    </div>
  );
};

const Loading = () => {
  return (
    <>
      <h1>Loading...</h1>
      <div className={styling.ldsspinner}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <p>Thank you for your patience.</p>
    </>
  );
};
