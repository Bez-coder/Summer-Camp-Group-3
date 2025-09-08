import React, { useEffect, useState } from 'react'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5001/api'

type Listing = { id: number; title: string; priceBirr: number }

export default function MyListings() {
  const [items, setItems] = useState<Listing[]>([])

  async function load() {
    const res = await fetch(`${API}/listings`)
    const all = await res.json()
    const meRes = await fetch(`${API}/auth/me`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
    const me = await meRes.json()
    setItems(all.filter((l: any) => l.ownerId === me.id))
  }

  useEffect(() => { load() }, [])

  async function remove(id: number) {
    const token = localStorage.getItem('token')
    if (!token) return alert('Login first')
    const res = await fetch(`${API}/listings/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } })
    if (!res.ok) return alert('Delete failed')
    setItems(items.filter(i => i.id !== id))
  }

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-xl font-semibold mb-3">My Listings</h2>
      <div className="grid gap-2">
        {items.map(i => (
          <div key={i.id} className="border border-slate-200 rounded px-3 py-2 flex items-center justify-between">
            <div>
              <div className="font-medium">{i.title}</div>
              <div className="text-slate-600">{i.priceBirr} Birr</div>
            </div>
            <button className="px-3 py-1 border border-slate-900 rounded" onClick={() => remove(i.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  )
}


