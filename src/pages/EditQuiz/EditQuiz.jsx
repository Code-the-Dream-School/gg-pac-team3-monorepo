import QuizForm from "../../components/QuizForm/QuizForm.jsx";
import {useNavigate, useParams} from "react-router-dom";
import { useState, useEffect } from "react";

const EditQuiz = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const token = localStorage.getItem('authToken');
  const { id, lessonId, quizId } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);

  console.log(id, lessonId, quizId)

  console.log({quiz})

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }

    if (!id || !lessonId || !quizId) {
      navigate(`/teacher/courses/${id}/lessons/edit/${lessonId}`);
    }

    fetch(`${apiUrl}/course/${id}/${lessonId}/quiz/${quizId}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      },
    }).then((response) => {
      return response.json();
    }).then((data) => {
      setQuiz(data);
    }).catch((error) => {
      console.error(error);
    });
  }, []);

  const handleSubmit = async (e, formData) => {
    e.preventDefault();
    const responce = await fetch(`${apiUrl}/course/${id}/${lessonId}/quiz/${quizId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(formData)
    });

    if (!responce.ok) {
      throw new Error('Failed to update quiz');
    }

    return navigate(`/teacher/courses/${id}/lessons/edit/${lessonId}`);
  }

  if(!quiz) return null;

  return (
    <div>
      <QuizForm handleSubmit={handleSubmit} initialData={quiz}/>
    </div>
  );
};

export default EditQuiz;