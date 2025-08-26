import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { api } from '../lib/api.js'

export default function Conversation(){
  const { id } = useParams()
  const [data,setData]=useState(null)
  const [err,setErr]=useState('')

  useEffect(()=>{ (async()=>{
    try{ setData(await api.transcript(id)) }catch(ex){ setErr(ex.message) }
  })() },[id])

  return (
    <div>
      <h2>Conversation</h2>
      {err && <div className="card" style={{color:'#ff8484'}}>{err}</div>}
      <div className="card">
        {!data ? 'Loading...' : (
          <div>
            <div style={{marginBottom:8,color:'#9aa4b2'}}>Turns: {data.turns.length}</div>
            {data.turns.map(t=>(
              <div key={t.id} style={{marginBottom:8}}>
                <strong>{t.role}:</strong> {t.text}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
