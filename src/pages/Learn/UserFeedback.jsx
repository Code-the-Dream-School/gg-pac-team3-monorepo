import { useState } from 'react';
import styles from './UserFeedback.module.css';
import { useNavigate } from 'react-router-dom';
import { addUserFeedbackToCourse } from '../../services/api';

const UserFeedback = ({ courseId }) => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState(null);
  //   const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  const handleRatingChange = (e) => {
    setRating(Number(e.target.value));
  };

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (rating === 0 || feedback.trim() === '') {
      setError('Please provide a rating and feedback.');
      return;
    }

    try {
      await addUserFeedbackToCourse({ courseId, userId, rating, feedback });
      setSubmitSuccess(true);
      setError(null);
      // Navigate to a confirmation page or the course details page
      //   navigate(`/course/${courseId}`);
    } catch (err) {
      console.error('Error submitting feedback:', err);
      setError('Error submitting feedback. Please try again.');
    }
  };

  return (
    <div className={styles.feedbackContainer}>
      <h2>Give Feedback for the Course</h2>

      {error && <p className={styles.errorMessage}>{error}</p>}
      {submitSuccess && (
        <p className={styles.successMessage}>
          Feedback submitted successfully!
        </p>
      )}

      <form onSubmit={handleSubmit} className={styles.feedbackForm}>
        <div className={styles.ratingContainer}>
          <label htmlFor='rating'>Rating (out of 5):</label>
          <select
            id='rating'
            value={rating}
            onChange={handleRatingChange}
            className={styles.ratingSelect}
          >
            <option value='0'>Select Rating</option>
            <option value='1'>1 - Poor</option>
            <option value='2'>2 - Fair</option>
            <option value='3'>3 - Good</option>
            <option value='4'>4 - Very Good</option>
            <option value='5'>5 - Excellent</option>
          </select>
        </div>

        <div className={styles.feedbackContainer}>
          <label htmlFor='feedback'>Your Feedback:</label>
          <textarea
            id='feedback'
            value={feedback}
            onChange={handleFeedbackChange}
            className={styles.feedbackTextarea}
            placeholder='Share your thoughts about the course...'
            rows='5'
          />
        </div>

        <button
          type='submit'
          className={styles.submitButton}
          onClick={handleSubmit}
        >
          Submit Feedback
        </button>
      </form>
    </div>
  );
};

export default UserFeedback;
