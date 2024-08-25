import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Panel from './components/layout/Panel';
import Courses from './pages/Courses/Courses';
import TeacherDashboard from './pages/TeacherDashboard/TeacherDashboard';
import FrontPage from './pages/frontPage/FrontPage';
import CourseDetails from './pages/CourseDetails/CourseDetails';
import UserDashboard from './pages/UserDashboard/UserDashboard';
import Learn from './pages/Learn/Learn';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Panel isLoggedIn={isLoggedIn} />}>
          <Route path='/' element={<FrontPage />} />
          <Route path='/teacher/dashboard' element={<TeacherDashboard />} />
          <Route path='/teacher/courses' element={<Courses />} />
          <Route path='/UserDashboard/home' element={<UserDashboard />} />
          <Route path='/UserDashboard/my-courses' element={<UserDashboard />} />
          <Route path='/UserDashboard/profile' element={<UserDashboard />} />
          <Route path='/course/:courseName' element={<CourseDetails />} />
          <Route path='/learn/:courseId/lesson/:lessonId' element={<Learn />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
