import styles from './Lesson.module.css';
import PropTypes from 'prop-types';

const Lesson = ({ lesson }) => {
  const { title, materials = '' } = lesson;
  // const { title, materials = '', videoUrl = [] } = lesson;

  return (
    <div className={styles.lessonContainer}>
      <h2 className={styles.learnTitle}>{title}</h2>
      <div className={styles.lessonMaterials}>
        <p>{materials}</p>
      </div>
    </div>
  );
};

Lesson.propTypes = {
  lesson: PropTypes.shape({
    title: PropTypes.string.isRequired,
    materials: PropTypes.string,
  }).isRequired,
};

export default Lesson;
