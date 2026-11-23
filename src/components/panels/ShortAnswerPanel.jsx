import { useState } from 'react'

export default function ShortAnswerPanel() {
  const [shortAnswer, setShortAnswer] = useState('')
  const trimmed = shortAnswer.trim()
  const isMatch =
    trimmed &&
    (trimmed.toLowerCase().includes('safe exam') || trimmed.toLowerCase() === 'seb')

  return (
    <div>
      <div className="studio-meta-bar">
        <div className="q-points-badge">Question 4 · 5 Points · Short Answer Pattern</div>
      </div>

      <div className="q-prompt">
        What dedicated kiosk application is supported by Muna for operating-system-level exam lockdown?
      </div>

      <div className="input-with-button">
        <label htmlFor="short-answer-input" className="sr-only">
          Short answer response
        </label>
        <input
          id="short-answer-input"
          type="text"
          className="clean-input"
          placeholder="Type your answer here..."
          value={shortAnswer}
          onChange={(e) => setShortAnswer(e.target.value)}
          autoComplete="off"
        />
      </div>

      <div className="panel-feedback" aria-live="polite">
        {trimmed ? (
          isMatch ? (
            <span className="ok">✓ Exact match recognized: Safe Exam Browser (SEB)</span>
          ) : (
            <span className="warn">Typing answer... (Pattern evaluator tests alternative aliases like "SEB")</span>
          )
        ) : null}
      </div>
    </div>
  )
}
