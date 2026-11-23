import { Award, Users, CheckCircle2 } from '../icons.jsx'
import './RolesSection.css'

export default function RolesSection({ onOpenModal }) {
  return (
    <section id="workspaces" className="roles-section" aria-labelledby="workspaces-title">
      <div className="content-wrap">
        <div className="section-header">
          <div className="section-badge">Role Architecture</div>
          <h2 className="section-title" id="workspaces-title">Built for Mentors and Mentees</h2>
          <p className="section-desc">
            Organisations are isolated multi-tenant workspaces where educators create and learners succeed.
          </p>
        </div>

        <div className="roles-grid">
          <div className="role-card">
            <div className="role-badge">
              <Award size={14} /> For Educators & Mentors
            </div>
            <h3 className="role-title">The Mentor Workspace</h3>
            <p className="role-desc">
              Everything required to build, orchestrate, and evaluate assessments without technical hurdles.
            </p>

            <div className="role-features">
              <div className="role-feature-item">
                <CheckCircle2 size={18} />
                <span>Question Bank with topic tags and difficulty tiers</span>
              </div>
              <div className="role-feature-item">
                <CheckCircle2 size={18} />
                <span>Manual grading queue with rubric scoring and annotations</span>
              </div>
              <div className="role-feature-item">
                <CheckCircle2 size={18} />
                <span>Audit timeline of focus-loss events and submission receipts</span>
              </div>
              <div className="role-feature-item">
                <CheckCircle2 size={18} />
                <span>One-click CSV result exports and cohort item analysis</span>
              </div>
            </div>

            <button type="button" className="btn btn-primary" onClick={() => onOpenModal('mentor')}>
              Launch Mentor Studio
            </button>
          </div>

          <div className="role-card">
            <div className="role-badge">
              <Users size={14} /> For Students & Mentees
            </div>
            <h3 className="role-title">The Mentee Taking Experience</h3>
            <p className="role-desc">
              A calm, distraction-free environment designed to respect learner effort and accessibility.
            </p>

            <div className="role-features">
              <div className="role-feature-item">
                <CheckCircle2 size={18} />
                <span>Pre-exam device readiness check and explicit rules briefing</span>
              </div>
              <div className="role-feature-item">
                <CheckCircle2 size={18} />
                <span>Touch and stylus support for drawing calculations & diagrams</span>
              </div>
              <div className="role-feature-item">
                <CheckCircle2 size={18} />
                <span>Continuous autosave recovery during unexpected connection drops</span>
              </div>
              <div className="role-feature-item">
                <CheckCircle2 size={18} />
                <span>Instant submission receipts with cryptographic timestamp</span>
              </div>
            </div>

            <button type="button" className="btn btn-outline" onClick={() => onOpenModal('join')}>
              Join an Organisation
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
