import React, { useEffect, useState } from 'react'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5001/api'

type Chat = { id: number; buyerId: number; sellerId: number; listingId?: number; messages?: any[]; buyer?: any; seller?: any; listing?: any }
type Message = { id: number; content: string; senderId: number; createdAt: string }

export default function Chats() {
  const [chats, setChats] = useState<Chat[]>([])
  const [selected, setSelected] = useState<Chat | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [text, setText] = useState('')

  const token = localStorage.getItem('token')

  async function loadConversations() {
    const res = await fetch(`${API}/chat/conversations`, { headers: { Authorization: `Bearer ${token}` } })
    if (!res.ok) return
    const data = await res.json()
    setChats(data)
    if (!selected && data.length) selectChat(data[0])
  }

  async function selectChat(c: Chat) {
    setSelected(c)
    const res = await fetch(`${API}/chat/${c.id}/messages`, { headers: { Authorization: `Bearer ${token}` } })
    const data = await res.json()
    setMessages(data)
  }

  async function send() {
    if (!selected || !text.trim()) return
    const res = await fetch(`${API}/chat/${selected.id}/messages`, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify({ content: text }) })
    if (!res.ok) return
    setText('')
    await selectChat(selected)
  }

  useEffect(() => { loadConversations() }, [])

  return (
    <div className="p-4 grid grid-cols-12 gap-4">
      <aside className="col-span-4 border border-slate-200 rounded p-2 h-[70vh] overflow-auto">
        <div className="font-semibold mb-2">Conversations</div>
        <div className="grid gap-2">
          {chats.map(c => (
            <button key={c.id} className={`text-left border border-slate-200 rounded p-2 ${selected?.id === c.id ? 'bg-slate-100' : ''}`} onClick={() => selectChat(c)}>
              <div className="font-medium">{c.listing?.title || 'Direct chat'}</div>
              <div className="text-slate-600 text-sm">with {c.buyer?.name === c.seller?.name ? 'User' : (c.buyer?.name || c.seller?.name)}</div>
            </button>
          ))}
        </div>
      </aside>
      <main className="col-span-8 border border-slate-200 rounded flex flex-col h-[70vh]">
        <div className="flex-1 overflow-auto p-3">
          {messages.map(m => (
            <div key={m.id} className="mb-2">
              <div className="text-sm text-slate-500">{new Date(m.createdAt).toLocaleString()}</div>
              <div>{m.content}</div>
            </div>
          ))}
        </div>
        <div className="border-t border-slate-200 p-2 flex gap-2">
          <input className="flex-1 border border-slate-300 rounded px-2" placeholder="Type a message" value={text} onChange={e => setText(e.target.value)} />
          <button className="px-3 py-1 border border-slate-900 rounded" onClick={send}>Send</button>
        </div>
      </main>
    </div>
  )
}


