import { BrowserRouter, Routes, Route} from 'react-router-dom';
import FrontPage from './pages/frontPage/frontpage';

import './App.css'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={FrontPage()} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
