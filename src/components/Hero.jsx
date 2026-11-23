import { ArrowRight, Clock, CheckCircle2, Eye, Lock } from '../icons.jsx'
import './Hero.css'

export default function Hero({ onOpenModal }) {
  return (
    <section id="features" className="hero-section">
      <div className="content-wrap">
        <div className="hero-pill">
          <span className="pill-dot" aria-hidden="true"></span>
          Muna 1.0 · Research-Backed Exam Delivery
        </div>

        <h1 className="hero-title">
          Expressive assessments for mentors.{' '}
          <span className="hero-highlight">Enforceable security</span> on the web.
        </h1>

        <p className="hero-sub">
          Move past conventional text-only quizzes. Muna enables mentors to evaluate real understanding
          using freehand drawing canvases, long-form rubric theory, and structured questions—backed
          by server-enforced attempt rules and honest browser visibility tracking.
        </p>

        <div className="hero-cta-group">
          <button
            type="button"
            className="btn btn-primary btn-lg"
            onClick={() => onOpenModal('mentor')}
          >
            Create Organisation Workspace <ArrowRight size={18} />
          </button>
          <a href="#studio" className="btn btn-outline btn-lg">
            Explore Interactive Types
          </a>
        </div>

        <div className="trust-bar">
          <div className="trust-item">
            <Clock size={18} />
            <span>3 Attempts by Default</span>
          </div>
          <div className="trust-item">
            <CheckCircle2 size={18} />
            <span>Real-Time Autosave</span>
          </div>
          <div className="trust-item">
            <Eye size={18} />
            <span>Page Visibility Auditing</span>
          </div>
          <div className="trust-item">
            <Lock size={18} />
            <span>Safe Exam Browser Ready</span>
          </div>
        </div>
      </div>
    </section>
  )
}
