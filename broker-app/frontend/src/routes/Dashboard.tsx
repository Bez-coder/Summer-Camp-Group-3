import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5001/api'

type Listing = { id: number; title: string; description: string; priceBirr: number; category: string; owner: { id: number; name: string } }

export default function Dashboard() {
  const nav = useNavigate()
  const [me, setMe] = useState<any>(null)
  const [listings, setListings] = useState<Listing[]>([])
  const [q, setQ] = useState('')
  const [category, setCategory] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) fetch(`${API}/auth/me`, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json()).then(setMe)
    load()
  }, [])

  async function load() {
    const params = new URLSearchParams()
    if (q) params.set('q', q)
    if (category) params.set('category', category)
    const res = await fetch(`${API}/listings${params.toString() ? `?${params.toString()}` : ''}`)
    const data = await res.json()
    setListings(data)
  }

  async function startChat(sellerId: number, listingId: number) {
    const token = localStorage.getItem('token')
    if (!token) return alert('Please login to chat')
    const res = await fetch(`${API}/chat/start`, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify({ sellerId, listingId }) })
    if (!res.ok) return alert('Failed to start chat')
    nav('/chats')
  }

  return (
    <div style={{ padding: 24 }}>
      {me ? <div>Welcome, {me.name} ({me.role}) {me.role === 'SELLER' && (<Link to="/post" style={{ marginLeft: 12, padding: '6px 10px', border: '1px solid #111', borderRadius: 6 }}>Post a Good</Link>)}</div> : <div><Link to="/login">Login</Link> to unlock features</div>}
      <h3 style={{ marginTop: 12 }}>Listings</h3>
      <div className="flex gap-2 mb-3">
        <input className="border border-slate-300 rounded px-2 py-1" placeholder="Search" value={q} onChange={e => setQ(e.target.value)} />
        <select className="border border-slate-300 rounded px-2 py-1" value={category} onChange={e => setCategory(e.target.value)}>
          <option value="">All</option>
          <option value="GENERAL">General</option>
          <option value="ELECTRONICS">Electronics</option>
          <option value="VEHICLE">Vehicle</option>
          <option value="REAL_ESTATE">Real Estate</option>
          <option value="SERVICES">Services</option>
          <option value="OTHER">Other</option>
        </select>
        <button className="px-3 py-1 border border-slate-900 rounded" onClick={load}>Filter</button>
        {me?.role === 'SELLER' && <Link to="/my-listings" className="ml-auto px-3 py-1 border border-slate-900 rounded">My Listings</Link>}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {listings.map(l => (
          <div key={l.id} className="border border-slate-200 rounded p-4 text-center">
            {l as any && (l as any).imageUrl ? (
              <div className="flex justify-center mb-2">
                <img src={(() => { const u = (l as any).imageUrl as string; try { return new URL(u).href } catch { const origin = new URL(API as string).origin; return u.startsWith('/uploads') ? `${origin}${u}` : u } })()} alt={l.title} className="w-64 h-40 object-cover rounded" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
              </div>
            ) : null}
            <div className="font-semibold">{l.title}</div>
            <div className="text-slate-600">{l.description}</div>
            <div className="mt-1">Price: {l.priceBirr} Birr</div>
            <div className="mt-1">
              Seller: {l.owner?.id ? <Link to={`/profile?id=${l.owner.id}`}>{l.owner?.name || 'Unknown'}</Link> : (l.owner?.name || 'Unknown')}
              {typeof (l as any).owner?.rating === 'number' && (
                <span> ({Number((l as any).owner?.rating || 0).toFixed(1)} ★, {(l as any).owner?.ratingCount || 0})</span>
              )}
            </div>
            {me?.role === 'BUYER' && (
              <button className="mt-2 px-3 py-1 border border-slate-900 rounded" onClick={() => startChat(l.owner?.id as any, l.id)}>Chat seller</button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}


