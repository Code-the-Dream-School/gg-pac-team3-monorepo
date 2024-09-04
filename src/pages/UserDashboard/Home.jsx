import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FetchSuggestedCoursesForUser } from '../../services/api';
import styles from './Courses.module.css';

const Home = ({ userId, onCourseClick }) => {
  const [coursesData, setCoursesData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('Ex:JavaScript');
  const [filteredCourses, setFilteredCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userId) {
          const courses = await FetchSuggestedCoursesForUser(userId);
          setCoursesData(courses);
          setFilteredCourses(courses);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
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
  };

  const handleSearchTerm = (event) => {
    const input = event.target.value;
    setSearchTerm(input);
  };

  return (
    <div>
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
      <div className={styles.coursesContainer}>
        {filteredCourses.map((course, index) => (
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
    </div>
  );
};

// Prop validation
Home.propTypes = {
  userId: PropTypes.string.isRequired, // userId is required and must be a string
  onCourseClick: PropTypes.func.isRequired, // onCourseClick is required and must be a function
};

export default Home;
