import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import './Loader.scss'

const MIN_MS = 2200 // never finish faster than this
const MAX_MS = 6000 // give up waiting after this
const HOLD_MS = 350 // pause at 100% before the curtain lifts
const EXIT_MS = 900 // must match the transition in Loader.scss

// Status text starts at the given progress
// [starts at, translation key, English fallback]
const STATUS = [
  [0,    'loader.starting', 'Starting up'],
  [0.35, 'loader.fonts',    'Loading fonts'],
  [0.7,  'loader.images',   'Loading images'],
  [0.97, 'loader.opening',  'Opening desktop'],
]

const getStatus = (progress) =>
  STATUS.reduce((current, item) => (progress >= item[0] ? item : current), STATUS[0])

const Loader = ({ images = [], word = 'codedbyklaudia', onReveal, onDone }) => {
  const { t } = useLanguage()
  const [progress, setProgress] = useState(0)
  const [leaving, setLeaving] = useState(false)
  const imagesRef = useRef(images)
  const callbacks = useRef({ onReveal, onDone })

  useEffect(() => {
    callbacks.current = { onReveal, onDone }
  }, [onReveal, onDone])

  // Lock page scroll while loading
  useEffect(() => {
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [])

  // Real loading: fonts + images, held back by MIN_MS
  useEffect(() => {
    let cancelled = false
    let raf
    let holdTimer
    let loaded = 0
    const sources = imagesRef.current
    const total = 1 + sources.length // fonts + images
    const start = performance.now()
    const mark = () => {
      loaded += 1
    }

    // Wait one frame so the wordmark has requested its font, then wait for fonts
    if (document.fonts?.ready) {
      requestAnimationFrame(() => document.fonts.ready.then(mark, mark))
    } else {
      mark()
    }

    sources.forEach((src) => {
      const img = new Image()
      img.onload = mark
      img.onerror = mark
      img.src = src
    })

    const tick = (now) => {
      if (cancelled) return
      const elapsed = now - start
      const real = total === 0 ? 1 : loaded / total
      const timed = Math.min(elapsed / MIN_MS, 1)
      const value = elapsed > MAX_MS ? 1 : Math.min(real, timed)
      setProgress(value)
      if (value >= 1) {
        holdTimer = setTimeout(() => setLeaving(true), HOLD_MS)
        return
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
      clearTimeout(holdTimer)
    }
  }, [])

  // Exit: tell the app to start the desktop intro, then unmount
  useEffect(() => {
    if (!leaving) return
    callbacks.current.onReveal?.()
    const id = setTimeout(() => callbacks.current.onDone?.(), EXIT_MS)
    return () => clearTimeout(id)
  }, [leaving])

  const percent = Math.round(progress * 100)

  return (
    <div
      className={`loader ${leaving ? 'loader--leaving' : ''}`}
      role="progressbar"
      aria-label="Loading"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={percent}
      aria-busy={!leaving}
    >
      <div className="loader__grain" aria-hidden="true" />

      <div className="loader__body">
        <div className="loader__word" aria-hidden="true">
          <span className="loader__ghost">{word}</span>
          <span
            className="loader__ink"
            style={{ clipPath: `inset(0 ${100 - progress * 100}% 0 0)` }}
          >
            {word}
          </span>
        </div>

        <div className="loader__meta">
          <span>
            {(() => {
              const [, key, fallback] = getStatus(progress)
              const text = t(key)
              return !text || text === key ? fallback : text
            })()}
          </span>
          <span className="loader__percent">{percent}</span>
        </div>
      </div>
    </div>
  )
}

export default Loader