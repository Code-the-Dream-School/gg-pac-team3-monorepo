import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { fetchUserEnrolledCourses } from '../../services/api';
import styles from './Courses.module.css';

const MyCourses = ({ userId, onCourseClick }) => {
  const [enrolledCoursesData, setEnrolledCoursesData] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);  
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [coursesPerPage, setCoursesPerPage] = useState(6);
  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        if (userId) {
          const enrolledCourses = await fetchUserEnrolledCourses(userId);
          setEnrolledCoursesData(enrolledCourses);
          setFilteredCourses(enrolledCourses);
        }
      } catch (error) {
        console.error('Error fetching enrolled courses:', error);
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
  // Pagination logic
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(
    indexOfFirstCourse,
    indexOfLastCourse
  );

  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Handle changing the number of courses per page
  const handleChangeNoForPerPage = (event) => {
    const selectedValue = parseInt(event.target.value);
    setCoursesPerPage(selectedValue);
    setCurrentPage(1); // Reset to first page when changing results per page
  };

  return (
    <div>
      <h3 className={styles.enrolledMsg}>
        Enjoy learning with your enrolled courses!
      </h3>
      <div className={styles.coursesContainer}>
        {currentCourses.map((course, index) => (
          <div
            key={`${course.courseID}-${index}`}
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
              <p className={styles.courseDuration}>
                Duration: {course.duration}
              </p>
              <p className={styles.courseRating}>
                Rating: {renderStars(course.rating)}
              </p>
              <p className={styles.courseDescription}>{course.description}</p>
            </div>
          </div>
        ))}
      </div>
      {/* Pagination Controls */}
      <div className={styles.pagination}>
        <label htmlFor='resultsPerPage' className={styles.lblresultsPerPage}>
          Results per page:
        </label>
        <select
          id='resultsPerPage'
          value={coursesPerPage}
          onChange={handleChangeNoForPerPage}
          className={styles.dropdownPerPage}
        >
          <option value={4}>4</option>
          <option value={6}>6</option>
          <option value={10}>10</option>
          <option value={12}>12</option>
          <option value={24}>14</option>
        </select>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={`${styles.pageButton} ${
              currentPage === index + 1 ? styles.active : ''
            }`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

// Prop validation
MyCourses.propTypes = {
  userId: PropTypes.string.isRequired,
  onCourseClick: PropTypes.func.isRequired,
};

export default MyCourses;
