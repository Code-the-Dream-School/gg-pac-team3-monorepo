import { BrowserRouter, Routes, Route} from 'react-router-dom';
import FrontPage from './pages/frontPage/FrontPage';
import './App.css'
import { useState } from 'react';
import Panel from './pages/frontPage/Panel';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Panel isLoggedIn={isLoggedIn}/>}>
          <Route path="/frontpage" element={<FrontPage/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
