import './App.css';

import { Route, Routes, useLocation } from 'react-router-dom';

//LAS VIEWS
import LandingPage from './Views/LandingPage/LandingPage';
import HomePage from './Views/HomePage/HomePage';
import NavBar from './Components/NavBar/NavBar';

function App() {

  const location = useLocation();

  return (
    <div className="App">
      {location.pathname !== "/" ? <NavBar/> : null}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;
