import LessonForm from "../../components/LessonForm/LessonForm.jsx";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

const EditLesson = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const { id } = useParams();
  const [lesson, setLesson] = useState({});
  const token = localStorage.getItem('authToken');

  useEffect(() => {
    fetch(`${apiUrl}/lesson/${id}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
      return response.json();
    }).then((data) => {
      setLesson(data);
    }).catch((error) => {
      console.error(error);
    });
  }, [id])
  // const lesson = course.lessons.find(lesson => lesson.id === lessonId);

  return (
    <div>
      <LessonForm initialData={lesson} />
    </div>
  );
};

export default EditLesson;