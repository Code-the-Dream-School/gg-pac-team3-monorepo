import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Home from './Home';
import MyCourses from './MyCourses';
import Profile from './Profile';
import styles from './UserDashboard.module.css';

const HOME_TAB = 'Home';
const MY_COURSES_TAB = 'My Courses';
const PROFILE_TAB = 'Profile';

const UserDashboard = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(
    location.state?.activeTab || HOME_TAB,
  );
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();

  const handleCourseClick = (course) => {
    const isEnrolled = activeTab === MY_COURSES_TAB;
    navigate(`/course/${course.courseName}`, {
      state: { course, isEnrolled, activeTab },
    });
  };

  useEffect(() => {
    // Update the URL based on the active tab
    if (activeTab === HOME_TAB) {
      navigate('/UserDashboard/home', { replace: true, state: { activeTab } });
    } else if (activeTab === MY_COURSES_TAB) {
      navigate('/UserDashboard/my-courses', {
        replace: true,
        state: { activeTab },
      });
    } else if (activeTab === PROFILE_TAB) {
      navigate('/UserDashboard/profile', {
        replace: true,
        state: { activeTab },
      });
    }
  }, [activeTab, navigate]);

  return (
    <div className={styles.dashboardContainer}>
      <header className={styles.header}>
        <button
          className={`${styles.tabButton} ${
            activeTab === HOME_TAB ? styles.activeTab : ''
          }`}
          onClick={() => setActiveTab(HOME_TAB)}
        >
          {HOME_TAB}
        </button>
        <button
          className={`${styles.tabButton} ${
            activeTab === MY_COURSES_TAB ? styles.activeTab : ''
          }`}
          onClick={() => setActiveTab(MY_COURSES_TAB)}
        >
          {MY_COURSES_TAB}
        </button>
        <button
          className={`${styles.tabButton} ${
            activeTab === PROFILE_TAB ? styles.activeTab : ''
          }`}
          onClick={() => setActiveTab(PROFILE_TAB)}
        >
          {PROFILE_TAB}
        </button>
      </header>
      <div className={styles.introText}>
        <h1>Get Started with These Free Courses</h1>
      </div>
      <main className={styles.content}>
        {activeTab === HOME_TAB && (
          <Home userId={userId} onCourseClick={handleCourseClick} />
        )}
        {activeTab === MY_COURSES_TAB && (
          <MyCourses userId={userId} onCourseClick={handleCourseClick} />
        )}
        {activeTab === PROFILE_TAB && <Profile userId={userId} />}
      </main>
    </div>
  );
};

export default UserDashboard;
