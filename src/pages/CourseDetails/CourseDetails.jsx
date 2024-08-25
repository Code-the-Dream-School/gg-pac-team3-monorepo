import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchCourseLessons, AddUserCourse } from "../../services/api";
import styles from "./CourseDetails.module.css";

const CourseDetails = () => {
  const location = useLocation(); 
  const navigate = useNavigate();
  const { course, isEnrolled: initialIsEnrolled } = location.state || {};
  const [lessons, setLessons] = useState([]);
  const [isEnrolled, setIsEnrolled] = useState(initialIsEnrolled || false);
  const [message, setMessage] = useState("");

  const userId = localStorage.getItem("userId");
  const role = "student";

  // Define fetchLessons function separately
  const fetchLessons = async () => {
    try {
      const lessonsData = await fetchCourseLessons(course.id);
      setLessons(lessonsData);
    } catch (error) {
      console.error("Error fetching course lessons:", error);
    }
  };

  useEffect(() => {
    fetchLessons(); // Call the fetchLessons function when component mounts
  }, [course?.id]);
 

  const handleEnroll = async () => {
    try {
      await AddUserCourse(userId, course.id, role);
      setIsEnrolled(true);
      setMessage(
        "You have successfully enrolled in this course. Enjoy your learning!"
      );
    } catch (error) {
      console.error("Error enrolling in course:", error);
    }
  };
  
  const handleGotoCourse = () => {
    navigate(`/learn/${course.courseName}/lesson/${lessons[0].title}`, { state: { courseId: course.id } }); // Navigate to the Learn page
  };
  
  return (
    <div className={styles.courseDetailsContainer}>
      <h1 className={styles.courseTitle}>{course.courseName}</h1>
      <p className={styles.courseDescription}>{course.description}</p>
      <h2 className={styles.lessonsHeading}>Lessons</h2>
      <ul className={styles.lessonsListUl}>
        {lessons.map((lesson) => (
          <li className={styles.lessonsItem} key={lesson.id}>
            <h3 className={styles.lessonTitle}>{lesson.title}</h3>
            <p className={styles.lesson_materials}>{lesson.materials}</p>
            <p>Points: {lesson.points}</p>
          </li>
        ))}
      </ul>
      {!isEnrolled ? (
        <button className={styles.enrollButton} onClick={handleEnroll}>
          Enroll
        </button>
      ) : (
        <div className={styles.enrollSuccess}>
          <p className={styles.enrollSuccessMessage}>{message}</p>
          <button
            className={styles.goToCourseButton}
            onClick={handleGotoCourse}
          >
            Go to Course
          </button>
        </div>
      )}
    </div>
  );
};

export default CourseDetails;
