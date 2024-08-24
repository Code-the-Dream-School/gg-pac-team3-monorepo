import { useState, useEffect } from 'react';
import styles from './TeacherDashboard.module.css';
import SideBar from '../../components/SideBar/SideBar';

const TeacherDashboard = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch(`${apiUrl}/course`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCourses(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <SideBar />
      <div>
        <h1>Welcome to TeacherDashboard</h1>
      </div>
      <div className={styles.courseContainer}>
        <table className={styles.courseTable}>
          <thead>
            <tr>
              <th>Course</th>
              <th>Total lessons</th>
              <th>Points</th>
              <th>Enrolled students</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => {
              return (
                <tr key={index}>
                  <td>{course.courseName}</td>
                  <td>{course.lessons.length}</td>
                  <td>
                    {course.lessons.reduce(
                      (pointSum, { points }) => pointSum + points,
                      0,
                    )}
                  </td>
                  <td>{course.user_courses.length}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TeacherDashboard;
