import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5001/api'

export default function Register() {
  const nav = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<'BUYER'|'SELLER'>('BUYER')
  const [error, setError] = useState('')

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    const res = await fetch(`${API}/auth/register`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, email, password, role }) })
    const data = await res.json()
    if (!res.ok) return setError(data.message || 'Failed')
    nav('/login')
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 bg-slate-900">
      <div className="w-full max-w-md border border-slate-700 rounded-xl p-6 shadow-sm bg-slate-900 text-white">
        <h2 className="text-2xl font-bold text-center mb-2 text-white">Create account</h2>
        <p className="text-center text-white mb-4">Join as a buyer or seller</p>
        <form onSubmit={submit} className="grid gap-3">
          <input className="border border-slate-600 rounded px-3 py-3 bg-slate-800 text-white placeholder-slate-300" placeholder="Full name" value={name} onChange={e => setName(e.target.value)} />
          <input className="border border-slate-600 rounded px-3 py-3 bg-slate-800 text-white placeholder-slate-300" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
          <input className="border border-slate-600 rounded px-3 py-3 bg-slate-800 text-white placeholder-slate-300" placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
          <select className="border border-slate-600 rounded px-3 py-3 bg-slate-800 text-white" value={role} onChange={e => setRole(e.target.value as any)}>
            <option value="BUYER">Buyer</option>
            <option value="SELLER">Seller</option>
          </select>
          {error && <div className="text-red-400 text-sm">{error}</div>}
          <button className="mt-1 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-lg font-semibold">Create Account</button>
        </form>
        <p className="mt-3 text-center text-white">Have an account? <Link className="text-emerald-300 font-medium" to="/login">Sign in</Link></p>
      </div>
    </div>
  )
}


