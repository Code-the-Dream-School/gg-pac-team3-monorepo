import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './Quiz.module.css';
import PropTypes from 'prop-types';
import { fetchQuizByLessonId } from '../../services/api'; // Import your API function

const Quiz = () => {
  const { lessonId, courseId } = useParams(); // Get lesson ID from URL
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  useEffect(() => {
    const getQuiz = async () => {
      try {
        const quizData = await fetchQuizByLessonId(lessonId, courseId); // Fetch quiz data
        setQuiz(quizData);
      } catch (error) {
        console.error('Error fetching quiz:', error);
      }
    };
    getQuiz();
  }, [lessonId, courseId]);

  const handleAnswerChange = (questionId, option) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: option,
    }));
  };

  const handleSubmit = () => {
    let correct = 0;
    let total = 0;

    quiz.questions.forEach((question) => {
      total += 1;
      if (answers[question.questionId] === question.answer) {
        correct += 1;
      }
    });

    setResult({
      correct,
      total,
      score: (correct / total) * 100,
    });
  };

  const handleRetry = () => {
    setAnswers({});
    setResult(null);
  };

  if (!quiz) return <div>Loading...</div>;

  return (
    <div className={styles.quizContainer}>
      <h2 className={styles.quizTitle}>{quiz.title}</h2>
      <form className={styles.quizForm} onSubmit={(e) => e.preventDefault()}>
        {quiz.questions.map((question) => (
          <div key={question.questionId} className={styles.question}>
            <h3 className={styles.questionText}>{question.questionText}</h3>
            {question.options.map((option) => (
              <label key={option} className={styles.option}>
                <input
                  type='radio'
                  name={question.questionId}
                  value={option}
                  checked={answers[question.questionId] === option}
                  onChange={() =>
                    handleAnswerChange(question.questionId, option)
                  }
                />
                {option}
              </label>
            ))}
          </div>
        ))}
        <button
          type='button'
          className={styles.submitButton}
          onClick={handleSubmit}
        >
          Submit
        </button>
        {result && (
          <div className={styles.result}>
            <p>Correct: {result.correct}</p>
            <p>Wrong: {result.total - result.correct}</p>
            <p>Score: {result.score.toFixed(2)}%</p>
            <button
              type='button'
              className={styles.retryButton}
              onClick={handleRetry}
            >
              Retry
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

Quiz.propTypes = {
  quiz: PropTypes.shape({
    title: PropTypes.string.isRequired,
    questions: PropTypes.arrayOf(
      PropTypes.shape({
        questionId: PropTypes.string.isRequired,
        questionText: PropTypes.string.isRequired,
        options: PropTypes.arrayOf(PropTypes.string).isRequired,
        answer: PropTypes.string.isRequired,
      }),
    ).isRequired,
  }),
};

export default Quiz;
