import { BrowserRouter, Routes, Route} from 'react-router-dom';
// import {  } from "./pages/frontPage/";
import FrontPage from './pages/frontPage/FrontPage';
import CourseDetails from './pages/CourseDetails/CourseDetails';
import UserDashboard from './pages/UserDashboard/UserDashboard';
import Learn from './pages/Learn/Learn';
import './App.css'
import { useState } from 'react';
import Panel from './pages/frontPage/Panel';
import Courses from "./pages/Courses/Courses";
import TeacherDashboard from "./pages/TeacherDashboard/TeacherDashboard";


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Panel isLoggedIn={isLoggedIn}/>}>
          <Route path="/frontpage" element={<FrontPage/>} />
          
        </Route>

        <Route path="/UserDashboard" element={<UserDashboard/>} />
        <Route path="/course/:courseName" element={<CourseDetails/>} />
        <Route path="/Learn" element={<Learn />} />

        <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
        <Route path="/teacher/courses" element={<Courses />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
