import { useState, useEffect } from 'react';
import SideBar from '../../components/SideBar/SideBar.jsx';
import styles from './Courses.module.css';

const Courses = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [courses, setCourses] = useState([]);
  const token = localStorage.getItem('authToken');

  useEffect(() => {
    fetch(`${apiUrl}/course`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
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
    <div className={styles.courseContainer}>
    <SideBar />
      <ul className={styles.courseItemsList}>
        {courses.map((course) => {
          return (
          <li key={course.id} className={styles.courseItem}>
              <img className={styles.courseLogo} src={course.imageUrl}/>
              <div><h3>{course.courseName}</h3>
              <p>{course.description}</p></div>
          </li>
          )
        })}
      </ul>
    </div>
  </>
  );
};

export default Courses;
