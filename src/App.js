"use client"

import { useState } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Dashboard from "./components/Dashboard"
import CollectionList from "./components/CollectionList"
import CollectionDetails from "./components/CollectionDetails"
import History from "./components/History"
import Navbar from "./components/Navbar"
import "./App.css"

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [driverId, setDriverId] = useState(null)

  // This would normally be handled by your authentication system
  const handleLogin = (id) => {
    setIsAuthenticated(true)
    setDriverId(id)
  }

  return (
    <Router>
      <div className="app">
        {isAuthenticated && <Navbar />}
        <div className="content">
          <Routes>
            <Route
              path="/"
              element={isAuthenticated ? <Dashboard driverId={driverId} /> : <LoginWrapper onLogin={handleLogin} />}
            />
            <Route
              path="/collections"
              element={isAuthenticated ? <CollectionList driverId={driverId} /> : <Navigate to="/" />}
            />
            <Route
              path="/collections/:id"
              element={isAuthenticated ? <CollectionDetails driverId={driverId} /> : <Navigate to="/" />}
            />
            <Route path="/history" element={isAuthenticated ? <History driverId={driverId} /> : <Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

// This is just a wrapper for the login page that you mentioned already exists
function LoginWrapper({ onLogin }) {
  const handleSubmit = (e) => {
    e.preventDefault()
    const driverId = e.target.driverId.value
    onLogin(driverId)
  }

  return (
    <div className="login-wrapper">
      <h1>Cocal - Connexion Chauffeur</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="driverId">Identifiant Chauffeur</label>
          <input type="text" id="driverId" name="driverId" required />
        </div>
        <button type="submit" className="btn-primary">
          Se connecter
        </button>
      </form>
    </div>
  )
}

export default App

