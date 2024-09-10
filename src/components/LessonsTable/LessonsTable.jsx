import {Link} from "react-router-dom";
import styles from './LessonsTable.module.css';

const LessonsTable = ({courseId, lessons = [], handleDeleteLesson}) => {

  return (
    <>
      <table className={styles.lessonTable}>
        <thead className={styles.lessonTableHeader}>
        <tr>
          <th>Lesson</th>
          <th>Points</th>
          <th>Type of lesson</th>
        </tr>
        </thead>
        <tbody className={styles.lessonTableBody}>
        {lessons.map((lesson) => (
          <tr key={lesson.id}>
            <td>{lesson.title}</td>
            <td>{lesson.points}</td>
            <td>{Object.keys(lesson.description).join(', ')}</td>
            <td>
              <Link className={styles.lessonEditLink}
                    to={`/teacher/courses/${courseId}/lessons/edit/${lesson.id}`}>Edit</Link>
            </td>
            <td><button className={styles.deleteLessonButton} onClick={() => handleDeleteLesson(lesson.id)}>Delete</button></td>
          </tr>
        ))}
        </tbody>
      </table>
    </>
  );
};

export default LessonsTable;