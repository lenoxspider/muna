import { ShieldCheck } from '../icons.jsx'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="content-wrap">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="brand-group">
              <div className="brand-icon-box">
                <ShieldCheck size={20} />
              </div>
              <div className="brand-title">MUNA</div>
            </div>
            <p>
              A mentor-led assessment platform with interactive question types and secure exam delivery.
            </p>
          </div>

          <div className="footer-links">
            <div className="footer-col">
              <h3 className="footer-col-title">Platform</h3>
              <ul>
                <li><a href="#features">Features</a></li>
                <li><a href="#studio">Question Studio</a></li>
                <li><a href="#security">Security Model</a></li>
                <li><a href="#workspaces">Workspaces</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h3 className="footer-col-title">Architecture</h3>
              <ul>
                <li><a href="https://github.com/nonydev27/muna" target="_blank" rel="noreferrer">GitHub Repository</a></li>
                <li><a href="https://github.com/nonydev27/muna/pull/1" target="_blank" rel="noreferrer">PR #1 (PRD Doc)</a></li>
                <li><a href="https://www.safeexambrowser.org" target="_blank" rel="noreferrer">Safe Exam Browser</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div>Muna · Open-Source Educational Assessment Architecture</div>
          <div>Built with React 19 &amp; Vite 8 · Based on Muna PRD v1.0</div>
        </div>
      </div>
    </footer>
  )
}
