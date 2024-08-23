import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { FetchSuggestedCoursesForUser } from "../../services/api";
import styles from "./Courses.module.css";

const Home = ({ userId, onCourseClick }) => {
  const [coursesData, setCoursesData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userId) {
          const courses = await FetchSuggestedCoursesForUser(userId);
          setCoursesData(courses);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userId]);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={index < rating ? styles.starFilled : styles.starEmpty}
      >
        ★
      </span>
    ));
  };

  return (
    <div className={styles.coursesContainer}>
      {coursesData.map((course) => (
        <div
          key={course.courseID}
          className={styles.courseCard}
          onClick={() => onCourseClick(course)}
        >
          <img
            src={course.imageUrl}
            alt={course.courseName}
            className={styles.courseImage}
          />
          <div className={styles.courseInfo}>
            <h3 className={styles.courseName}>{course.courseName}</h3>
            <p className={styles.courseType}>Type: {course.courseType}</p>
            <p className={styles.courseDuration}>Duration: {course.duration}</p>
            <p className={styles.courseRating}>
              Rating: {renderStars(course.rating)}
            </p>
            <p className={styles.courseDescription}>{course.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

// Prop validation
Home.propTypes = {
  userId: PropTypes.string.isRequired, // userId is required and must be a string
  onCourseClick: PropTypes.func.isRequired, // onCourseClick is required and must be a function
};

export default Home;
