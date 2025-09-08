import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5001/api'

export default function Login() {
  const nav = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    const res = await fetch(`${API}/auth/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) })
    const data = await res.json()
    if (!res.ok) return setError(data.message || 'Failed')
    localStorage.setItem('token', data.token)
    nav('/dashboard')
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 bg-slate-900">
      <div className="w-full max-w-md border border-slate-700 rounded-xl p-6 shadow-sm bg-slate-900 text-white">
        <h2 className="text-2xl font-bold text-center mb-2 text-white">Welcome back</h2>
        <p className="text-center text-white mb-4">Sign in to continue</p>
        <form onSubmit={submit} className="grid gap-3">
          <input className="border border-slate-600 rounded px-3 py-3 bg-slate-800 text-white placeholder-slate-300" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
          <input className="border border-slate-600 rounded px-3 py-3 bg-slate-800 text-white placeholder-slate-300" placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
          {error && <div className="text-red-600 text-sm">{error}</div>}
          <button className="mt-1 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-lg font-semibold">Sign In</button>
        </form>
        <p className="mt-3 text-center text-white">No account? <Link className="text-emerald-300 font-medium" to="/register">Create one</Link></p>
      </div>
    </div>
  )
}


