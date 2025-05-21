import {  } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './stranice/Login';
import Register from './stranice/Register';
import Home from './stranice/Home';
import PregledProizvoda from './stranice/PregledProizvoda';
import Korpa from './stranice/Korpa';
import './App.css';
import Admin from './stranice/Admin';


function App() {

  return (
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/korpa" element={<Korpa />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/proizvod/:id" element={<PregledProizvoda />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
