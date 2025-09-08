import React, { useState } from 'react'

export default function AIPage() {
  const [question, setQuestion] = useState('')
  const [loading, setLoading] = useState(false)
  const [answer, setAnswer] = useState('')

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setAnswer('')
    // Placeholder: later connect to backend Gemini endpoint
    await new Promise(r => setTimeout(r, 600))
    setAnswer('This is a placeholder response. The AI assistant will help you compare prices, suggest categories, write better descriptions, and guide you through using the app. In the final version, this will call Gemini with your question and marketplace data.')
    setLoading(false)
  }

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-2">Ask AI Assistant</h2>
      <p className="text-slate-600 mb-4">
        Our AI assistant will help you find the right category, suggest pricing, craft better product descriptions, and answer questions about how to use Yegna Gebaya.
        Simply type your question below. 
      </p>
      <form onSubmit={submit} className="grid gap-3">
        <textarea className="border border-slate-300 rounded px-3 py-2 min-h-28" placeholder="Ask anything about selling, buying, pricing or using the app..." value={question} onChange={e => setQuestion(e.target.value)} />
        <button className="py-2 rounded bg-emerald-600 hover:bg-emerald-700 text-white" disabled={!question.trim() || loading}>{loading ? 'Thinking…' : 'Ask AI'}</button>
      </form>
      {answer && (
        <div className="mt-4 border border-slate-200 rounded p-3 bg-white">
          <div className="font-semibold mb-1">AI response</div>
          <div className="whitespace-pre-wrap">{answer}</div>
        </div>
      )}
    </div>
  )
}


