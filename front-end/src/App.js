import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './components/mainPage';
import LoginPage from './components/loginPage';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<MainPage />} />
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </Router>
  );
};

export default App;