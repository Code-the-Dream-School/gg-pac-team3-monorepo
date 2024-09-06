import {Link} from "react-router-dom";
import styles from './LessonsTable.module.css';

const LessonsTable = ({courseId, lessons = []}) => {
  return (
    <>
      <table>
        <thead>
        <tr>
          <th>Lesson</th>
          <th>Type of lesson</th>
          <th>Points</th>
        </tr>
        </thead>
        <tbody>
        {lessons.map((lesson) => (
          <tr key={lesson.id}>
            <td>{lesson.title}</td>
            <td>{lesson.description.video}</td>
            <td>{lesson.points}</td>
            <td>
              <Link className={styles.lessonEditLink}
                    to={`/teacher/courses/${courseId}/lessons/edit/${lesson.id}`}>Edit</Link>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </>
  );
};

export default LessonsTable;