import { useState, useEffect } from 'react';
import styles from './Lesson.module.css';
import PropTypes from 'prop-types';
import speakerIcon from '../../assets/images/speaker-icon-png.png';
import { useNavigate } from 'react-router-dom';

const Lesson = ({ lesson, courseId }) => {
  const { id, title, description = {} } = lesson;
  const [expandedKey, setExpandedKey] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1); // Zoom level state
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
    setExpandedKey(expandedKey === key ? null : key); // Toggle between expanded and collapsed
  };

  const handleSpeak = (text) => {
    if (isSpeaking) {
      window.speechSynthesis.cancel(); // Stop any ongoing speech
      setIsSpeaking(false);
    } else {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  const handleZoomIn = () =>
    setZoomLevel((prevZoom) => Math.min(prevZoom + 0.1, 2)); // Max zoom in
  const handleZoomOut = () =>
    setZoomLevel((prevZoom) => Math.max(prevZoom - 0.1, 1)); // Min zoom out

  const handleQuizClick = () => {
    navigate(`/learn/${courseId}/lesson/${title}/quiz/${id}`); // Navigate to Quiz component with lesson ID
  };

  return (
    <div className={styles.lessonContainer}>
      <h2 className={styles.learnTitle}>{title}</h2>
      <div className={styles.lessonDescription}>
        {Object.keys(description).map((key) => (
          <div key={key} className={styles.descriptionSection}>
            <div className={styles.descriptionTitleContainer}>
              <button
                className={styles.descriptionTitle}
                onClick={() => handleToggle(key)}
                aria-expanded={expandedKey === key}
              >
                {key} 
              </button>
              {key !== MEDIA_TYPES.VIDEO &&
                key !== MEDIA_TYPES.IMAGE &&
                key !== MEDIA_TYPES.FILE && (
                  <img
                    src={speakerIcon}
                    alt='Speak'
                    className={styles.speakerIcon}
                    onClick={() => handleSpeak(description[key])}
                    title={isSpeaking ? 'Stop Speaking' : 'Speak'} // Change tooltip based on state
                  />
                )}
            </div>
            {expandedKey === key && (
              <div className={styles.descriptionContent}>
                {key === MEDIA_TYPES.VIDEO ? (
                  <>
                    <video
                      controls
                      src={description[key]}
                      className={styles.videoPlayer}
                    >
                      Your browser does not support the video tag.
                    </video>
                    <a
                      href={description[key]}
                      download
                      className={styles.downloadLink}
                    >
                      Download Video
                    </a>
                  </>
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
                  <p>{description[key]}</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className={styles.descriptionSection}>
        <div className={styles.descriptionTitleContainer}>
          <button className={styles.quizButton} onClick={handleQuizClick}>
            Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

Lesson.propTypes = {
  lesson: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    materials: PropTypes.string,
    description: PropTypes.objectOf(PropTypes.string), // Changed to objectOf for dynamic keys
  }).isRequired,
  courseName: PropTypes.string.isRequired,
  courseId: PropTypes.string.isRequired,
};

export default Lesson;
