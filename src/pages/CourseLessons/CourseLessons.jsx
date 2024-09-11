import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import LessonsTable from "../../components/LessonsTable/LessonsTable.jsx";
import styles from "./CourseLessons.module.css";
import SideBar from "../../components/SideBar/SideBar.jsx";

const CourseLessons = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const { id } = useParams();
  const [course, setCourse] = useState({});
  const [lessons, setLessons] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('authToken');
  const decodedToken = jwtDecode(token);
  const teacherEmail = decodedToken.email;

  useEffect(() => {
    fetch(`${apiUrl}/course/${id}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
      return response.json();
    }).then((data) => {
      if(data.createdBy !== teacherEmail) {
        navigate(`/courses/${id}`);
        return;
      }
      setCourse(data);
      fetch(`${apiUrl}/course/${id}/lessons`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        return response.json();
      }).then((data) => {
        setLessons(data);
      })
    }).catch((error) => {
      console.error(error);
    });
  }, [id]);

  const handleDeleteLesson = (lessonId) => {
    fetch(`${apiUrl}/course/${id}/lesson/${lessonId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      },
    }).then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to delete lesson');
        }
      }
    ).then(data => {
      const updatedLessons = lessons.filter(lesson => lesson.id !== lessonId);
      setLessons(updatedLessons);
    }).catch(error => {
      console.error(error);
    })
  }
  return (
    <div className={styles.courseLessonsContainer}>
      <SideBar />
      <div className={styles.lessonsContainer}>
        <div className={styles.courseInfoContainer}>
          <div>
            {/*<Link className={styles.courseLink} to={`/teacher/courses/edit/${course.id}`}>Edit course</Link>*/}
            <h1>{course.courseName}</h1>
            <p>{course.description}</p>
          </div>
          <img src={course.logoUrl}/>
        </div>
        <LessonsTable courseId={id} lessons={lessons} handleDeleteLesson={handleDeleteLesson}/>
        <Link className={styles.addLessonLink} to={`/teacher/courses/${id}/lessons/new`}>
          Add lesson
        </Link>
      </div>
    </div>
  );
};

export default CourseLessons;