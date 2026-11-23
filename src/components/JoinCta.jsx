import { useState } from 'react'
import { ArrowRight } from '../icons.jsx'
import { verifyJoinCode } from '../lib/joinDemo.js'
import './JoinCta.css'

export default function JoinCta() {
  const [joinCode, setJoinCode] = useState('')
  const [joinStatus, setJoinStatus] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    setJoinStatus(verifyJoinCode(joinCode))
  }

  return (
    <section className="cta-banner" aria-labelledby="join-cta-title">
      <div className="content-wrap">
        <div className="cta-box">
          <h2 id="join-cta-title">Ready to begin an assessment?</h2>
          <p>
            If your mentor provided an invitation code or organization link, enter it below to access
            your assigned assessments.
          </p>

          <form onSubmit={handleSubmit} className="code-input-form">
            <label htmlFor="join-code-input" className="sr-only">
              Organisation invitation code
            </label>
            <input
              id="join-code-input"
              type="text"
              className="code-input"
              placeholder="e.g. BRIGHT-MINDS-2026"
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value)}
              autoComplete="off"
            />
            <button type="submit" className="btn btn-white">
              Verify Code <ArrowRight size={16} />
            </button>
          </form>

          <div aria-live="polite">
            {joinStatus && (
              joinStatus.valid ? (
                <p className="join-status valid">
                  ✓ <strong>{joinStatus.orgName}</strong> found! ({joinStatus.assessments} active
                  assessments available).
                </p>
              ) : (
                <p className="join-status invalid">{joinStatus.message}</p>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
