import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './usercontext';
import Login from './pages/Login'; 
import Home from './pages/Home'
import Signup from './pages/SignUp';
import Staffmain from './pages/staffmain'
import MusicListHome from './pages/MusicListHome';


function App() {
  return (
    <Router>
      <UserProvider> 
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} /> 
        <Route path="/signup" element={<Signup />} />
        <Route path="/staffmain" element={<Staffmain />} />
        <Route path="/MusicListHome/:username" element={<MusicListHome />} />
        </Routes>
      </UserProvider>
    </Router>
  );
}

export default App;


