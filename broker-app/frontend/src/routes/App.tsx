import React, { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'

export default function App() {
  const [open, setOpen] = useState(false)
  return (
    <div className="w-full">
      <nav className="block w-full px-6 py-3 mx-auto shadow-md rounded-md lg:px-10 lg:py-4 fixed top-0 left-0 right-0 bg-white text-slate-800 dark:bg-slate-900 dark:text-slate-100 transition-colors z-50">
        <div className="container flex items-center justify-between mx-auto">
          <a href="#" className="mr-4 block cursor-pointer py-1.5 text-2xl font-extrabold tracking-tight">Yegna Gebaya</a>
          <button className="lg:hidden p-2 rounded border border-slate-300 dark:border-slate-700" aria-label="Toggle menu" onClick={() => setOpen(!open)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="hidden lg:block">
            <ul className="flex flex-row items-center gap-6">
              <li className="p-1 text-sm text-slate-600 dark:text-slate-300 hover:bg-blue-200 dark:hover:bg-slate-800 rounded"><Link to="/">Home</Link></li>
              <li className="p-1 text-sm text-slate-600 dark:text-slate-300 hover:bg-blue-200 dark:hover:bg-slate-800 rounded"><Link to="/register">Register</Link></li>
              <li className="p-1 text-sm text-slate-600 dark:text-slate-300 hover:bg-blue-200 dark:hover:bg-slate-800 rounded"><Link to="/login">Sign In</Link></li>
              <li className="p-1 text-sm text-slate-600 dark:text-slate-300 hover:bg-blue-200 dark:hover:bg-slate-800 rounded"><Link to="/dashboard">Dashboard</Link></li>
              <li className="p-1 text-sm text-slate-600 dark:text-slate-300 hover:bg-blue-200 dark:hover:bg-slate-800 rounded"><Link to="/profile">Profile</Link></li>
              <li className="p-1 text-sm text-slate-600 dark:text-slate-300 hover:bg-blue-200 dark:hover:bg-slate-800 rounded"><Link to="/ai">Ask AI</Link></li>
              <li className="p-1 text-sm text-slate-600 dark:text-slate-300 hover:bg-blue-200 dark:hover:bg-slate-800 rounded"><Link to="/chats">Chats</Link></li>
              <li className="p-1 text-sm text-slate-600 dark:text-slate-300 hover:bg-blue-200 dark:hover:bg-slate-800 rounded"><Link to="/notifications">Notifications</Link></li>
            </ul>
          </div>
        </div>
        {open && (
          <div className="lg:hidden mt-2 px-2">
            <ul className="flex flex-col gap-2 border border-slate-200 dark:border-slate-700 rounded p-2 bg-white dark:bg-slate-900">
              <li className="p-2 rounded hover:bg-blue-200 dark:hover:bg-slate-800" onClick={() => setOpen(false)}><Link to="/">Home</Link></li>
              <li className="p-2 rounded hover:bg-blue-200 dark:hover:bg-slate-800" onClick={() => setOpen(false)}><Link to="/register">Register</Link></li>
              <li className="p-2 rounded hover:bg-blue-200 dark:hover:bg-slate-800" onClick={() => setOpen(false)}><Link to="/login">Sign In</Link></li>
              <li className="p-2 rounded hover:bg-blue-200 dark:hover:bg-slate-800" onClick={() => setOpen(false)}><Link to="/dashboard">Dashboard</Link></li>
              <li className="p-2 rounded hover:bg-blue-200 dark:hover:bg-slate-800" onClick={() => setOpen(false)}><Link to="/profile">Profile</Link></li>
              <li className="p-2 rounded hover:bg-blue-200 dark:hover:bg-slate-800" onClick={() => setOpen(false)}><Link to="/ai">Ask AI</Link></li>
              <li className="p-2 rounded hover:bg-blue-200 dark:hover:bg-slate-800" onClick={() => setOpen(false)}><Link to="/chats">Chats</Link></li>
              <li className="p-2 rounded hover:bg-blue-200 dark:hover:bg-slate-800" onClick={() => setOpen(false)}><Link to="/notifications">Notifications</Link></li>
            </ul>
          </div>
        )}
      </nav>
      <div className="pt-20"><Outlet /></div>
    </div>
  )
}


