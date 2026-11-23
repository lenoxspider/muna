import { useEffect, useRef, useState } from 'react'
import { X } from '../icons.jsx'
import { verifyJoinCode } from '../lib/joinDemo.js'
import './AccessibleModal.css'

const FOCUSABLE_SELECTOR = 'button, input, textarea, select, a[href], [tabindex]:not([tabindex="-1"])'

export default function AccessibleModal({ open, type, onClose }) {
  const dialogRef = useRef(null)
  const restoreFocusRef = useRef(null)
  const [joinCode, setJoinCode] = useState('')
  const [joinStatus, setJoinStatus] = useState(null)

  // Remember focus origin and restore it when the dialog closes.
  useEffect(() => {
    if (!open) return undefined
    restoreFocusRef.current = document.activeElement
    return () => {
      const el = restoreFocusRef.current
      if (el && typeof el.focus === 'function') {
        el.focus()
      }
    }
  }, [open])

  // Initial focus, Escape to close, Tab focus trap.
  useEffect(() => {
    if (!open) return undefined
    const dialog = dialogRef.current
    if (dialog) {
      dialog.focus()
      const firstInput = dialog.querySelector('input')
      if (firstInput) firstInput.focus()
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
        return
      }
      if (e.key !== 'Tab') return
      const dialogEl = dialogRef.current
      if (!dialogEl) return
      const focusables = [...dialogEl.querySelectorAll(FOCUSABLE_SELECTOR)].filter(
        (el) => !el.disabled && el.offsetParent !== null
      )
      if (focusables.length === 0) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      const active = document.activeElement
      if (e.shiftKey && (active === first || active === dialogEl)) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && active === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open, type, onClose])

  if (!open) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    setJoinStatus(verifyJoinCode(joinCode))
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-heading"
        tabIndex={-1}
        className="modal-dialog"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="modal-close-btn"
          aria-label="Close dialog"
          onClick={onClose}
        >
          <X size={18} />
        </button>

        {type === 'join' ? (
          <>
            <h3 id="modal-heading" className="modal-heading">
              Enter Organisation Join Code
            </h3>
            <p className="modal-desc">
              Paste the unique invitation token or code provided by your mentor.
            </p>
            <form onSubmit={handleSubmit}>
              <label htmlFor="modal-join-code" className="sr-only">
                Organisation invitation code
              </label>
              <input
                id="modal-join-code"
                type="text"
                className="clean-input modal-join-input"
                placeholder="e.g. BRIGHT-MINDS-2026"
                value={joinCode}
                onChange={(e) => setJoinCode(e.target.value)}
                autoComplete="off"
              />
              <div className="modal-actions">
                <button type="button" className="btn btn-outline" onClick={onClose}>
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
                  Verify &amp; Join
                </button>
              </div>
              <div aria-live="polite">
                {joinStatus && (
                  <p className={`modal-join-status ${joinStatus.valid ? 'ok' : 'warn'}`}>
                    {joinStatus.valid
                      ? `✓ ${joinStatus.orgName} found! (${joinStatus.assessments} active assessments available).`
                      : joinStatus.message}
                  </p>
                )}
              </div>
            </form>
          </>
        ) : (
          <>
            <h3 id="modal-heading" className="modal-heading">
              Mentor Workspace Login
            </h3>
            <p className="modal-desc">
              Organisation admins and mentors manage assessments, question banks, and grading rubrics.
            </p>
            <div className="modal-info-box">
              <strong>Phase 0 &amp; 1 Status:</strong> Database authentication is being configured.
              You can test question authoring in the <strong>Question Studio</strong> section right
              on this page!
            </div>
            <div className="modal-actions">
              <button type="button" className="btn btn-primary" onClick={onClose}>
                Explore Studio
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
