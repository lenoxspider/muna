import { useEffect, useState } from 'react'
import { Award } from '../../icons.jsx'

const STORAGE_KEY = 'muna-demo-theory-draft'

export default function TheoryPanel() {
  const [theoryText, setTheoryText] = useState(() => {
    try {
      return window.localStorage.getItem(STORAGE_KEY) ?? ''
    } catch {
      return ''
    }
  })
  const [savedAt, setSavedAt] = useState(null)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        window.localStorage.setItem(STORAGE_KEY, theoryText)
        setSavedAt(new Date())
      } catch {
        // localStorage unavailable (private mode, blocked storage):
        // the demo keeps working in memory, just without persistence.
      }
    }, 500)
    return () => window.clearTimeout(timer)
  }, [theoryText])

  const wordCount = theoryText.trim() ? theoryText.trim().split(/\s+/).length : 0

  return (
    <div>
      <div className="studio-meta-bar">
        <div className="q-points-badge">Question 2 · 20 Points · Long-Form Theory</div>
        <span className="autosave-status" role="status">
          {savedAt
            ? `Autosaved · ${savedAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
            : 'Autosave ready'}
        </span>
      </div>

      <div className="q-prompt">
        Explain why client-side deterrents (such as disabling right-click or DevTools blocking)
        cannot serve as true security boundaries in a web-based examination platform.
      </div>

      <div className="theory-layout">
        <div>
          <label htmlFor="theory-response" className="sr-only">
            Long-form theory response
          </label>
          <textarea
            id="theory-response"
            className="theory-textarea"
            placeholder="Write your explanation here..."
            value={theoryText}
            onChange={(e) => setTheoryText(e.target.value)}
          />
          <div className="word-count">
            Word count: {wordCount} {wordCount === 1 ? 'word' : 'words'}
          </div>
        </div>

        <div className="rubric-box">
          <div className="rubric-title">
            <Award size={16} /> Mentor Grading Rubric
          </div>
          <div className="rubric-item">
            <strong>Client Memory & Network Access (8 pts)</strong>
            <span>Explains that code executed in a user's browser is fully inspectable by the user.</span>
          </div>
          <div className="rubric-item">
            <strong>Server-Side Validation Authority (7 pts)</strong>
            <span>Highlights that all answers, time checks, and limits must be evaluated server-side.</span>
          </div>
          <div className="rubric-item">
            <strong>Clarity & Concrete Examples (5 pts)</strong>
            <span>Provides clear, reasoned architectural arguments.</span>
          </div>
        </div>
      </div>
    </div>
  )
}
