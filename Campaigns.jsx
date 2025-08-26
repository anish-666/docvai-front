import React, { useEffect, useState } from 'react'
import { api } from '../lib/api.js'

export default function Campaigns(){
  const [items,setItems]=useState([])
  const [name,setName]=useState('Warm leads batch')
  const [fromPhone,setFromPhone]=useState('')
  const [leads,setLeads]=useState('+91..., +91...')
  const [err,setErr]=useState('')

  const load = async()=>{ try{ setItems((await api.campaignsList()).items) }catch(ex){ setErr(ex.message) } }
  useEffect(()=>{ load() },[])

  const create = async(e)=>{
    e.preventDefault(); setErr('')
    try{
      const phones = leads.split(',').map(s=>s.trim()).filter(Boolean).map(p=>({ phone:p }))
      await api.campaignsCreate({ name, leads: phones, fromPhone })
      await load()
      alert('Campaign created')
    }catch(ex){ setErr(ex.message) }
  }

  return (
    <div>
      <h2>Campaigns</h2>
      <div className="card">
        <form onSubmit={create}>
          <div className="grid">
            <div><label>Name</label><input className="wide" value={name} onChange={e=>setName(e.target.value)} /></div>
            <div><label>From (caller ID)</label><input className="wide" value={fromPhone} onChange={e=>setFromPhone(e.target.value)} placeholder="+918035316096" /></div>
          </div>
          <label>Leads (comma separated)</label>
          <input className="wide" value={leads} onChange={e=>setLeads(e.target.value)} />
          <div style={{marginTop:8}}><button className="primary">Create campaign</button></div>
        </form>
      </div>
      {err && <div className="card" style={{color:'#ff8484'}}>{err}</div>}
      <div className="card">
        <table className="table">
          <thead><tr><th>Name</th><th>Status</th><th>Totals</th></tr></thead>
          <tbody>
            {items.map(x=>(
              <tr key={x.id}>
                <td>{x.name}</td>
                <td>{x.status}</td>
                <td>{x.total} rows</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
