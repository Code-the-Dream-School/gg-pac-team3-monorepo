import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Home from "./Home";
import MyCourses from "./MyCourses";
import Profile from "./Profile";
import styles from "./UserDashboard.module.css";

const UserDashboard = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(
    location.state?.activeTab || "Home"
  );
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const handleCourseClick = (course) => {
    const isEnrolled = activeTab === "My Courses";
    navigate(`/course/${course.courseName}`, {
      state: { course, isEnrolled, activeTab },
    });
  };

  useEffect(() => {
    // Update the URL based on the active tab
    if (activeTab === "Home") {
      navigate("/UserDashboard/home", { replace: true, state: { activeTab } });
    } else if (activeTab === "My Courses") {
      navigate("/UserDashboard/my-courses", {
        replace: true,
        state: { activeTab },
      });
    } else if (activeTab === "Profile") {
      navigate("/UserDashboard/profile", {
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
            activeTab === "Home" ? styles.activeTab : ""
          }`}
          onClick={() => setActiveTab("Home")}
        >
          Home
        </button>
        <button
          className={`${styles.tabButton} ${
            activeTab === "My Courses" ? styles.activeTab : ""
          }`}
          onClick={() => setActiveTab("My Courses")}
        >
          My Courses
        </button>
        <button
          className={`${styles.tabButton} ${
            activeTab === "Profile" ? styles.activeTab : ""
          }`}
          onClick={() => setActiveTab("Profile")}
        >
          Profile
        </button>
      </header>
      <div className={styles.introText}>
        <h1>Get Started with These Free Courses</h1>
      </div>
      <main className={styles.content}>
        {activeTab === "Home" && (
          <Home userId={userId} onCourseClick={handleCourseClick} />
        )}
        {activeTab === "My Courses" && (
          <MyCourses userId={userId} onCourseClick={handleCourseClick} />
        )}
        {activeTab === "Profile" && <Profile userId={userId} />}
      </main>
    </div>
  );
};

export default UserDashboard;
