import QuizForm from "../../components/QuizForm/QuizForm.jsx";
import {useNavigate, useParams} from "react-router-dom";

const NewQuiz = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const token = localStorage.getItem('authToken');
  const { id, lessonId } = useParams();
  const navigate = useNavigate()

  const handleSubmit = async (e, formData) => {
    e.preventDefault();
    const responce = await fetch(`${apiUrl}/course/${id}/${lessonId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(formData)
    });

    if (!responce.ok) {
      throw new Error('Failed to create quiz');
    }

    return navigate(`/teacher/courses/${id}/lessons/edit/${lessonId}`);
  }

  return (
    <div>
      <QuizForm handleSubmit={handleSubmit}/>
    </div>
  );
};

export default NewQuiz;