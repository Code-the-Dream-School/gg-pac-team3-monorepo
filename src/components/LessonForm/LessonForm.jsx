const LessonForm = ({initialData={}}) => {
  return (
    <div>
      <input type="text" name="title"/>
      <input type="text" name="points"/>
    </div>
  );
};

export default LessonForm;