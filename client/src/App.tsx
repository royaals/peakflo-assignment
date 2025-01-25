
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import  Home from './pages/Home';
import  Display  from './pages/Display';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/display" element={<Display />} />
      </Routes>
    </Router>
  );
}

export default App;