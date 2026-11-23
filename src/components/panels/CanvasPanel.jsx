import { useCallback, useEffect, useRef, useState } from 'react'
import { Eraser, RotateCcw } from '../../icons.jsx'

const PEN_BLUE = '#0F5C8C'
const PEN_ACCENT = '#D2601A'
const ERASER_WIDTH = 16
const DPR_CAP = 2

// Stroke = { color, width, erase, points: [{ x, y }] } with points
// normalized to 0..1 of the canvas box, so strokes survive resizes.
function paintStroke(ctx, stroke, w, h) {
  if (stroke.points.length === 0) return
  ctx.strokeStyle = stroke.erase ? '#FFFFFF' : stroke.color
  ctx.lineWidth = stroke.erase ? ERASER_WIDTH : stroke.width
  ctx.beginPath()
  const first = stroke.points[0]
  ctx.moveTo(first.x * w, first.y * h)
  if (stroke.points.length === 1) {
    // A tap: draw a small dot so single clicks leave a mark
    ctx.lineTo(first.x * w + 0.01, first.y * h + 0.01)
  } else {
    for (let i = 1; i < stroke.points.length; i++) {
      ctx.lineTo(stroke.points[i].x * w, stroke.points[i].y * h)
    }
  }
  ctx.stroke()
}

export default function CanvasPanel() {
  const canvasRef = useRef(null)
  const strokesRef = useRef([]) // committed vector strokes
  const currentStrokeRef = useRef(null) // stroke in progress
  const metricsRef = useRef({ w: 0, h: 0 })
  const [strokeCount, setStrokeCount] = useState(0)
  const [penColor, setPenColor] = useState(PEN_BLUE)
  const [lineWidth, setLineWidth] = useState(2)
  const [isEraser, setIsEraser] = useState(false)

  const redraw = useCallback(() => {
    const canvas = canvasRef.current
    const { w, h } = metricsRef.current
    if (!canvas || w === 0 || h === 0) return
    const ctx = canvas.getContext('2d')
    ctx.save()
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.restore()
    for (const stroke of strokesRef.current) {
      paintStroke(ctx, stroke, w, h)
    }
    if (currentStrokeRef.current) {
      paintStroke(ctx, currentStrokeRef.current, w, h)
    }
  }, [])

  const sizeCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    // Hidden (display:none) reports 0×0: keep the current bitmap and
    // vector data, we will re-size on the next visible resize callback.
    if (rect.width < 10 || rect.height < 10) return
    const dpr = Math.min(window.devicePixelRatio || 1, DPR_CAP)
    metricsRef.current = { w: rect.width, h: rect.height }
    canvas.width = Math.round(rect.width * dpr)
    canvas.height = Math.round(rect.height * dpr)
    const ctx = canvas.getContext('2d')
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    redraw()
  }, [redraw])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined
    sizeCanvas()
    const observer = new ResizeObserver(sizeCanvas)
    observer.observe(canvas)
    return () => observer.disconnect()
  }, [sizeCanvas])

  const getPoint = (e) => {
    const rect = canvasRef.current.getBoundingClientRect()
    return {
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    }
  }

  const handlePointerDown = (e) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return
    const canvas = canvasRef.current
    try {
      canvas.setPointerCapture(e.pointerId)
    } catch {
      // Pointer capture is best-effort: lost or synthetic pointers
      // still draw, they just don't track outside the canvas bounds.
    }
    currentStrokeRef.current = {
      color: penColor,
      width: lineWidth,
      erase: isEraser,
      points: [getPoint(e)],
    }
    const { w, h } = metricsRef.current
    const ctx = canvas.getContext('2d')
    paintStroke(ctx, currentStrokeRef.current, w, h)
  }

  const handlePointerMove = (e) => {
    const stroke = currentStrokeRef.current
    if (!stroke) return
    const point = getPoint(e)
    const prev = stroke.points[stroke.points.length - 1]
    // Skip near-duplicate points so the vector data stays compact
    if (Math.abs(point.x - prev.x) < 0.001 && Math.abs(point.y - prev.y) < 0.001) return
    stroke.points.push(point)
    const { w, h } = metricsRef.current
    const ctx = canvasRef.current.getContext('2d')
    ctx.strokeStyle = stroke.erase ? '#FFFFFF' : stroke.color
    ctx.lineWidth = stroke.erase ? ERASER_WIDTH : stroke.width
    ctx.beginPath()
    ctx.moveTo(prev.x * w, prev.y * h)
    ctx.lineTo(point.x * w, point.y * h)
    ctx.stroke()
  }

  const endStroke = () => {
    const stroke = currentStrokeRef.current
    if (!stroke) return
    strokesRef.current.push(stroke)
    currentStrokeRef.current = null
    setStrokeCount(strokesRef.current.length)
  }

  const clearCanvas = () => {
    strokesRef.current = []
    currentStrokeRef.current = null
    setStrokeCount(0)
    redraw()
  }

  return (
    <div>
      <div className="studio-meta-bar">
        <div className="q-points-badge">Question 1 · 15 Points · Drawing Response</div>
        <span className="studio-meta-note">
          Vector strokes captured: <strong>{strokeCount}</strong>
        </span>
      </div>

      <div className="q-prompt">
        Draw an architectural state machine diagram showing an assessment attempt moving from
        <strong> Active</strong> to <strong> Submitted</strong> or <strong> Terminated</strong>.
      </div>

      <div className="canvas-wrapper">
        <div className="canvas-toolbar">
          <div className="tool-group">
            <button
              type="button"
              className={`tool-btn ${!isEraser && penColor === PEN_BLUE ? 'active' : ''}`}
              aria-pressed={!isEraser && penColor === PEN_BLUE}
              onClick={() => {
                setIsEraser(false)
                setPenColor(PEN_BLUE)
              }}
            >
              <span className="tool-dot" style={{ background: PEN_BLUE }} aria-hidden="true"></span> Blue Pen
            </button>
            <button
              type="button"
              className={`tool-btn ${!isEraser && penColor === PEN_ACCENT ? 'active' : ''}`}
              aria-pressed={!isEraser && penColor === PEN_ACCENT}
              onClick={() => {
                setIsEraser(false)
                setPenColor(PEN_ACCENT)
              }}
            >
              <span className="tool-dot" style={{ background: PEN_ACCENT }} aria-hidden="true"></span> Accent Pen
            </button>
            <button
              type="button"
              className={`tool-btn ${isEraser ? 'active' : ''}`}
              aria-pressed={isEraser}
              onClick={() => setIsEraser(true)}
            >
              <Eraser size={14} /> Eraser
            </button>
          </div>

          <div className="tool-group">
            <button
              type="button"
              className={`tool-btn ${!isEraser && lineWidth === 2 ? 'active' : ''}`}
              aria-pressed={!isEraser && lineWidth === 2}
              onClick={() => {
                setIsEraser(false)
                setLineWidth(2)
              }}
            >
              Fine
            </button>
            <button
              type="button"
              className={`tool-btn ${!isEraser && lineWidth === 4 ? 'active' : ''}`}
              aria-pressed={!isEraser && lineWidth === 4}
              onClick={() => {
                setIsEraser(false)
                setLineWidth(4)
              }}
            >
              Medium
            </button>
          </div>

          <div className="tool-group">
            <button type="button" className="tool-btn" onClick={clearCanvas}>
              <RotateCcw size={14} /> Clear Canvas
            </button>
          </div>
        </div>

        <canvas
          ref={canvasRef}
          className="canvas-area"
          role="img"
          aria-label="Freehand drawing canvas, draw with mouse, touch or stylus"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={endStroke}
          onPointerCancel={endStroke}
        />

        <div className="canvas-hint">
          <span>Draw on the canvas above using touch, stylus or mouse.</span>
          <span>Strokes are stored as vector data and survive tool switches and resizes.</span>
        </div>
      </div>
    </div>
  )
}
