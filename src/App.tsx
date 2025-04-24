import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Game from './Game';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/game" element={<Game />} />
    </Routes>
  );
}

export default App;