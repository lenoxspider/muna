import { useState } from 'react'

const OPTIONS = [
  { id: 'tab', text: 'Switching to another browser tab' },
  { id: 'min', text: 'Minimizing the browser window' },
  { id: 'mobile', text: 'Switching applications on a mobile device' },
  { id: 'eye', text: 'Looking away from the physical webcam' },
]

export default function McqPanel() {
  const [selected, setSelected] = useState([])

  const toggle = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  return (
    <div>
      <div className="studio-meta-bar">
        <div className="q-points-badge">Question 3 · 10 Points · Multiple Select (Partial Credit)</div>
      </div>

      <div className="q-prompt">
        Which events are reliably captured by the standard W3C Page Visibility API? (Select all that apply)
      </div>

      <div className="options-list" role="group" aria-label="Multiple select options">
        {OPTIONS.map((opt) => {
          const isSelected = selected.includes(opt.id)
          return (
            <button
              key={opt.id}
              type="button"
              className={`option-item ${isSelected ? 'selected' : ''}`}
              aria-pressed={isSelected}
              onClick={() => toggle(opt.id)}
            >
              <span className="option-marker" aria-hidden="true">
                {isSelected ? '✓' : ''}
              </span>
              <span>{opt.text}</span>
            </button>
          )
        })}
      </div>

      <p className="panel-note" aria-live="polite">
        Selected: {selected.length} of {OPTIONS.length} options.
        {selected.includes('eye') && (
          <span className="warn">
            {' '}
            (Note: Webcam eye tracking is outside MVP scope and not handled by Page Visibility).
          </span>
        )}
      </p>
    </div>
  )
}
