import React from 'react'
import { Link } from 'react-router-dom'

export default function Landing() {
  return (
    <div className="px-6">
      <section className="hero-section text-center py-16">
        <h1 className="hero-title text-4xl font-bold mb-3">Find and Sell Goods Easily</h1>
        <p className="text-slate-600 dark:text-slate-300">A simple marketplace for buyers and sellers with chat, notifications, and secure auth.</p>
        <div className="mt-6 flex gap-3 justify-center">
          <Link to="/register" className="px-4 py-2 bg-slate-900 text-white rounded-md">Get Started</Link>
          <Link to="/login" className="px-4 py-2 border border-slate-900 rounded-md">Sign In</Link>
        </div>
      </section>
    </div>
  )
}


