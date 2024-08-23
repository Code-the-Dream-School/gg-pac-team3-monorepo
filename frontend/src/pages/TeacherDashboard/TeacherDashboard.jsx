import React, {useState, useEffect} from 'react';
import styles from "./TeacherDashboardStyles.module.css"
import SideBar from "../../components/SideBar/SideBar";

const TeacherDashboard = () => {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const [courses, setCourses] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token) return;

        fetch(`${apiUrl}/course/teacher_courses`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => {
            return response.json();
        }).then(data => {
            setCourses(data);
        }).catch(error => {
            console.log(error);
        });
    }, []);

    const totalPoints = (lessons) => {
        return lessons.reduce((pointSum, {points}) => pointSum + points, 0);
    };

    if (!token) return null;

    return (
        <div className={styles.teacherDashboardContainer}>
            <SideBar />
            <div className={styles.courseContainer}>
                <div className={styles.headerDashboard}>
                    <h1>Welcome to TeacherDashboard</h1>
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
                                <td colSpan="5">You don’t have any courses. To start your way as a teacher add a new
                                    course today
                                </td>
                            </tr> :
                            courses.map((course) => {
                                return (
                                    <tr key={course.id}>
                                        <td><img className={styles.courseLogo} src={course.imageUrl}/></td>
                                        <td>{course.courseName}</td>
                                        <td>{course.lessons.length}</td>
                                        <td>{totalPoints(course.lessons)}</td>
                                        <td>{course.user_courses.length}</td>
                                    </tr>
                                )
                            })
                    }
                    </tbody>
                </table>
                <div>
                    <button className={styles.newCourseButton}>New Course</button>
                </div>
            </div>
        </div>
    )
}

export default TeacherDashboard;