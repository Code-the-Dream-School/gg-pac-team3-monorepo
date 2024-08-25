import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import Panel from './components/layout/Panel';
import Courses from './pages/Courses/Courses';
import TeacherDashboard from './pages/TeacherDashboard/TeacherDashboard';
import FrontPage from './pages/frontPage/FrontPage';
import CourseDetails from './pages/CourseDetails/CourseDetails';
import UserDashboard from './pages/UserDashboard/UserDashboard';
import Learn from './pages/Learn/Learn';
import Quiz from './pages/Learn/Quiz';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Panel />}>
            <Route path='/' element={<FrontPage />} />
            <Route path='/teacher/dashboard' element={<TeacherDashboard />} />
            <Route path='/teacher/courses' element={<Courses />} />
            <Route path='/UserDashboard/home' element={<UserDashboard />} />
            <Route
              path='/UserDashboard/my-courses'
              element={<UserDashboard />}
            />
            <Route path='/UserDashboard/profile' element={<UserDashboard />} />
            <Route path='/course/:courseName' element={<CourseDetails />} />
            <Route
              path='/learn/:courseId/lesson/:lessonId'
              element={<Learn />}
            />
            <Route
              path='/learn/:courseId/lesson/:lessonId/quiz'
              element={<Quiz />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
