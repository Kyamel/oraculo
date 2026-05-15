import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import Home from "./routes/Home"
import About from "./routes/About"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter> 
    </>
  )
}

export default App
