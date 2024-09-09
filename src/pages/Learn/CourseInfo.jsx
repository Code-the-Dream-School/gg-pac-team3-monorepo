import { useEffect, useState } from 'react';
import styles from './CourseInfo.module.css';
import { fetchTeacherDataByCourseId } from '../../services/api';

const CourseInfo = ({ course, lessons = [], courseId }) => {
  const [teacherInfo, setTeacherInfo] = useState(null);

  const fetchTeacherData = async () => {
    if (!courseId) {
      throw new Error('Course ID not found. Please try again.');
    }

    try {
      const teacherData = await fetchTeacherDataByCourseId(courseId);
      setTeacherInfo(teacherData);
    } catch (error) {
      console.error('Error fetching teacher data:', error);
    }
  };

  useEffect(() => {
    fetchTeacherData();
  }, [courseId]);

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.courseInfoContainer}>
      <div className={styles.courseDescriptionSection}>
        <h2>About Teacher</h2>
        {teacherInfo && (
          <div className={styles.teacherInfo}>
            {teacherInfo.profilePictureUrl && (
              <img
                src={teacherInfo.profilePictureUrl}
                alt={teacherInfo.name}
                className={styles.teacherImage}
              />
            )}
            <p className={styles.teacherName}>by {teacherInfo.name}</p>
            <p className={styles.teacherEmail}>
              Teacher Email ID: {teacherInfo.email}
            </p>
            {teacherInfo.createdAt && (
              <p className={styles.teacherCreatedAt}>
                This course was created on:{' '}
                {new Date(teacherInfo.createdAt).toLocaleDateString()}
              </p>
            )}
          </div>
        )}
        <h2>About this course</h2>
        <p className={styles.courseDescription}>{course.description}</p>
        <p className={styles.courseDescription}>{course.otherInfo}</p>
      </div>
      <div className={styles.lessonsSection}>
        <h2>About Lessons</h2>
        {lessons && lessons.length > 0 ? (
          <ul className={styles.lessonsList}>
            {lessons.map((lesson, index) => (
              <li
                key={`${lesson.lessonId}-${index}`}
                className={styles.lessonItem}
              >
                <h3>{lesson.title}</h3>
              </li>
            ))}
          </ul>
        ) : (
          <p>No lessons available.</p>
        )}
      </div>
    </div>
  );
};

export default CourseInfo;
