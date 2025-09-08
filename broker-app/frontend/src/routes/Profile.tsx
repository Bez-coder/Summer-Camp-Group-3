import React, { useEffect, useState } from 'react'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5001/api'

export default function Profile() {
  const [me, setMe] = useState<any>(null)
  const [view, setView] = useState<any>(null)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [bio, setBio] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [ok, setOk] = useState('')
  const [err, setErr] = useState('')

  async function load() {
    const token = localStorage.getItem('token')
    if (!token) return
    const res = await fetch(`${API}/auth/me`, { headers: { Authorization: `Bearer ${token}` } })
    const data = await res.json()
    setMe(data)
    setName(data.name || '')
    setPhone(data.phone || '')
    setBio(data.bio || '')
    setAvatarUrl(data.avatarUrl || '')
  }

  useEffect(() => { load() }, [])

  // Optional: load a public user if id param exists
  useEffect(() => {
    const url = new URL(window.location.href)
    const id = url.searchParams.get('id')
    if (id) {
      fetch(`${API}/auth/user/${id}`).then(r => r.json()).then(setView)
    }
  }, [])

  async function save(e: React.FormEvent) {
    e.preventDefault()
    setOk('')
    setErr('')
    const token = localStorage.getItem('token')
    if (!token) return setErr('Please login')
    let finalAvatar = avatarUrl
    if (file) {
      const fd = new FormData()
      fd.append('file', file)
      const up = await fetch(`${API}/uploads`, { method: 'POST', body: fd })
      const uj = await up.json()
      if (up.ok && uj.url) finalAvatar = uj.url
    }
    const res = await fetch(`${API}/auth/profile`, { method: 'PUT', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify({ name, phone, bio, avatarUrl: finalAvatar }) })
    if (!res.ok) return setErr('Update failed')
    setOk('Profile updated')
    load()
  }

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-3">Profile</h2>
      {view ? (
        <div className="grid gap-4">
          <div className="flex justify-center">
            {view.avatarUrl ? <img src={view.avatarUrl} alt="avatar" className="w-24 h-24 rounded-full object-cover" /> : <div className="w-24 h-24 rounded-full bg-slate-200" />}
          </div>
          <div className="text-center font-semibold text-lg">{view.name}</div>
          <div className="text-center text-slate-600">{view.role}</div>
          <div className="text-center">{view.bio}</div>
          <div className="text-center text-sm">Phone: {view.phone || '-'}</div>
          {view.role === 'SELLER' && (
            <div className="mt-2 grid gap-2">
              <div className="text-center">Rating: {Number(view.rating || 0).toFixed(1)} ({view.ratingCount || 0} ratings)</div>
              <RateSeller sellerId={view.id} onRated={load} />
              <SellerListings sellerId={view.id} />
            </div>
          )}
        </div>
      ) : me ? (
        <form onSubmit={save} className="grid gap-3">
          <div className="flex justify-center">
            {avatarUrl ? <img src={avatarUrl} alt="avatar" className="w-24 h-24 rounded-full object-cover" /> : <div className="w-24 h-24 rounded-full bg-slate-200" />}
          </div>
          <input className="border border-slate-300 rounded px-3 py-2" placeholder="Full name" value={name} onChange={e => setName(e.target.value)} />
          <input className="border border-slate-300 rounded px-3 py-2" placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} />
          <input className="border border-slate-300 rounded px-3 py-2" placeholder="Avatar URL" value={avatarUrl} onChange={e => setAvatarUrl(e.target.value)} />
          <div className="text-sm text-slate-600">Or upload an image from your device</div>
          <input className="border border-slate-300 rounded px-3 py-2" type="file" accept="image/*" onChange={e => setFile(e.target.files?.[0] || null)} />
          <textarea className="border border-slate-300 rounded px-3 py-2 min-h-28" placeholder="Bio" value={bio} onChange={e => setBio(e.target.value)} />
          {ok && <div className="text-emerald-700">{ok}</div>}
          {err && <div className="text-red-600">{err}</div>}
          <button className="py-2 rounded bg-emerald-600 hover:bg-emerald-700 text-white">Save changes</button>
        </form>
      ) : (
        <div>Please login to view your profile.</div>
      )}
    </div>
  )
}

function RateSeller({ sellerId, onRated }: { sellerId: number, onRated: () => void }) {
  const [val, setVal] = React.useState(5)
  const token = localStorage.getItem('token')
  async function submit() {
    const res = await fetch(`${API}/auth/rate/${sellerId}`, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify({ value: val }) })
    if (res.ok) onRated()
    else alert('Rating failed')
  }
  return (
    <div className="flex items-center justify-center gap-2">
      <select className="border border-slate-300 rounded px-2 py-1" value={val} onChange={e => setVal(Number(e.target.value))}>
        {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
      </select>
      <button className="px-3 py-1 border border-slate-900 rounded" onClick={submit}>Rate seller</button>
    </div>
  )
}

function SellerListings({ sellerId }: { sellerId: number }) {
  const [items, setItems] = React.useState<any[]>([])
  React.useEffect(() => {
    fetch(`${API}/listings`).then(r => r.json()).then(all => setItems(all.filter((l: any) => l.ownerId === sellerId)))
  }, [sellerId])
  if (!items.length) return <div className="text-center text-sm text-slate-500">No listings yet</div>
  return (
    <div>
      <h3 className="text-center font-semibold">Seller's Listings</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
        {items.map((l: any) => (
          <div key={l.id} className="border border-slate-200 rounded p-3">
            <div className="font-medium">{l.title}</div>
            <div className="text-slate-600 text-sm">{l.priceBirr} Birr</div>
          </div>
        ))}
      </div>
    </div>
  )
}


