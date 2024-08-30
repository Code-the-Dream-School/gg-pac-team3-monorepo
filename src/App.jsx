import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Panel from './components/layout/Panel';
import Courses from './pages/Courses/Courses';
import TeacherDashboard from './pages/TeacherDashboard/TeacherDashboard';
import FrontPage from './pages/frontPage/FrontPage';
import CourseDetails from './pages/CourseDetails/CourseDetails';
import UserDashboard from './pages/UserDashboard/UserDashboard';
import './App.css';
import NewCourse from "./pages/NewCourse/NewCourse.jsx";
import EditCourse from "./pages/EditCourse/EditCourse.jsx";
import NewLesson from "./pages/NewLesson/NewLesson.jsx";
import EditLesson from "./pages/EditLesson/EditLesson.jsx";
import CourseLessons from "./pages/CourseLessons/CourseLessons.jsx";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Panel isLoggedIn={isLoggedIn} />}>
          <Route path='/' element={<FrontPage />} />
          <Route path='/teacher/dashboard' element={<TeacherDashboard />} />
          <Route path='/teacher/courses/new' element={<NewCourse />} />
          <Route path='/teacher/courses/edit/:id' element={<EditCourse />} />
          <Route path='/teacher/courses/:id/lessons' element={<CourseLessons />} />
          <Route path='/teacher/courses/:id/lessons/new' element={<NewLesson />} />
          <Route path='/teacher/courses/:id/lessons/edit/:lessonId' element={<EditLesson />} />
          <Route path='/teacher/courses' element={<Courses />} />
          <Route path='/UserDashboard/home' element={<UserDashboard />} />
          <Route path='/UserDashboard/my-courses' element={<UserDashboard />} />
          <Route path='/UserDashboard/profile' element={<UserDashboard />} />
          <Route path='/course/:courseName' element={<CourseDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
