import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './Quiz.module.css';
import PropTypes from 'prop-types';
import { fetchQuizByLessonId } from '../../services/api';

const Quiz = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { courseId, lessonId } = location.state || {};
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  const getQuiz = async () => {
    console.log('Lesson ID:', lessonId, 'Course ID:', courseId);
    try {
      if (!lessonId) {
        throw new Error('Lesson ID not found. Please try again.');
      }
      const quizData = await fetchQuizByLessonId(lessonId, courseId);
      if (quizData.length !== '0') {
        setQuiz(quizData);
      } else {
        console.error('Received null or undefined quiz data');
      }
    } catch (error) {
      console.error('Error fetching quiz:', error);
      navigate('/');
    }
  };

  useEffect(() => {
    getQuiz();
  }, [lessonId, courseId, navigate]);

  useEffect(() => {
    console.log('Quiz data updated:', quiz);
  }, [quiz]);

  const handleAnswerChange = (questionId, option) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: option,
    }));
  };

  const handleSubmit = () => {
    let correct = 0;
    let total = 0;

    if (quiz[0]?.questions && Array.isArray(quiz[0].questions)) {
      quiz[0].questions.forEach((question) => {
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
    } else {
      console.error('Quiz questions are not available or not an array');
    }
  };

  const handleRetry = () => {
    setAnswers({});
    setResult(null);
  };

  const handleGoBack = () => {
    navigate(-1); // This will navigate to the previous page
  };

  if (!quiz) return <div>Loading...</div>;

  return (
    <div className={styles.quizContainer}>
      <h2 className={styles.quizTitle}>{quiz[0].title}</h2>
      <form className={styles.quizForm} onSubmit={(e) => e.preventDefault()}>
        {quiz[0].questions && Array.isArray(quiz[0].questions) ? (
          quiz[0].questions.map((question, index) => (
            <div
              key={`${question.questionId}-${index}`}
              className={styles.question}
            >
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
          ))
        ) : (
          <div>No questions available</div>
        )}
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
      <button
        type='button'
        className={styles.goBackButton}
        onClick={handleGoBack}
      >
        Go back to Lesson
      </button>
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
      })
    ).isRequired,
  }),
};

export default Quiz;
