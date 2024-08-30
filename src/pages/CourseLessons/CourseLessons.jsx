import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {jwtDecode} from "jwt-decode";
import LessonsTable from "../../components/LessonsTable/LessonsTable.jsx";
import styles from "../Courses/Courses.module.css";
import SideBar from "../../components/SideBar/SideBar.jsx";

const CourseLessons = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const { id } = useParams();
  const [course, setCourse] = useState({});
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
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
    }).catch((error) => {
      console.error(error);
    });
  }, [id]);

  console.log({course});

  return (
    <div>
      <SideBar />
      <div>
        <img src={course.logoUrl}/>
        <h1>{course.courseName}</h1>
        <p>{course.description}</p>
      </div>
      <LessonsTable />
    </div>
  );
};

export default CourseLessons;