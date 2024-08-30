import {useParams, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {jwtDecode} from "jwt-decode";
import CourseForm from "../../components/CourseForm/CourseForm.jsx";

const EditCourse = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const {id} = useParams();
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
      if (data.createdBy !== teacherEmail) {
        navigate(`/courses/${id}`);
        return;
      }
      setCourse(data);
    }).catch((error) => {
      console.error(error);
    });
  }, [id]);

  const handleSubmit = (data) => {
    const formData = new FormData();

    for (const key in data) {
      formData.append(key, data[key]);
    }

    fetch(`${apiUrl}/course/${id}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData,
    }).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Failed to update course');
      }
    }).then((data) => {
      navigate(`/teacher/courses/${id}/lessons`);
    }).catch((error) => {
      console.error(error);
    });
  }

  return (
    <div>
      <CourseForm initialData={course} onSubmit={handleSubmit} formTitle={"Edit your course"}/>
    </div>
  );
};

export default EditCourse;