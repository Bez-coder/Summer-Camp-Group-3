import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5001/api'

export default function PostListing() {
  const nav = useNavigate()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priceBirr, setPriceBirr] = useState<number | ''>('')
  const [category, setCategory] = useState('GENERAL')
  const [imageUrl, setImageUrl] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [error, setError] = useState('')
  const [ok, setOk] = useState('')

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setOk('')
    const token = localStorage.getItem('token')
    if (!token) return setError('Please login as seller')
    let finalImageUrl = imageUrl
    const apiBase = (API as string).replace(/\/api$/, '')
    if (file) {
      const fd = new FormData()
      fd.append('file', file)
      const up = await fetch(`${API}/uploads`, { method: 'POST', body: fd })
      const uj = await up.json()
      if (up.ok && (uj.absoluteUrl || uj.url)) finalImageUrl = uj.absoluteUrl || (uj.url.startsWith('http') ? uj.url : `${apiBase}${uj.url}`)
    }
    const res = await fetch(`${API}/listings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ title, description, priceBirr, category, imageUrl: finalImageUrl })
    })
    const data = await res.json().catch(() => ({}))
    if (!res.ok) return setError(data.message || 'Failed to create')
    setOk('Listing created')
    setTimeout(() => nav('/dashboard'), 600)
  }

  return (
    <div className="px-4 py-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-3 text-emerald-700">Post a Good</h2>
      <form onSubmit={submit} className="grid gap-4">
        <input className="border-2 border-emerald-300 rounded-lg px-4 py-3" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
        <textarea className="border-2 border-emerald-300 rounded-lg px-4 py-3 min-h-32" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
        <input className="border-2 border-emerald-300 rounded-lg px-4 py-3" placeholder="Price (Birr)" type="number" value={priceBirr} onChange={e => setPriceBirr(e.target.value === '' ? '' : Number(e.target.value))} />
        <select className="border-2 border-emerald-300 rounded-lg px-4 py-3" value={category} onChange={e => setCategory(e.target.value)}>
          <option value="GENERAL">General</option>
          <option value="ELECTRONICS">Electronics</option>
          <option value="VEHICLE">Vehicle</option>
          <option value="REAL_ESTATE">Real Estate</option>
          <option value="SERVICES">Services</option>
          <option value="OTHER">Other</option>
        </select>
        <input className="border-2 border-emerald-300 rounded-lg px-4 py-3" placeholder="Image URL (optional)" value={imageUrl} onChange={e => setImageUrl(e.target.value)} />
        <div className="text-sm text-slate-600">Or upload an image from your device</div>
        <input className="border-2 border-emerald-300 rounded-lg px-4 py-3" type="file" accept="image/*" onChange={e => setFile(e.target.files?.[0] || null)} />
        {error && <div className="text-red-600">{error}</div>}
        {ok && <div className="text-emerald-700">{ok}</div>}
        <button className="py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-lg font-semibold">Create</button>
      </form>
    </div>
  )
}


