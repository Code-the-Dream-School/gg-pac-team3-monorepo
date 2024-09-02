import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './Learn.module.css';
import PropTypes from 'prop-types';
import { fetchCourseLessons, fetchCourseByCourseId } from '../../services/api';
import Lesson from './Lesson';

const Learn = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { courseId } = location.state || {};
  const [lessons, setLessons] = useState([]);
  const [course, setCourse] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for controlling the collapse/expand of lesson list
  const [isLessonListVisible, setIsLessonListVisible] = useState(true);
  const fetchCourseData = async () => {
    try {
      if (!courseId) {
        throw new Error('Course ID not found. Please try again.');
      }

      const courseData = await fetchCourseByCourseId(courseId);
      const lessonsData = await fetchCourseLessons(courseId);
      setCourse(courseData);
      setLessons(lessonsData);

      // Auto-select first lesson or the one in the URL
      const lessonInUrl = lessonsData.find(
        (lesson) =>
          lesson.title ===
          decodeURIComponent(location.pathname.split('/').pop())
      );
      setSelectedLesson(lessonInUrl || lessonsData[0]);
      setLoading(false);
    } catch (error) {
      setError(error.message || 'Error fetching course lessons');
      console.error('Error fetching course lessons:', error);
      setLoading(false);
      navigate('/');
    }
  };
  useEffect(() => {
    fetchCourseData();
  }, [courseId, location.pathname, navigate]);

  const handleLessonClick = (lesson) => {
    setSelectedLesson(lesson);
    navigate(
      `/learn/${course.courseName}/lesson/${encodeURIComponent(lesson.title)}`,
      { state: { courseId, lessonId: lesson.id } }
    ); // Navigate with courseId in state
  };

  const handleCourseInfo = () => {
    navigate(`/learn/${course.courseName}/courseInfo`, {
      state: { courseId, course, lessons },
    });
  };

  const handleFeedback = () => {
    navigate();
  };
  // Toggle the visibility of the lesson list
  const toggleLessonListVisibility = () => {
    setIsLessonListVisible(!isLessonListVisible);
  };

  if (loading) {
    return <div className={styles.loadingSpinner}>Loading course data...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={styles.learnContainer}>
      <>
        <div className={styles.courseHeader}>
          <h3>{course?.courseName || 'Course'}</h3>
        </div>
        <div className={styles.learnContent}>
          <div className={styles.lessonList}>
            <div className={styles.lessonListHeader}>
              <button onClick={toggleLessonListVisibility}>
                <h3> Course Lessons </h3>
              </button>
            </div>
            {isLessonListVisible && (
              <ul>
                {lessons.map((lesson) => (
                  <li
                    key={lesson.lessonId}
                    className={styles.lessonItem}
                    onClick={() => handleLessonClick(lesson)}
                  >
                    {lesson.title}
                  </li>
                ))}
              </ul>
            )}

            <div className={styles.lessonListHeader}>
              <button onClick={handleCourseInfo}>
                <h4>Course Info</h4>
              </button>
            </div>
            <div className={styles.lessonListHeader}>
              <button onClick={handleFeedback}>
                <h4>Feedback</h4>
              </button>
            </div>
          </div>
          <div className={styles.lessonDetails}>
            {selectedLesson && <Lesson lesson={selectedLesson} />}
          </div>
        </div>
      </>
    </div>
  );
};

Learn.propTypes = {
  courseId: PropTypes.string.isRequired,
};

export default Learn;
