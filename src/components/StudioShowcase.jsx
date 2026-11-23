import { useRef, useState } from 'react'
import { PenTool, FileText, CheckCircle2, HelpCircle } from '../icons.jsx'
import CanvasPanel from './panels/CanvasPanel.jsx'
import TheoryPanel from './panels/TheoryPanel.jsx'
import McqPanel from './panels/McqPanel.jsx'
import ShortAnswerPanel from './panels/ShortAnswerPanel.jsx'
import TrueFalsePanel from './panels/TrueFalsePanel.jsx'
import './StudioShowcase.css'

const TABS = [
  { id: 'canvas', label: 'Freehand Drawing', Icon: PenTool },
  { id: 'theory', label: 'Theory & Rubric', Icon: FileText },
  { id: 'mcq', label: 'Multi-Select & MCQ', Icon: CheckCircle2 },
  { id: 'short', label: 'Short Answer', Icon: HelpCircle },
  { id: 'tf', label: 'True / False', Icon: CheckCircle2 },
]

export default function StudioShowcase() {
  const [activeTab, setActiveTab] = useState('canvas')
  const tabRefs = useRef({})

  const activateTab = (id) => {
    setActiveTab(id)
    tabRefs.current[id]?.focus()
  }

  const handleTablistKeyDown = (e) => {
    const idx = TABS.findIndex((t) => t.id === activeTab)
    let next = null
    if (e.key === 'ArrowRight') next = (idx + 1) % TABS.length
    else if (e.key === 'ArrowLeft') next = (idx - 1 + TABS.length) % TABS.length
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = TABS.length - 1
    if (next === null) return
    e.preventDefault()
    activateTab(TABS[next].id)
  }

  return (
    <section id="studio" className="showcase-section" aria-labelledby="studio-title">
      <div className="content-wrap">
        <div className="section-header">
          <div className="section-badge">Live Interactive Preview</div>
          <h2 className="section-title" id="studio-title">The First-Class Question Studio</h2>
          <p className="section-desc">
            Test Muna's core response types below. Every response format is natively rendered,
            autosaved continuously, and tied to server-side rubrics.
          </p>
        </div>

        <div className="studio-card">
          <div
            className="studio-tabs"
            role="tablist"
            aria-label="Question type preview"
            onKeyDown={handleTablistKeyDown}
          >
            {TABS.map(({ id, label, Icon }) => (
              <button
                key={id}
                ref={(el) => { tabRefs.current[id] = el }}
                type="button"
                role="tab"
                id={`tab-${id}`}
                aria-selected={activeTab === id}
                aria-controls={`panel-${id}`}
                tabIndex={activeTab === id ? 0 : -1}
                className={`studio-tab ${activeTab === id ? 'active' : ''}`}
                onClick={() => setActiveTab(id)}
              >
                <Icon size={16} /> {label}
              </button>
            ))}
          </div>

          <div className="studio-panel">
            <div
              role="tabpanel"
              id="panel-canvas"
              aria-labelledby="tab-canvas"
              tabIndex={0}
              hidden={activeTab !== 'canvas'}
            >
              <CanvasPanel />
            </div>
            <div
              role="tabpanel"
              id="panel-theory"
              aria-labelledby="tab-theory"
              tabIndex={0}
              hidden={activeTab !== 'theory'}
            >
              <TheoryPanel />
            </div>
            <div
              role="tabpanel"
              id="panel-mcq"
              aria-labelledby="tab-mcq"
              tabIndex={0}
              hidden={activeTab !== 'mcq'}
            >
              <McqPanel />
            </div>
            <div
              role="tabpanel"
              id="panel-short"
              aria-labelledby="tab-short"
              tabIndex={0}
              hidden={activeTab !== 'short'}
            >
              <ShortAnswerPanel />
            </div>
            <div
              role="tabpanel"
              id="panel-tf"
              aria-labelledby="tab-tf"
              tabIndex={0}
              hidden={activeTab !== 'tf'}
            >
              <TrueFalsePanel />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
