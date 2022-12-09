import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar from './components/navbar/NavMenu'
// page imports
import Home from './components/pages/Home'
import NotFound from './components/pages/NotFound'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Profile from './components/auth/Profile'
import Dashboard from './components/pages/Dashboard'

const App = () => {

  return (
    <div className="site-wrapper">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard" element={<Dashboard />} />

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
