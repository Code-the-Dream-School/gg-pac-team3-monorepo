import { BrowserRouter, Routes, Route} from 'react-router-dom';
import FrontPage from './pages/frontPage/FrontPage';
import './App.css'
import { useState } from 'react';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FrontPage isLoggedIn={isLoggedIn} />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
