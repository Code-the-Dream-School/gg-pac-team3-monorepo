import {useParams, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {jwtDecode} from "jwt-decode";
import CourseForm from "../../components/CourseForm/CourseForm.jsx";

const NewCourse = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [course, setCourse] = useState({});
  const navigate = useNavigate();
  const token = localStorage.getItem('authToken');
  const decodedToken = jwtDecode(token);
  const teacherEmail = decodedToken.email;

  const handleSubmit = (data) => {
    const formData = new FormData();

    for (const key in data) {
      formData.append(key, data[key]);
    }
    formData.append('createdBy', teacherEmail);
    formData.append('courseId', data.courseName);

    fetch(`${apiUrl}/course`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData,
    }).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Failed to create course');
      }
    }).then((data) => {
      console.log({data});
      const {courseId} = data;
      navigate(`/teacher/courses/${courseId}/lessons`);
    }).catch((error) => {
      console.error(error);
    });
  }

  return (
    <div>
      <CourseForm initialData={course} onSubmit={handleSubmit} formTitle={"Create a new course"}/>
    </div>
  );
};

export default NewCourse;