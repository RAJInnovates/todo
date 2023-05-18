import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Todo from './components/Todo'; // Assuming your App.js is in src/ directory
import LandingPage from './components/LandingPage'; // Assuming your App.js is in src/ directory

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/todo" element={<Todo />} />
      </Routes>
    </Router>
  );
}

export default App;
