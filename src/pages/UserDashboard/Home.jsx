import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  FetchSuggestedCoursesForUser,
  fetchUserEnrolledCourses,
} from '../../services/api';
import styles from './Courses.module.css';

const Home = ({ userId, onCourseClick }) => {
  const [coursesData, setCoursesData] = useState([]);
  const [enrolledCoursesData, setEnrolledCoursesData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('Ex:JavaScript');
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [selectedCategory, setSelectedCategory] = useState('All'); // State for selected category
  const [message, setMessage] = useState(''); // State for storing error/success message
  const coursesPerPage = 10; // Number of courses per page

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        if (userId) {
          const enrolledCourses = await fetchUserEnrolledCourses(userId);
          setEnrolledCoursesData(enrolledCourses);
        }
      } catch (error) {
        console.error('Error fetching enrolled courses:', error);
      }
    };

    fetchEnrolledCourses();
  }, [userId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('userId:', userId);
        if (userId) {
          const courses = await FetchSuggestedCoursesForUser(userId);
          setCoursesData(courses);
          setFilteredCourses(courses); // Initially show all courses
        }
      } catch (error) {
        console.error('Error fetching data:', error);

        // Check if the error is due to an unauthorized request
        if (error.response && error.response.status === 401) {
          const errorMessage =
            error.response.data.message || 'Unauthorized access';
          if (errorMessage.toLowerCase().includes('token expired')) {
            setMessage('Your session has expired. Please log in again.');
          } else if (errorMessage.toLowerCase().includes('invalid token')) {
            setMessage('Invalid token. Please log in to continue.');
          } else {
            setMessage('You are not authorized to access this resource.');
          }
        } else {
          setMessage(
            'An error occurred while fetching courses. Please try again later.'
          );
        }
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

  const handleSearch = (event) => {
    event.preventDefault();
    const filteredCoursesList = coursesData.filter((course) =>
      course.courseName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCourses(filteredCoursesList);
    setCurrentPage(1); // Reset to first page after search
  };

  const handleSearchTerm = (event) => {
    const input = event.target.value;
    setSearchTerm(input);
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

  // Get unique course types with 'All' as default
  const courseTypes = [
    'All',
    ...Array.from(new Set(coursesData.map((course) => course.courseType))),
  ];

  // Filter courses based on selected category
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset pagination to first page
    if (category === 'All') {
      setFilteredCourses(coursesData); // Show all courses
    } else {
      const filteredByCategory = coursesData.filter(
        (course) => course.courseType === category
      );
      setFilteredCourses(filteredByCategory); // Show filtered courses
    }
  };

  return (
    <div>
      {/* Display error or success message */}
      {message && <p className={styles.errorMessage}>{message}</p>}

      <div className={styles.searchContainer}>
        <form
          id='submitSearchForm'
          onSubmit={handleSearch}
          className={styles.form}
        >
          <h2>Search courses:</h2>
          <input
            onChange={handleSearchTerm}
            value={searchTerm}
            placeholder={searchTerm}
            className={styles.searchInput}
          />
          <button className={styles.submit} type='submit'>
            Search
          </button>
        </form>
      </div>

      {/* Display Courses */}
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

      {/* Categories Section */}
      <div className={styles.categoriesContainer}>
        <h2>Course Type</h2>
        <div className={styles.categoriesGrid}>
          {courseTypes.map((courseType, index) => (
            <div
              key={index}
              className={`${styles.categoryCard} ${
                selectedCategory === courseType ? styles.activeCategory : ''
              }`}
              onClick={() => handleCategoryClick(courseType)}
            >
              <p>{courseType}</p>
            </div>
          ))}
        </div>
      </div>
      <h3 className={styles.enrolledMsg}>You have enrolled in these courses</h3>
      <div className={styles.coursesContainer}>
        {enrolledCoursesData.map((course, index) => (
          <div
            key={`${course.courseID}-${index}`}
            className={styles.courseCard}
            onClick={() => onCourseClick(course)}
          >
            <h4 className={styles.enrolledmsgforDiv}>enrolled Course</h4>
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
    </div>
  );
};

// Prop validation
Home.propTypes = {
  userId: PropTypes.string.isRequired, // userId is required and must be a string
  onCourseClick: PropTypes.func.isRequired, // onCourseClick is required and must be a function
};

export default Home;
