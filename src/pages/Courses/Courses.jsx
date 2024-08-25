import { useState, useEffect } from 'react';
import SideBar from '../../components/SideBar/SideBar.jsx';
import styles from './Courses.module.css';

const Courses = () => {
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
    <div className={styles.courseContainer}>
      <SideBar />
      <ul className={styles.courseItems}>
        {courses.map((course, index) => {
          return <li key={index}>{course.courseName}</li>;
        })}
      </ul>
    </div>
  );
};

export default Courses;
