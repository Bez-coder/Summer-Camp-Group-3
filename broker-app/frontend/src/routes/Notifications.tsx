import React, { useEffect, useState } from 'react'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5001/api'

type Notification = { id: number; title: string; body: string; read: boolean; createdAt: string }

export default function Notifications() {
  const [items, setItems] = useState<Notification[]>([])
  const token = localStorage.getItem('token')

  async function load() {
    const res = await fetch(`${API}/notifications`, { headers: { Authorization: `Bearer ${token}` } })
    if (!res.ok) return
    setItems(await res.json())
  }

  async function markRead(id: number) {
    await fetch(`${API}/notifications/${id}/read`, { method: 'POST', headers: { Authorization: `Bearer ${token}` } })
    load()
  }

  useEffect(() => { load() }, [])

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-3">Notifications</h2>
      <div className="grid gap-2">
        {items.map(n => (
          <div key={n.id} className={`border rounded p-3 ${n.read ? 'border-slate-200' : 'border-slate-900'}`}>
            <div className="font-medium">{n.title}</div>
            <div className="text-slate-700">{n.body}</div>
            <div className="text-xs text-slate-500 mt-1">{new Date(n.createdAt).toLocaleString()}</div>
            {!n.read && <button className="mt-2 px-3 py-1 border border-slate-900 rounded" onClick={() => markRead(n.id)}>Mark as read</button>}
          </div>
        ))}
      </div>
    </div>
  )
}


