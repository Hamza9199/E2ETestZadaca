import {  } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './stranice/Login';
import Register from './stranice/Register';
import Dashboard from './stranice/Dashboard';
import PregledProizvoda from './stranice/PregledProizvoda';
import './App.css';


function App() {

  return (
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/proizvod/:id" element={<PregledProizvoda />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
