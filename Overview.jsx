import React, { useEffect, useState } from 'react'
import { api } from '../lib/api.js'

export default function Overview(){
  const [sum,setSum]=useState(null)
  const [ts,setTs]=useState([])
  const [err,setErr]=useState('')

  useEffect(()=>{
    (async()=>{
      try{ setSum(await api.analyticsSummary()); setTs((await api.analyticsTimeseries()).points) }
      catch(ex){ setErr(ex.message) }
    })()
  },[])

  return (
    <div>
      <h2>Overview</h2>
      {err && <div className="card" style={{color:'#ff8484'}}>{err}</div>}
      <div className="grid">
        <div className="card"><div>Inbound</div><div className="kpi">{sum?.inbound ?? '-'}</div></div>
        <div className="card"><div>Outbound</div><div className="kpi">{sum?.outbound ?? '-'}</div></div>
        <div className="card"><div>Avg Duration (s)</div><div className="kpi">{sum?.avgDurationSec ?? '-'}</div></div>
        <div className="card"><div>Success Rate</div><div className="kpi">{sum ? Math.round(sum.successRate*100)+'%' : '-'}</div></div>
        <div className="card"><div>Cost</div><div className="kpi">${sum?.costUSD ?? '-'}</div></div>
      </div>
      <div className="card">
        <strong>Timeseries</strong>
        <div style={{fontSize:12,color:'#9aa4b2',marginTop:8}}>
          {ts.length? ts.map(p=>`${p.ts}: in ${p.inbound} · out ${p.outbound} · success ${Math.round(p.successRate*100)}%`).join(' | ') : 'No data yet'}
        </div>
      </div>
    </div>
  )
}
