import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Panel from './components/layout/Panel';
import Courses from './pages/Courses/Courses';
import TeacherDashboard from './pages/TeacherDashboard/TeacherDashboard';
import FrontPage from './pages/frontPage/FrontPage';
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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
