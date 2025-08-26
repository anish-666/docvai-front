import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../lib/api.js'

export default function Conversations(){
  const [items,setItems]=useState([])
  const [err,setErr]=useState('')
  const [phone,setPhone]=useState('')
  const [fromPhone,setFromPhone]=useState('')
  const [prompt,setPrompt]=useState('')

  useEffect(()=>{ (async()=>{ try{ setItems((await api.conversations()).items) }catch(ex){ setErr(ex.message) } })() },[])

  const outbound = async (e)=>{
    e.preventDefault()
    setErr('')
    try{
      await api.outbound({ phone, fromPhone, prompt })
      alert('Call started')
      setPhone(''); setPrompt('')
    }catch(ex){ setErr(ex.message) }
  }

  return (
    <div>
      <h2>Conversations</h2>
      <div className="card">
        <form onSubmit={outbound}>
          <div className="grid">
            <div><label>To (phone)</label><input className="wide" value={phone} onChange={e=>setPhone(e.target.value)} placeholder="+91..." /></div>
            <div><label>From (caller ID)</label><input className="wide" value={fromPhone} onChange={e=>setFromPhone(e.target.value)} placeholder="+918035316096" /></div>
          </div>
          <label>Prompt (optional)</label>
          <textarea rows="3" value={prompt} onChange={e=>setPrompt(e.target.value)} />
          <div style={{marginTop:8}}><button className="primary">Start outbound call</button></div>
        </form>
      </div>

      {err && <div className="card" style={{color:'#ff8484'}}>{err}</div>}
      <div className="card">
        <table className="table">
          <thead><tr><th>When</th><th>Direction</th><th>Phone</th><th>Status</th><th>Duration</th><th>Recording</th></tr></thead>
          <tbody>
            {items.map(x=> (
              <tr key={x.id}>
                <td>{new Date(x.startedAt).toLocaleString()}</td>
                <td><span className="badge">{x.direction}</span></td>
                <td>{x.phone}</td>
                <td>{x.status}</td>
                <td>{x.durationSec ?? '-'}</td>
                <td>{x.recordingUrl ? <a href={x.recordingUrl} target="_blank">play</a> : '-'}</td>
                <td><Link to={`/conversations/${x.id}`}>open</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
