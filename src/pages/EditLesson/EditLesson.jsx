import LessonForm from "../../components/LessonForm/LessonForm.jsx";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

const EditLesson = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const { id, lessonId } = useParams();
  const [lesson, setLesson] = useState(null);
  const [quizzes, setQuizzes] = useState(null);
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

    fetch(`${apiUrl}/course/${id}/${lessonId}/quizzes`,{
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      if(response.ok) {
        return response.json();
      }
    }).then((data) => {
      setQuizzes(data);
    }).catch((error) => {
      console.error(error);
    })
  }, [lessonId])

  const handleSubmit = async (formData) => {
    try {
      const response = await fetch(`${apiUrl}/course/${id}/lesson/${lessonId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to update lesson');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      {lesson && <LessonForm
        initialData={lesson}
        onSubmit={handleSubmit}
        formTitle={"Edit your lesson"}
        redirectTo={`/teacher/courses/${id}/lessons`}
        quizzes={quizzes}
      />}
    </div>
  );
};

export default EditLesson;