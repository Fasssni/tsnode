import React from 'react';
import { Card } from './components/Card';
import "./index.css"

import {Routes, Route} from "react-router-dom"

import HomePage from './pages/HomePage';
import FavPages from './pages/FavPages';
import { NavBar } from './components/Navar';


interface ForApp{ 
  
}

function App() {
  return (
    <>
    <NavBar/>
    <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/favpages" element={<FavPages/>}/>
        <Route path="*" element={<HomePage/>}/>
    </Routes>
    </>
  );
}

export default App;
