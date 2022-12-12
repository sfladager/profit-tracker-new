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
import Trades from './components/pages/trades/Trades'
import TradeNew from './components/pages/trades/TradeNew'
import TradeSingle from './components/pages/trades/TradeSingle'
import ExecutionNew from './components/pages/trades/ExecutionNew'
import SessionsAll from './components/pages/sessions/SessionsAll'
import SessionNew from './components/pages/sessions/SessionNew'
import SessionSingle from './components/pages/sessions/SessionSingle'

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
          <Route path="/trades" element={<Trades />} />
          <Route path="/trades/trade/add" element={<TradeNew />} />
          <Route path="/trades/:TradeId" element={<TradeSingle />} />
          <Route path="/trades/:TradeId/execution/add" element={<ExecutionNew />} />
          <Route path="/sessions" element={<SessionsAll />} />
          <Route path="/sessions/single/add" element={<SessionNew />} />
          <Route path="/sessions/:SessionId" element={<SessionSingle />} />


        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
