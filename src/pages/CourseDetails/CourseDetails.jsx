import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchCourseLessons, AddUserCourse } from '../../services/api';
import styles from './CourseDetails.module.css';

const CourseDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { course, isEnrolled: initialIsEnrolled } = location.state || {};
  const [lessons, setLessons] = useState([]);
  const [isEnrolled, setIsEnrolled] = useState(initialIsEnrolled || false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem('userId');
  const role = 'student';

  const fetchLessons = async () => {
    try {
      if (!course) {
        throw new Error('Course ID not found. Please try again.');
      }
      const lessonsData = await fetchCourseLessons(course.id);
      setLessons(lessonsData);
    } catch (error) {
      setError(error.message || 'Error fetching course lessons');
      console.error('Error fetching course lessons:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLessons();
  }, [course?.id]);

  const handleEnroll = async () => {
    try {
      await AddUserCourse(userId, course.id, role);
      setIsEnrolled(true);
      setMessage(
        'You have successfully enrolled in this course. Enjoy your learning!'
      );
    } catch (error) {
      console.error('Error enrolling in course:', error);
      setMessage('Enrollment failed, please try again.');
    }
  };

  const handleGotoCourse = () => {
    if (lessons.length > 0) {
      //for later use
      // const courseUrl = `/learn/${course.courseName.trim()}/lesson/${lessons[0].title.trim()}`;
      // window.open(courseUrl, '_blank', 'noopener,noreferrer');

      navigate(
        `/learn/${course.courseName.trim()}/lesson/${lessons[0].title.trim()}`,
        {
          state: { courseId: course.id },
        }
      ); // Navigate to the Learn page
    } else {
      setMessage('Lessons are not available for this course. Coming soon!');
    }
  };

  if (loading) {
    return <div className={styles.loadingSpinner}>Loading lesson data...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }
  return (
    <div className={styles.courseDetailsContainer}>
      <h1 className={styles.courseTitle}>{course.courseName}</h1>
      <p className={styles.courseDescription}>{course.description}</p>
      <h2 className={styles.lessonsHeading}> Lessons </h2>
      <h3>
        In the {course.courseName} course, we have {lessons.length} Lessons.
        Here is a brief overview of each lessons
      </h3>
      {!isEnrolled ? (
        <button className={styles.enrollButton} onClick={handleEnroll}>
          Enroll
        </button>
      ) : (
        <div>
          <button
            className={styles.goToCourseButton}
            onClick={handleGotoCourse}
          >
            Go to Course
          </button>
          <p className={styles.enrollSuccessMessage}>{message}</p>
        </div>
      )}

      <h3 className={styles.lessonsHeading}>What you&apos;ll learn</h3>
      <ul className={styles.lessonsListUl}>
        {lessons.map((lesson, index) => (
          <li className={styles.lessonsItem} key={`${lesson.id}-${index}`}>
            <h3 className={styles.lessonTitle}>{lesson.title}</h3>
            <p className={styles.lessonMaterials}>{lesson.materials}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseDetails;
