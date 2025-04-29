import {  } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './stranice/Login';
import Register from './stranice/Register';
import Dashboard from './stranice/Dashboard';


function App() {

  return (
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
