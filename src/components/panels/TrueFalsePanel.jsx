import { useState } from 'react'

const OPTIONS = [
  { val: 'true', label: 'True' },
  { val: 'false', label: 'False (Correct: SEB is a dedicated kiosk desktop software)' },
]

export default function TrueFalsePanel() {
  const [selection, setSelection] = useState(null)

  return (
    <div>
      <div className="studio-meta-bar">
        <div className="q-points-badge">Question 5 · 5 Points · True or False</div>
      </div>

      <div className="q-prompt">
        Safe Exam Browser (SEB) operates merely as a standard browser extension and requires no local
        software installation.
      </div>

      <div className="options-list" role="group" aria-label="True or False options">
        {OPTIONS.map((opt) => {
          const isSelected = selection === opt.val
          return (
            <button
              key={opt.val}
              type="button"
              className={`option-item ${isSelected ? 'selected' : ''}`}
              aria-pressed={isSelected}
              onClick={() => setSelection(opt.val)}
            >
              <span className="option-marker" aria-hidden="true">
                {isSelected ? '✓' : ''}
              </span>
              <span>{opt.label}</span>
            </button>
          )
        })}
      </div>

      <div className="panel-feedback" aria-live="polite">
        {selection ? (
          selection === 'false' ? (
            <span className="ok">
              ✓ Correct! Safe Exam Browser is an OS-level kiosk software application, not a browser plugin.
            </span>
          ) : (
            <span className="warn">
              Review: Web-only extensions cannot control system shortcuts or display kiosk windows.
            </span>
          )
        ) : null}
      </div>
    </div>
  )
}
