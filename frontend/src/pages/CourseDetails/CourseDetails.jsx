import { useEffect, useState } from 'react';
import { useLocation ,useNavigate } from 'react-router-dom';
import { fetchCourseLessons, AddUserCourse } from '../../services/api';
import styles from './CourseDetails.module.css';

const CourseDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { course, isEnrolled: initialIsEnrolled } = location.state;
  const [lessons, setLessons] = useState([]);
  const [isEnrolled, setIsEnrolled] = useState(initialIsEnrolled);
  const [message, setMessage] = useState('');

  const userId = localStorage.getItem('userId'); 

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const lessonsData = await fetchCourseLessons(course.id);
        setLessons(lessonsData);
      } catch (error) {
        console.error('Error fetching course lessons:', error);
      }
    };

    fetchLessons();
  }, [course.id]);

  const handleEnroll = async () => {
    try {
      await AddUserCourse(userId, course.id);
      setIsEnrolled(true);
      setMessage('You have successfully enrolled in this course. Enjoy your learning!');
    } catch (error) {
      console.error('Error enrolling in course:', error);
    }
  };

const handleGotoCourse = () => {
    navigate('/Learn', { state: { courseId: course.id } }); // Navigate to the Learn page
  };
  return (
    <div className={styles.courseDetailsContainer}>
      <h1 className={styles.h1}>{course.courseName}</h1>
      <p className={styles.p}>{course.description}</p>
      <h2 className={styles.h2}>Lessons</h2>
      <ul className={styles.ul}>
        {lessons.map(lesson => (
          <li className={styles.li} key={lesson.id}>
            <h3 className={styles.h3}>{lesson.title}</h3>
            <p className={styles.p}>{lesson.materials}</p>
            <p>Points: {lesson.points}</p>
          </li>
        ))}
      </ul>
      {!isEnrolled ? (
        <button className={styles.enrollButton} onClick={handleEnroll}>Enroll</button>
      ) : (
        <div className={styles.enrollSuccess}>
          <p className={styles.p}>{message}</p>
          <button className={styles.goToCourseButton} onClick={handleGotoCourse}>Go to Course</button>
        </div>
      )}
    </div>
  );
};

export default CourseDetails;
