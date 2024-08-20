import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {  fetchEnrolledCourses, fetchUserProfile, fetchNotEnrolledCourses } from '../../services/api';
import styles from './UserDashboard.module.css';

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('Home');
  const [profileData, setProfileData] = useState(null);
  const [coursesData, setCoursesData] = useState([]);
  const [enrolledCoursesData, setEnrolledCoursesData] = useState([]);
  const userId = localStorage.getItem('userId'); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (activeTab === 'Profile') {
          if (userId) {
            const profile = await fetchUserProfile(userId);
            console.log(profileData);
            setProfileData(profile);
          }
        } else if (activeTab === 'Home') {
          if (userId) {  
            const courses = await fetchNotEnrolledCourses(userId);
            setCoursesData(courses);
          }
        } else if (activeTab === 'My Courses') {
          if (userId) {            
            const enrolledCourses = await fetchEnrolledCourses(userId);
            setEnrolledCoursesData(enrolledCourses);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [activeTab, userId]);

  const handleCourseClick = (course) => {
    const isEnrolled = activeTab === 'My Courses'; 
    navigate(`/course/${course.courseName}`, { state: { course, isEnrolled } });
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className={index < rating ? styles.starFilled : styles.starEmpty}>★</span>
    ));
  };

  return (
    <div className={styles.dashboardContainer}>
      <header className={styles.header}>
       
        <button 
          className={`${styles.tabButton} ${activeTab === 'Home' ? styles.activeTab : ''}`} 
          onClick={() => setActiveTab('Home')}
        >
          Home
        </button>
        <button 
          className={`${styles.tabButton} ${activeTab === 'My Courses' ? styles.activeTab : ''}`} 
          onClick={() => setActiveTab('My Courses')}
        >
          My Courses
        </button>
        <button 
          className={`${styles.tabButton} ${activeTab === 'Profile' ? styles.activeTab : ''}`} 
          onClick={() => setActiveTab('Profile')}
        >
          Profile
        </button>
      </header>
      <div className={styles.introText}>
        <h1>Get Started with These Free Courses</h1>
      </div>
      <main className={styles.content}>
      <div className={styles.parentContainer}>
        {activeTab === 'Profile' && profileData && (
          <div className={styles.profileContainer}>
            <h2>Profile Information</h2>
            <div><img src={profileData.profilePictureUrl} alt="Profile" className={styles.profileImage}/></div>
            <div className={styles.profileDetails}>
              <p><strong>Name:</strong> {profileData.name}</p>
              <p><strong>Email:</strong> {profileData.email}</p>
              {/* <p><strong>Joined:</strong> {new Date(profileData.createdAt).toLocaleDateString()}</p> */}
              {/* Add more profile details as needed */}
            </div>
          </div>
        )}
        {activeTab === 'Home' && (
          <div className={styles.coursesContainer}>
            {coursesData.map(course => (
              <div key={course.courseID} className={styles.courseCard} onClick={() => handleCourseClick(course)}>
                <img src={course.imageUrl} alt={course.courseName} className={styles.courseImage} />
                <div className={styles.courseInfo}>
                  <h3 className={styles.courseName}>{course.courseName}</h3>
                  <p className={styles.courseType}>Type: {course.courseType}</p>
                  <p className={styles.courseDuration}>Duration: {course.duration}</p>
                  <p className={styles.courseRating}>Rating: {renderStars(course.rating)}</p>
                  <p className={styles.courseDescription}>{course.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
        {activeTab === 'My Courses' && (
          <div className={styles.coursesContainer}>
            {enrolledCoursesData.map(course => (
              <div key={course.courseID} className={styles.courseCard} onClick={() => handleCourseClick(course)}>
                <img src={course.imageUrl} alt={course.courseName} className={styles.courseImage} />
                <div className={styles.courseInfo}>
                  <h3 className={styles.courseName}>{course.courseName}</h3>
                  <p className={styles.courseType}>Type: {course.courseType}</p>
                  <p className={styles.courseDuration}>Duration: {course.duration}</p>
                  <p className={styles.courseRating}>Rating: {renderStars(course.rating)}</p>
                  <p className={styles.courseDescription}>{course.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;
