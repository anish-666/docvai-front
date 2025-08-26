import React, { useEffect, useState } from 'react'
import { api } from '../lib/api.js'

export default function Agents(){
  const [items,setItems]=useState([])
  const [err,setErr]=useState('')

  useEffect(()=>{ (async()=>{ try{ setItems((await api.agents()).items) }catch(ex){ setErr(ex.message) } })() },[])

  return (
    <div>
      <h2>Agents</h2>
      {err && <div className="card" style={{color:'#ff8484'}}>{err}</div>}
      <div className="card">
        <table className="table">
          <thead><tr><th>ID</th><th>Name</th><th>Provider Agent</th><th>Model</th><th>Active</th></tr></thead>
          <tbody>
            {items.map(x=>(
              <tr key={x.id}>
                <td>{x.id}</td>
                <td>{x.name}</td>
                <td>{x.providerAgentId}</td>
                <td>{x.model}</td>
                <td>{String(x.active)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
