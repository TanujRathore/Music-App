import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './usercontext';
import Login from './pages/Login'; // 确保使用正确的组件名（首字母大写的 Login，而不是小写的 login）
import Home from './pages/Home'

function App() {
  return (
    <Router>
      <UserProvider> 
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} /> 
        </Routes>
      </UserProvider>
    </Router>
  );
}

export default App;


