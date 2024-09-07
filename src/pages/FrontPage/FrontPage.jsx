import styling from './FrontPage.module.css';
import panelImg from '../../assets/images/panelImage.jpg';
import star from '../../assets/images/star.svg';
import money from '../../assets/images/money.svg';
import pen from '../../assets/images/pencil.svg';
import computer from '../../assets/images/computer.svg';
import clock from '../../assets/images/clock.svg';
import pencil from '../../assets/images/brokenPencil.png';
import { useState, useEffect } from 'react';
import axios from 'axios';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const FrontPage = () => {
  const [courseDescriptions, setCoursesDescriptions] = useState([]);
  const [state, setState] = useState({
    loading: true,
    error: false,
  });

  useEffect(() => {
    axios
      .get(`${baseUrl}/course/public`)
      .then((res) => {
        setCoursesDescriptions(res.data);
        setState({
          loading: false,
          error: false,
        });
      })
      .catch((err) => {
        console.error(err);
        setState({
          loading: false,
          error: true,
        });
      });
  }, []);

  if (state.error) {
    return <Error />;
  } else if (state.loading) {
    return <Loading />;
  }

  return (
    <>
      <div className={styling.panelContainer}>
        <div className={styling.panelText}>
          <h3>Welcome to Learning Hub</h3>
          <p>
            Your go-to platform for managing and inspiring students or diving
            into a wide range of educational materials. Whether you're an
            educator looking to streamline your classroom or a learner eager to
            explore new topics, join us today to enhance your teaching
            experience or expand your knowledge across various subjects.
          </p>
        </div>
      </div>
      <div className={styling.mainContainer}>
        <div className={styling.mainText}>
          <h3>Unlock Your Potential with Our Courses</h3>
          <p>
            Ready to take the next step in your learning journey? Whether you're
            looking to develop new skills, advance your career, or explore a
            passion, our wide range of courses has something for everyone. Dive
            in and discover courses designed to inspire, challenge, and elevate
            you to the next level.
          </p>
          <h4>Explore our courses today and start your path to success!</h4>
        </div>

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
                <div>
                  <p>
                    <b>Description: </b>
                    {course.description.length <= 100
                      ? course.description
                      : `${course.description.substring(0, 100)}...`}
                  </p>
                </div>
                <div className={styling.ratingDurationContainer}>
                  <div className={styling.ratingDuration}>
                    <img className={styling.svg} src={star} />
                    <p>{course.rating || ' Stayed Tuned.'}</p>
                  </div>
                  <div className={styling.ratingDuration}>
                    <img src={clock} className={styling.svg} />
                    <p>{course.duration}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styling.advertisementContainer}>
        <h1>Invest in yourself today with The Learning Hub.</h1>
        <div className={styling.advertisementCards}>
          <div className={styling.advertisementCard}>
            <div className={styling.border}>
              <img
                src={computer}
                alt='Computer Image'
                className={styling.svgBig}
              />
            </div>
            <p>Learn at your own pace from anywhere.</p>
          </div>

          <div className={styling.advertisementCard}>
            <div className={styling.border}>
              <img src={pen} alt='Pen Image' className={styling.svgBig} />
            </div>
            <p>Create your own courses, lessons and quizzes.</p>
          </div>

          <div className={styling.advertisementCard}>
            <div className={styling.border}>
              <img
                src={money}
                alt='Dollar Bill Image'
                className={styling.svgBig}
              />
            </div>
            <p>Take advantage of our free courses.</p>
          </div>
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
