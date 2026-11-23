import { Eye, Lock, Layers, CheckCircle2 } from '../icons.jsx'
import './SecuritySection.css'

export default function SecuritySection() {
  return (
    <section id="security" className="security-section" aria-labelledby="security-title">
      <div className="content-wrap">
        <div className="section-header">
          <div className="section-badge">PRD Section 8 Standard</div>
          <h2 className="section-title" id="security-title">Layered, Honest Exam Security</h2>
          <p className="section-desc">
            We never market deceptive "cheat-proof" illusions. Muna uses explicit server-side policies
            and clear browser capability levels.
          </p>
        </div>

        <div className="security-grid">
          <div className="sec-card">
            <div className="sec-icon-box">
              <Eye size={24} />
            </div>
            <h3>Standard Web Mode</h3>
            <p>
              Runs in standard modern web browsers (Chrome, Firefox, Safari, Edge). Monitors visibility
              lifecycle events without requiring software installation.
            </p>
            <ul className="sec-list">
              <li className="sec-list-item">
                <CheckCircle2 size={16} />
                <span>Full-screen request with exit detection</span>
              </li>
              <li className="sec-list-item">
                <CheckCircle2 size={16} />
                <span>Document visibilitychange event logged to server</span>
              </li>
              <li className="sec-list-item">
                <CheckCircle2 size={16} />
                <span>Strict focus-loss auto-submit policy (configurable)</span>
              </li>
              <li className="sec-list-item">
                <CheckCircle2 size={16} />
                <span>Answer keys never shipped to client bundle</span>
              </li>
            </ul>
          </div>

          <div className="sec-card">
            <div className="sec-icon-box">
              <Lock size={24} />
            </div>
            <h3>Safe Exam Browser (SEB)</h3>
            <p>
              For high-stakes examinations. Integrates with Safe Exam Browser to provide real OS-level
              kiosk restrictions and application blocking.
            </p>
            <ul className="sec-list">
              <li className="sec-list-item">
                <CheckCircle2 size={16} />
                <span>Restricts secondary monitors and virtual machines</span>
              </li>
              <li className="sec-list-item">
                <CheckCircle2 size={16} />
                <span>Blocks screen recorders, Zoom, Discord, and Telegram</span>
              </li>
              <li className="sec-list-item">
                <CheckCircle2 size={16} />
                <span>Encrypted exam configuration verified by server</span>
              </li>
              <li className="sec-list-item">
                <CheckCircle2 size={16} />
                <span>Pre-exam device compatibility check</span>
              </li>
            </ul>
          </div>

          <div className="sec-card">
            <div className="sec-icon-box">
              <Layers size={24} />
            </div>
            <h3>Server-Side Attempt Engine</h3>
            <p>
              Integrity is enforced in the database transactions, not in volatile browser memory.
            </p>
            <ul className="sec-list">
              <li className="sec-list-item">
                <CheckCircle2 size={16} />
                <span>3 attempts maximum by default (per mentee/assessment)</span>
              </li>
              <li className="sec-list-item">
                <CheckCircle2 size={16} />
                <span>Server-authoritative timer (client is display-only)</span>
              </li>
              <li className="sec-list-item">
                <CheckCircle2 size={16} />
                <span>Idempotent autosaves protect against internet drops</span>
              </li>
              <li className="sec-list-item">
                <CheckCircle2 size={16} />
                <span>Auditable extra attempt grants by verified mentors</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
