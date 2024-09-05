const LessonsTable = ({lessons = []}) => {
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
              <button>Edit</button>
              <button>Delete</button>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </>
  );
};

export default LessonsTable;