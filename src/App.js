"use client"

import { useState, useEffect } from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import LandingPage from "./components/LandingPage"
import Library from "./components/Library"
import Recommendations from "./components/Recommendations"
import Header from "./components/Header"
import Footer from "./components/Footer"
import "./App.css"

function App() {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const isDarkMode = localStorage.getItem("darkMode") === "true"
    setDarkMode(isDarkMode)
  }, [])

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode)
    localStorage.setItem("darkMode", darkMode)
  }, [darkMode])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  return (
    <Router>
      <div className="App">
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route path="/library" element={<Library />} />
          <Route path="/recommendations" element={<Recommendations />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App

