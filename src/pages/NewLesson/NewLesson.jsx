import LessonForm from "../../components/LessonForm/LessonForm.jsx";
import {useNavigate, useParams} from "react-router-dom";
import SideBar from "../../components/SideBar/SideBar.jsx";
import styles from "./NewLesson.module.css";

const NewLesson = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const {id} = useParams();
  // const navigate = useNavigate();
  const token = localStorage.getItem('authToken');

  const handleSubmit = async (formData) => {
    try {
      const response = await fetch(`${apiUrl}/course/${id}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to create lesson');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={styles.newLessonContainer}>
      {/*<SideBar />*/}
      <LessonForm onSubmit={handleSubmit} formTitle={"Create a new lesson"} redirectTo={`/teacher/courses/${id}/lessons`} />
    </div>
  );
};

export default NewLesson;