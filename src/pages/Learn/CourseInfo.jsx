import React, { useEffect, useState } from 'react';
import styles from './CourseInfo.module.css';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const CourseInfo = () => {
  //   const { courseId } = useContext(CourseContext);
  const location = useLocation();
  const { courseId, course, lessons } = location.state || {};
  const [teacherInfo, setTeacherInfo] = useState(null);

  console.log('lesson:', lessons[0]);
  if (!courseId) {
    return <div>Loading....</div>;
  }
  return (
    // <div>
    //   <h1>Course ID: {courseId}</h1>
    //   <h3>Course Data: {course.courseName}</h3>
    //   <h3>Lesson Data: {lessons[0].title}</h3>
    // </div>

    <div className={styles.courseInfoContainer}>
      <h1 className={styles.courseTitle}>{course.name}</h1>
      <div className={styles.teacherInfo}>
        <img
          src={teacherInfo.profilePictureUrl}
          alt={teacherInfo.name}
          className={styles.teacherImage}
        />
        <p className={styles.teacherName}>by {teacherInfo.name}</p>
      </div>

      <div className={styles.courseDescriptionSection}>
        <h2>About this course</h2>
        <p className={styles.courseDescription}>{course.description}</p>
      </div>

      <div className={styles.lessonsSection}>
        <h2>Lessons</h2>
        <ul className={styles.lessonsList}>
          {lessons.map((lesson) => (
            <li key={lesson.lessonId} className={styles.lessonItem}>
              <h3>{lesson.title}</h3>
              <p>{lesson.description.text}</p>
              <p>
                <strong>Points:</strong> {lesson.points}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* Additional sections for other information can be added here */}
    </div>
  );
};
export default CourseInfo;
