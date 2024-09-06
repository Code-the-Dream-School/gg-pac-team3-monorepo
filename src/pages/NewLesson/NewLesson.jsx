import LessonForm from "../../components/LessonForm/LessonForm.jsx";
import {useNavigate, useParams} from "react-router-dom";

const NewLesson = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const {id} = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('authToken');

  const handleSubmit = (formData) => {
    console.log('formData', JSON.stringify(Object.fromEntries(formData)))
    fetch(`${apiUrl}/course/${id}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData,
    }).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Failed to create lesson');
      }
    }).then((data) => {
      navigate(`/teacher/courses/${id}/lessons`);
    }).catch((error) => {
      console.error(error);
    });
  }

  return (
    <div>
      <LessonForm onSubmit={handleSubmit} />
    </div>
  );
};

export default NewLesson;