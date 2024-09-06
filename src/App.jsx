import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import Panel from './components/layout/Panel';
import Courses from './pages/Courses/Courses';
import TeacherDashboard from './pages/TeacherDashboard/TeacherDashboard';
import FrontPage from './pages/frontPage/FrontPage';
import CourseDetails from './pages/CourseDetails/CourseDetails';
import UserDashboard from './pages/UserDashboard/UserDashboard';
import Learn from './pages/Learn/Learn';
import CourseInfo from './pages/Learn/CourseInfo';
import UserFeedback from './pages/Learn/UserFeedback';
import Quiz from './pages/Learn/Quiz';

import './App.css';
import NewCourse from './pages/NewCourse/NewCourse.jsx';
import EditCourse from './pages/EditCourse/EditCourse.jsx';
import NewLesson from './pages/NewLesson/NewLesson.jsx';
import EditLesson from './pages/EditLesson/EditLesson.jsx';
import CourseLessons from './pages/CourseLessons/CourseLessons.jsx';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Panel />}>
            <Route path='/' element={<FrontPage />} />
            <Route path='/teacher/dashboard' element={<TeacherDashboard />} />
            <Route path='/teacher/courses/new' element={<NewCourse />} />
            <Route path='/teacher/courses/edit/:id' element={<EditCourse />} />
            <Route
              path='/teacher/courses/:id/lessons'
              element={<CourseLessons />}
            />
            <Route
              path='/teacher/courses/:id/lessons/new'
              element={<NewLesson />}
            />
            <Route
              path='/teacher/courses/:id/lessons/edit/:lessonId'
              element={<EditLesson />}
            />
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
              path='/learn/:courseId/courseInfo'
              element={<CourseInfo />}
            />
            <Route
              path='/learn/:courseId/UserFeedback'
              element={<UserFeedback />}
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
