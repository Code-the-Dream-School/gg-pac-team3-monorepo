import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { fetchUserEnrolledCourses } from "../../services/api";
import styles from "./Courses.module.css";

const MyCourses = ({ userId, onCourseClick }) => {
  const [enrolledCoursesData, setEnrolledCoursesData] = useState([]);

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        if (userId) {
          const enrolledCourses = await fetchUserEnrolledCourses(userId);
          setEnrolledCoursesData(enrolledCourses);
        }
      } catch (error) {
        console.error("Error fetching enrolled courses:", error);
      }
    };

    fetchEnrolledCourses();
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
      {enrolledCoursesData.map((course) => (
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
MyCourses.propTypes = {
  userId: PropTypes.string.isRequired, // userId is required and must be a string
  onCourseClick: PropTypes.func.isRequired, // onCourseClick is required and must be a function
};

export default MyCourses;
