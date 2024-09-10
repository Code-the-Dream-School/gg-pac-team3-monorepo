import {useState, useEffect} from 'react';
import styles from "./TeacherDashboard.module.css";
import SideBar from "../../components/SideBar/SideBar";
import {Link, useNavigate} from "react-router-dom";

const TeacherDashboard = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const [courses, setCourses] = useState([]);
  const [teacherName, setTeacherName] = useState('');
  const token = localStorage.getItem('authToken');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/');
      return
    }

    fetch(`${baseUrl}/course/teacher_courses`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      }).then(data => {
      setCourses(data);
    }).catch(error => {
      console.error(error);
      navigate('/');
    });
  }, []);

  const totalPoints = (lessons) => {
    return lessons.reduce((pointSum, {points}) => pointSum + points, 0);
  };

  return (
    <div className={styles.teacherDashboardContainer}>
      <SideBar/>
      <div className={styles.courseContainer}>
        <div className={styles.headerDashboard}>
          <h1>Welcome to your dashboard</h1>
        </div>
        <table className={styles.courseTable}>
          <thead className={styles.courseTableHeader}>
          <tr>
            <th></th>
            <th>Course</th>
            <th>Total lessons</th>
            <th>Points</th>
            <th>Enrolled students</th>
          </tr>
          </thead>
          <tbody className={styles.courseTableBody}>
          {
            courses.length === 0 ?
              <tr>
                <td colSpan="5">
                  You don't have any courses yet. To get started, add a new course!
                </td>
              </tr> :
              courses.map((course) => {
                return (
                  <tr key={course.id}>
                    <td><img className={styles.courseLogo} src={course.logoUrl}/></td>
                    <td><Link className={styles.courseLink}
                              to={`/teacher/courses/${course.id}/lessons`}>{course.courseName}</Link></td>
                    <td>{course.lessons.length}</td>
                    <td>{totalPoints(course.lessons)}</td>
                    <td>{course.user_courses?.length}</td>
                    <td><Link className={styles.courseEditLink} to={`/teacher/courses/edit/${course.id}`}>Edit course</Link></td>
                  </tr>
                )
              })
          }
          </tbody>
        </table>
        <Link className={styles.newCourseLink} to={"/teacher/courses/new"}>New Course</Link>
      </div>
    </div>
  )
}

export default TeacherDashboard;
