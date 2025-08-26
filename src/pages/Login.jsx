import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../lib/api.js'

export default function Login(){
  const [email,setEmail]=useState('admin@demo.com')
  const [password,setPassword]=useState('demo123')
  const [err,setErr]=useState('')
  const nav=useNavigate()

  const submit=async(e)=>{
    e.preventDefault()
    setErr('')
    try{
      const r=await api.login(email,password)
      localStorage.setItem('token', r.token)
      nav('/overview')
    }catch(ex){ setErr(ex.message) }
  }

  return (
    <div className="card" style={{maxWidth:420, margin:'40px auto'}}>
      <h2>Sign in</h2>
      <form onSubmit={submit}>
        <label>Email</label>
        <input className="wide" value={email} onChange={e=>setEmail(e.target.value)} />
        <label>Password</label>
        <input className="wide" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        {err && <div style={{color:'#ff8484', marginTop:8}}>{err}</div>}
        <div style={{marginTop:12, display:'flex', gap:8}}>
          <button className="primary" type="submit">Login</button>
          <a href="#" onClick={(e)=>{e.preventDefault(); setEmail('client1@demo.com'); setPassword('client123')}}>Use client demo</a>
        </div>
      </form>
      <div style={{marginTop:12, color:'#9aa4b2'}}>API: {api.base}</div>
    </div>
  )
}
