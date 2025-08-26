import React from 'react'
import { Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Overview from './pages/Overview.jsx'
import Conversations from './pages/Conversations.jsx'
import Conversation from './pages/Conversation.jsx'
import Campaigns from './pages/Campaigns.jsx'
import Agents from './pages/Agents.jsx'
import { api } from './lib/api.js'

function Nav() {
  const nav = useNavigate()
  const logout = () => { localStorage.removeItem('token'); nav('/login') }
  return (
    <nav>
      <strong>Bolna Dashboard</strong>
      <Link to="/overview">Overview</Link>
      <Link to="/conversations">Conversations</Link>
      <Link to="/campaigns">Campaigns</Link>
      <Link to="/agents">Agents</Link>
      <div className="spacer" />
      <button onClick={()=>api.ping()} title="API status">Ping</button>
      <button onClick={logout}>Logout</button>
    </nav>
  )
}

function RequireAuth({ children }){
  const token = localStorage.getItem('token')
  if(!token) return <Navigate to="/login" replace />
  return <>{children}</>
}

export default function App(){
  return (
    <>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<Navigate to="/overview" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/overview" element={<RequireAuth><Overview/></RequireAuth>} />
          <Route path="/conversations" element={<RequireAuth><Conversations/></RequireAuth>} />
          <Route path="/conversations/:id" element={<RequireAuth><Conversation/></RequireAuth>} />
          <Route path="/campaigns" element={<RequireAuth><Campaigns/></RequireAuth>} />
          <Route path="/agents" element={<RequireAuth><Agents/></RequireAuth>} />
          <Route path="*" element={<div className="card">Not found</div>} />
        </Routes>
      </div>
    </>
  )
}
