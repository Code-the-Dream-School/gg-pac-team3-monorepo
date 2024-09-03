// import  { useEffect, useState } from 'react';
import styles from './CourseInfo.module.css';
// import { useLocation } from 'react-router-dom';
// import { fetchTeacherDataByCourseId } from '../../services/api';

const CourseInfo = ({ course, lessons = [] }) => {
  // const location = useLocation();
  // const { courseId, course, lessons } = location.state || {};

  // const userId = localStorage.getItem('userId');

  // const [teacherInfo, setTeacherInfo] = useState(null);

  // const fetchteacherData = async () => {
  // try {
  //   if (!courseId) {
  //     throw new Error('course ID not found. Please try again.');
  //   }
  // const teacherdata = await fetchTeacherDataByCourseId(courseId);
  // setTeacherInfo(teacherdata);
  // console.log('teacherInfo', teacherInfo);
  // } catch (error) {
  // setError(error.message || 'Error fetching teacher data');
  // console.error('Error fetching teacher data:', error);
  // setLoading(false);
  // navigate('/');
  // }
  // };
  // useEffect(() => {
  //   // fetchteacherData();
  // }, [courseId]);

  if (!course) {
    return <div>Loading....</div>;
  }
  return (
    // <div>
    //   <h1>Course ID: {courseId}</h1>
    //   <h3>Course Data: {course.courseName}</h3>
    //   <h3>Lesson Data: {lessons[0].title}</h3>
    // </div>

    <div className={styles.courseInfoContainer}>
      {/* <h3>Course Data: {course.courseName}</h3> */}
      {/* <h3>Lesson Data: {lessons[0].title}</h3> */}
      {/* <h1 className={styles.courseTitle}>{course.name}</h1> */}
      {/* <div className={styles.teacherInfo}>
        <img
          // src={teacherInfo.profilePictureUrl}
          // alt={teacherInfo.name}
          className={styles.teacherImage}
        />
        {/* <p className={styles.teacherName}>by {teacherInfo.name}</p> */}
      {/* </div> */}
      <div className={styles.courseDescriptionSection}>
        <h2>About  Teacher</h2>
        <h2>About this course</h2>
        <p className={styles.courseDescription}>{course.description}</p>
        <p className={styles.courseDescription}>{course.otherInfo}</p>
      </div>
      <div className={styles.lessonsSection}>
        <h2>About Lessons</h2>
        {lessons && lessons.length > 0 ? (
          <ul className={styles.lessonsList}>
            {lessons.map((lesson) => (
              <li key={lesson.lessonId} className={styles.lessonItem}>
                <h3>{lesson.title}</h3>
                {/* <p>{lesson.materials}</p> */}
                <p>
                  <strong>Points:</strong> {lesson.points}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No lessons available.</p>
        )}
      </div>

      {/* Additional sections for other information can be added here */}
    </div>
  );
};
export default CourseInfo;
