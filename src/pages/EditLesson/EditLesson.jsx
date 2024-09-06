import LessonForm from "../../components/LessonForm/LessonForm.jsx";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

const EditLesson = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const { id, lessonId } = useParams();
  const [lesson, setLesson] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('authToken');

  useEffect(() => {
    fetch(`${apiUrl}/course/${id}/lesson/${lessonId}`,
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
  }, [lessonId])

  const handleSubmit = (lesson) => {
    fetch(`${apiUrl}/course/${id}/lesson/${lessonId}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(lesson)
    }).then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Failed to update lesson');
      }
    }
    ).then(data => {
      navigate(`/teacher/courses/${id}/lessons`);
    }).catch(error => {
      console.error(error);
    });
  }


  return (
    <div>
      {lesson && <LessonForm initialData={lesson} onSubmit={handleSubmit}/>}
    </div>
  );
};

export default EditLesson;