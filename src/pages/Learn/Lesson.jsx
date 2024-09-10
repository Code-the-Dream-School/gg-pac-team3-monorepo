import { useState, useEffect } from 'react';
import styles from './Lesson.module.css';
import PropTypes from 'prop-types';
import speakerIcon from '../../assets/images/speaker-icon-png.png';
import { useNavigate, useLocation } from 'react-router-dom';
import { fetchQuizByLessonId } from '../../services/api';
import Video from '../../components/Video/Video.jsx';

const Lesson = ({ lesson }) => {
  const { id, title, description = {} } = lesson;
  const location = useLocation();
  const { courseId } = location.state || {};
  const [expandedKey, setExpandedKey] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [successMessage, setSuccessMessage] = useState('');
  const [clickedKey, setClickedKey] = useState(null);
  const [highlightedWordIndex, setHighlightedWordIndex] = useState(-1); // Track the word index being spoken
  const MEDIA_TYPES = {
    VIDEO: 'video',
    IMAGE: 'image',
    FILE: 'file',
  };

  useEffect(() => {
    return () => {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
      }
    };
  }, [isSpeaking]);

  const navigate = useNavigate();

  const handleToggle = (key) => {
    setSuccessMessage('');
    setExpandedKey(expandedKey === key ? null : key); // Toggle between expanded and collapsed
  };

  const handleSpeak = (text) => {
    if (isSpeaking) {
      window.speechSynthesis.cancel(); // Stop any ongoing speech
      setIsSpeaking(false);
    } else {
      const utterance = new SpeechSynthesisUtterance(text);
      const words = text.split(' '); // Split the text into individual words

      utterance.onboundary = (event) => {
        if (event.name === 'word') {
          const wordIndex = event.charIndex / (text.length / words.length); // Calculate the current word index
          setHighlightedWordIndex(Math.floor(wordIndex));
        }
      };

      utterance.onend = () => {
        setIsSpeaking(false);
        setHighlightedWordIndex(-1); // Reset word highlight
      };

      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  useEffect(() => {
    setSuccessMessage(''); // Reset the success message when lesson prop changes
  }, [lesson]);

  const handleZoomIn = () =>
    setZoomLevel((prevZoom) => Math.min(prevZoom + 0.1, 2)); // Max zoom in
  const handleZoomOut = () =>
    setZoomLevel((prevZoom) => Math.max(prevZoom - 0.1, 1)); // Min zoom out

  const handleQuizClick = async () => {
    try {
      const quizData = await fetchQuizByLessonId(id, courseId);
      if (quizData && quizData.length > 0) {
        navigate(`/learn/${courseId}/lesson/${title.trim()}/quiz`, {
          state: { courseId, lessonId: id },
        }); // Navigate to Quiz component with lesson ID
      } else {
        setSuccessMessage('Quiz not available for this lesson');
      }
    } catch (error) {
      console.error('Error fetching quiz:', error);
      setSuccessMessage('An error occurred while fetching quiz data.');
    }
  };

  return (
    <div className={styles.lessonContainer}>
      <h2 className={styles.learnTitle}>{title}</h2>
      {clickedKey && (
        <div className={styles.clickedKeyDisplay}>{clickedKey}</div>
      )}
      <div className={styles.lessonDescription}>
        {Object.keys(description).map((key) => (
          <div key={key} className={styles.descriptionSection}>
            <div className={styles.descriptionTitleContainer}>
              <button
                className={styles.descriptionTitle}
                onClick={() => {
                  handleToggle(key);
                  setClickedKey(clickedKey === key ? null : key); // Toggle the clicked key
                }}
                aria-expanded={expandedKey === key}
              >
                {/* {key} */}
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </button>
            </div>
            {key !== MEDIA_TYPES.VIDEO &&
              key !== MEDIA_TYPES.IMAGE &&
              key !== MEDIA_TYPES.FILE &&
              clickedKey === key && (
                <div className={styles.speakerIconContainer}>
                  <img
                    src={speakerIcon}
                    alt='Speak'
                    className={styles.speakerIcon}
                    onClick={() => handleSpeak(description[key])}
                    title={isSpeaking ? 'Stop Speaking' : 'Speak'}
                  />
                </div>
              )}
            {expandedKey === key && (
              <div className={styles.descriptionContent}>
                {key === MEDIA_TYPES.VIDEO ? (
                  <Video videoLink={description[key]} />
                ) : key === MEDIA_TYPES.IMAGE ? (
                  <div className={styles.imageWrapper}>
                    <img
                      src={description[key]}
                      alt={key}
                      className={styles.imageDisplay}
                      style={{ transform: `scale(${zoomLevel})` }}
                    />
                    <div className={styles.zoomControls}>
                      <button
                        onClick={handleZoomIn}
                        className={styles.zoomButton}
                      >
                        +
                      </button>
                      <button
                        onClick={handleZoomOut}
                        className={styles.zoomButton}
                      >
                        -
                      </button>
                    </div>
                    <a
                      href={description[key]}
                      download
                      className={styles.downloadLink}
                    >
                      Download Image
                    </a>
                  </div>
                ) : key === MEDIA_TYPES.FILE ? (
                  <>
                    <div className={styles.pdfViewer}>
                      <iframe
                        src={description[key]}
                        className={styles.pdfFrame}
                        title='PDF Viewer'
                      ></iframe>
                      <a
                        href={description[key]}
                        download
                        className={styles.downloadLink}
                      >
                        Download PDF
                      </a>
                    </div>
                  </>
                ) : (
                  <p>
                    {description[key].split(' ').map((word, index) => (
                      <span
                        key={index}
                        className={
                          index === highlightedWordIndex
                            ? styles.highlightedWord
                            : ''
                        }
                      >
                        {word + ' '}
                      </span>
                    ))}
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className={styles.quizButtonContainer}>
        <button className={styles.quizButton} onClick={handleQuizClick}>
          Quiz
        </button>
        {successMessage && (
          <p className={styles.successMessage}>{successMessage}</p>
        )}
      </div>
    </div>
  );
};

Lesson.propTypes = {
  lesson: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    materials: PropTypes.string,
    description: PropTypes.objectOf(PropTypes.string),
  }).isRequired,
};

export default Lesson;
