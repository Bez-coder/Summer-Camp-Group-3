import React, { useEffect, useState } from 'react'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5001/api'

export default function Admin() {
  const [gate, setGate] = useState('')
  const [ok, setOk] = useState(false)
  const [listings, setListings] = useState<any[]>([])
  const [users, setUsers] = useState<any[]>([])

  async function load() {
    const res = await fetch(`${API}/listings`)
    const ls = await res.json()
    setListings(ls)
  }

  useEffect(() => { if (ok) load() }, [ok])

  function enter() {
    if (gate === '12345678') setOk(true)
    else alert('Wrong admin password')
  }

  return (
    <div className="p-4">
      {!ok ? (
        <div className="max-w-sm mx-auto border border-slate-200 rounded p-4">
          <h2 className="text-xl font-semibold mb-2">Admin Access</h2>
          <input className="border border-slate-300 rounded px-3 py-2 w-full" placeholder="Enter admin password" type="password" value={gate} onChange={e => setGate(e.target.value)} />
          <button className="mt-2 py-2 px-4 rounded bg-emerald-600 hover:bg-emerald-700 text-white" onClick={enter}>Enter</button>
        </div>
      ) : (
        <div className="grid gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Listings</h3>
            <div className="grid gap-2">
              {listings.map(l => (
                <div key={l.id} className="border border-slate-200 rounded p-3">
                  <div className="font-medium">{l.title}</div>
                  <div className="text-slate-600">{l.description}</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Users (coming soon)</h3>
            <div className="text-slate-600">User management endpoints can be wired here.</div>
          </div>
        </div>
      )}
    </div>
  )
}


